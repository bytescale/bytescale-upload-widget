/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";
import { useEffect, useLayoutEffect, useState } from "preact/compat";
import { isDefined } from "uploader/modules/common/TypeUtils";
import { UploaderWelcomeScreen } from "uploader/components/widgets/uploader/screens/UploaderWelcomeScreen";
import { UploaderMainScreen } from "uploader/components/widgets/uploader/screens/UploaderMainScreen";
import {
  ErroneousFile,
  isUploadedFile,
  SubmittedFile,
  SubmittedFileMap,
  UploadedFileContainer,
  UploadingFile
} from "uploader/components/widgets/uploader/model/SubmittedFile";
import { WidgetBase } from "uploader/components/widgets/widgetBase/WidgetBase";
import { useDragDrop } from "uploader/modules/common/UseDragDrop";
import "./UploaderWidget.scss";
import { humanFileSize } from "uploader/modules/common/FormatUtils";
import {
  progressWheelDelay,
  progressWheelVanish
} from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { UploaderResult } from "uploader/components/modal/UploaderResult";
import { UploaderImageListEditor } from "uploader/components/widgets/uploader/screens/UploaderImageListEditor";

interface Props {
  options: UploaderOptionsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploaderResult[]) => void;
  upload: Upload;
}

export const UploaderWidget = ({ resolve, options, upload }: Props): JSX.Element => {
  const [, setNextSparseFileIndex] = useState<number>(0);
  const [isInitialUpdate, setIsInitialUpdate] = useState(true);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFileMap>({});
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [showImageEditorTimeout, setShowImageEditorTimeout] = useState<number | null>(null);
  const submittedFileList: SubmittedFile[] = Object.values(submittedFiles).filter(isDefined);
  const uploadedFiles = submittedFileList.filter(isUploadedFile);
  const onFileUploadDelay = progressWheelDelay + (progressWheelVanish - 100); // Allows the animation to finish before closing modal. We add some time to allow the wheel to fade out.
  const { multi, tags } = options;
  const uploaderResult = uploadedFiles.map(x => UploaderResult.from(x.uploadedFile, x.editedFile));
  const isImage = (mime: string): boolean => mime.toLowerCase().startsWith("image/");
  const imagesToEdit = uploadedFiles.filter(
    x => x.editedFile === undefined && !x.editingDone && options.editor.images.crop && isImage(x.uploadedFile.mime)
  );

  const onImageEdited = (editedFile: UploadedFile | undefined, sparseFileIndex: number): void => {
    updateFile<UploadedFileContainer>(
      sparseFileIndex,
      "uploaded",
      (file): UploadedFileContainer => ({
        ...file,
        editedFile,
        editingDone: true
      })
    );
  };

  const finalize = (): void => {
    resolve(uploaderResult);
  };

  useEffect(() => {
    if (imagesToEdit.length > 0) {
      const timeout = (setTimeout(() => {
        setShowImageEditor(true);
      }, onFileUploadDelay) as any) as number;
      setShowImageEditorTimeout(timeout);
      return () => clearTimeout(timeout);
    }
    if (showImageEditor) {
      setShowImageEditor(false);
    }
    if (showImageEditorTimeout !== null) {
      clearTimeout(showImageEditorTimeout);
      setShowImageEditorTimeout(null);
    }
  }, [imagesToEdit.length, showImageEditor]);

  // We want to use a 'layout effect' since if the cropper has just been closed in 'single file mode', we want to
  // immediately resolve the uploader, rather than momentarily showing the main screen.
  useLayoutEffect(() => {
    if (imagesToEdit.length > 0) {
      // Do not raise update events until after the images have finished editing.
      return;
    }

    if (isInitialUpdate) {
      setIsInitialUpdate(false);
      return;
    }

    options.onUpdate(uploaderResult);

    // For inline layouts, if in single-file mode, we never resolve (there is no terminal state): we just allow the
    // user to add/remove their file, and the caller should instead rely on the 'onUpdate' method above.
    if (!multi && uploadedFiles.length > 0 && !options.showFinishButton && options.layout === "modal") {
      // Just in case the user dragged-and-dropped multiple files.
      const firstUploadedFile = uploaderResult.slice(0, 1);
      const doResolve = (): void => resolve(firstUploadedFile);
      const previousScreenWasEditor = uploadedFiles[0].editingDone;

      if (previousScreenWasEditor) {
        doResolve();
      } else {
        const timeout = setTimeout(doResolve, onFileUploadDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [imagesToEdit.length, ...uploadedFiles.map(x => x.uploadedFile.fileUrl)]);

  const removeSubmittedFile = (fileIndex: number): void => {
    setSubmittedFiles(
      (x): SubmittedFileMap => {
        const { [fileIndex]: removed, ...rest } = x;
        if (removed?.type === "uploading") {
          removed.cancel();
        }
        return rest;
      }
    );
  };

  const setSubmittedFile = (fileIndex: number, file: SubmittedFile): void => {
    setSubmittedFiles(
      (x): SubmittedFileMap => ({
        ...x,
        [fileIndex]: file
      })
    );
  };

  const updateFile = <T extends SubmittedFile>(
    fileIndex: number,
    fileType: T["type"],
    file: (uploadingFile: T) => SubmittedFile
  ): void => {
    setSubmittedFiles(
      (x): SubmittedFileMap => {
        const oldFile = x[fileIndex];
        if (oldFile === undefined || oldFile.type !== fileType) {
          return x;
        }

        return {
          ...x,
          [fileIndex]: file(oldFile as T)
        };
      }
    );
  };

  const doUpload = async (file: File, fileIndex: number): Promise<UploadedFile> => {
    const raiseError = (error: Error): never => {
      setSubmittedFile(fileIndex, {
        file,
        fileIndex,
        error,
        type: "error"
      });

      throw error;
    };

    const { maxFileSizeBytes, mimeTypes } = options;
    if (maxFileSizeBytes !== undefined && file.size > maxFileSizeBytes) {
      raiseError(new Error(`${options.locale.maxSize} ${humanFileSize(maxFileSizeBytes)}`));
    }
    if (mimeTypes !== undefined && !mimeTypes.includes(file.type)) {
      raiseError(new Error(options.locale.unsupportedFileType));
    }

    return await upload.uploadFile({
      file,
      tags,
      onBegin: ({ cancel }) =>
        setSubmittedFile(fileIndex, {
          file,
          fileIndex,
          cancel,
          progress: 0,
          type: "uploading"
        }),
      onProgress: ({ bytesSent, bytesTotal }) =>
        updateFile<UploadingFile>(
          fileIndex,
          "uploading",
          (uploadingFile): UploadingFile => ({
            ...uploadingFile,
            progress: bytesSent / bytesTotal
          })
        )
    });
  };

  const addFiles = (files: File[]): void =>
    setNextSparseFileIndex(nextSparseFileIndex => {
      // Ignores subsequent drag-and-drop events for single file uploaders.
      if (!multi && submittedFileList.length > 0) {
        return nextSparseFileIndex;
      }

      files.slice(0, multi ? files.length : 1).forEach((file, i) => {
        const fileIndex = nextSparseFileIndex + i;
        doUpload(file, fileIndex).then(
          uploadedFile => {
            updateFile<UploadingFile>(
              fileIndex,
              "uploading",
              (): UploadedFileContainer => ({
                fileIndex,
                uploadedFile,
                editedFile: undefined,
                editingDone: false,
                type: "uploaded"
              })
            );
          },
          error => {
            updateFile<UploadingFile>(
              fileIndex,
              "uploading",
              (uploadingFile): ErroneousFile => ({
                fileIndex,
                error,
                file: uploadingFile.file,
                type: "error"
              })
            );
          }
        );
      });
      return nextSparseFileIndex + files.length;
    });

  const { isDragging, ...rootProps } = useDragDrop(addFiles);
  const mimeTypes = options.mimeTypes ?? [];
  const isImageUploader = mimeTypes.length > 0 && mimeTypes.every(x => x.trim().toLowerCase().startsWith("image/"));

  return (
    <WidgetBase
      htmlProps={rootProps}
      isDraggable={true}
      isDragging={isDragging}
      layout={options.layout}
      multi={options.multi}>
      {submittedFileList.length === 0 ? (
        <UploaderWelcomeScreen options={options} addFiles={addFiles} isImageUploader={isImageUploader} />
      ) : showImageEditor && imagesToEdit.length > 0 ? (
        <UploaderImageListEditor
          images={imagesToEdit}
          onImageEdited={onImageEdited}
          upload={upload}
          options={options}
        />
      ) : (
        <UploaderMainScreen
          options={options}
          addFiles={addFiles}
          submittedFiles={submittedFileList}
          uploadedFiles={uploadedFiles}
          remove={removeSubmittedFile}
          finalize={finalize}
          isImageUploader={isImageUploader}
        />
      )}
    </WidgetBase>
  );
};
