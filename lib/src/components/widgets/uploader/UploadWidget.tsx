/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { JSX } from "preact";
import { UploadedFile, UploadInterface } from "upload-js";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { useLayoutEffect, useState } from "preact/compat";
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
import "./UploadWidget.scss";
import { humanFileSize } from "uploader/modules/common/FormatUtils";
import {
  progressWheelDelay,
  progressWheelVanish
} from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploaderImageListEditor } from "uploader/components/widgets/uploader/screens/UploaderImageListEditor";
import { useShowImageScreen } from "uploader/components/widgets/uploader/screens/modules/UseShowImageScreen";
import { isEditableImage, isPreviewableFile } from "uploader/modules/MimeUtils";

interface Props {
  options: UploadWidgetConfigRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadWidgetResult[]) => void;
  upload: UploadInterface;
}

export const UploadWidget = ({ resolve, options, upload }: Props): JSX.Element => {
  const [, setNextSparseFileIndex] = useState<number>(0);
  const [isInitialUpdate, setIsInitialUpdate] = useState(true);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFileMap>({});
  const submittedFileList: SubmittedFile[] = Object.values(submittedFiles).filter(isDefined);
  const uploadedFiles = submittedFileList.filter(isUploadedFile);
  const onFileUploadDelay = progressWheelDelay + (progressWheelVanish - 100); // Allows the animation to finish before closing modal. We add some time to allow the wheel to fade out.
  const { multi, tags, metadata, path } = options;
  const uploadWidgetResult = uploadedFiles.map(x => UploadWidgetResult.from(upload, x.uploadedFile, x.editedFile));
  const canEditImages = options.editor.images.crop;
  const nonSubmittedFiles = uploadedFiles.filter(x => !x.isSubmitted);
  const nonSubmittedImages = nonSubmittedFiles.filter(x => isEditableImage(x.uploadedFile));
  const othersToPreview = nonSubmittedFiles.filter(x => isPreviewableFile(x.uploadedFile));
  const imagesToEdit = canEditImages ? nonSubmittedImages : [];

  const imagesToPreview = !canEditImages ? nonSubmittedImages : [];
  const itemsToPreview = options.editor.images.preview ? [...imagesToPreview, ...othersToPreview] : [];

  const pendingImages = [...itemsToPreview, ...imagesToEdit];
  const showImageEditor = useShowImageScreen(pendingImages, onFileUploadDelay);

  const onImageSubmitted = (keep: boolean, editedFile: UploadedFile | undefined, sparseFileIndex: number): void => {
    if (!keep) {
      removeSubmittedFile(sparseFileIndex);
    } else {
      updateFile<UploadedFileContainer>(
        sparseFileIndex,
        "uploaded",
        (file): UploadedFileContainer => ({
          ...file,
          editedFile,
          isSubmitted: true
        })
      );
    }
  };

  const finalize = (): void => {
    resolve(uploadWidgetResult);
  };

  // We want to use a 'layout effect' since if the cropper has just been closed in 'single file mode', we want to
  // immediately resolve the uploader, rather than momentarily showing the main screen.
  useLayoutEffect(() => {
    if (pendingImages.length > 0) {
      // Do not raise update events until after the images have finished editing.
      return;
    }

    if (isInitialUpdate) {
      setIsInitialUpdate(false);
      return;
    }

    options.onUpdate(uploadWidgetResult);

    // For inline layouts, if in single-file mode, we never resolve (there is no terminal state): we just allow the
    // user to add/remove their file, and the caller should instead rely on the 'onUpdate' method above.
    const shouldCloseModalImmediatelyAfterUpload =
      !multi && uploadedFiles.length > 0 && !options.showFinishButton && options.layout === "modal";

    if (shouldCloseModalImmediatelyAfterUpload) {
      // Just in case the user dragged-and-dropped multiple files.
      const firstUploadedFile = uploadWidgetResult.slice(0, 1);
      const doResolve = (): void => resolve(firstUploadedFile);
      const previousScreenWasEditor = uploadedFiles[0].isSubmitted;

      if (previousScreenWasEditor) {
        doResolve();
      } else {
        const timeout = setTimeout(doResolve, onFileUploadDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [pendingImages.length, ...uploadedFiles.map(x => x.uploadedFile.fileUrl)]);

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

    const { maxFileSizeBytes, mimeTypes, onValidate } = options;
    if (maxFileSizeBytes !== undefined && file.size > maxFileSizeBytes) {
      raiseError(new Error(`${options.locale.maxSize} ${humanFileSize(maxFileSizeBytes)}`));
    }
    if (mimeTypes !== undefined && !mimeTypes.includes(file.type)) {
      raiseError(new Error(options.locale.unsupportedFileType));
    }

    if (onValidate !== undefined) {
      setSubmittedFile(fileIndex, {
        file,
        fileIndex,
        type: "validating"
      });
      let customValidationError: string | undefined;
      try {
        customValidationError = (await onValidate(file)) ?? undefined;
      } catch (e) {
        customValidationError = options.locale.customValidationFailed;
        console.error("[uploader] Custom validation function (onValidate) returned an unhandled error.", e);
      }
      if (customValidationError !== undefined) {
        raiseError(new Error(customValidationError));
      }
    }

    return await upload.uploadFile(file, {
      path,
      metadata,
      tags,
      onBegin: ({ cancel }) =>
        setSubmittedFile(fileIndex, {
          // IMPORTANT: use 'setSubmittedFile' as file may already exist in collection as a "validating" file.
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
      const maxFiles = multi ? options.maxFileCount : 1;
      const filesToTake =
        maxFiles === undefined ? files.length : Math.min(files.length, maxFiles - submittedFileList.length);

      // Ignores subsequent drag-and-drop events for single file uploaders.
      if (filesToTake <= 0) {
        return nextSparseFileIndex;
      }

      files.slice(0, filesToTake).forEach((file, i) => {
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
                isSubmitted: false,
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
      ) : showImageEditor && pendingImages.length > 0 ? (
        <UploaderImageListEditor
          images={pendingImages}
          onImageEdited={onImageSubmitted}
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
