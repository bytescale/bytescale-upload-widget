/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { JSX } from "preact";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { useLayoutEffect, useState } from "preact/compat";
import { isDefined } from "@bytescale/upload-widget/modules/common/TypeUtils";
import { UploaderWelcomeScreen } from "@bytescale/upload-widget/components/widgets/uploadWidget/screens/UploaderWelcomeScreen";
import { UploaderMainScreen } from "@bytescale/upload-widget/components/widgets/uploadWidget/screens/UploaderMainScreen";
import {
  FailedFile,
  isFailedFile,
  isPendingFile,
  isUploadedFile,
  SubmittedFile,
  SubmittedFileMap,
  UploadedFileContainer,
  UploadingFile
} from "@bytescale/upload-widget/components/widgets/uploadWidget/model/SubmittedFile";
import { WidgetBase } from "@bytescale/upload-widget/components/widgets/widgetBase/WidgetBase";
import { useDragDrop } from "@bytescale/upload-widget/modules/common/UseDragDrop";
import { humanFileSize } from "@bytescale/upload-widget/modules/common/FormatUtils";
import {
  progressWheelDelay,
  progressWheelVanish
} from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/ProgressIcon";
import { UploadWidgetResult } from "@bytescale/upload-widget/model/UploadWidgetResult";
import { UploaderImageListEditor } from "@bytescale/upload-widget/components/widgets/uploadWidget/screens/UploaderImageListEditor";
import { useShowImageEditor } from "@bytescale/upload-widget/components/widgets/uploadWidget/screens/modules/UseShowImageEditor";
import { isEditableImage, isReadOnlyImage } from "@bytescale/upload-widget/modules/MimeUtils";
import { UploadWidgetOnPreUploadResult } from "@bytescale/upload-widget/config/UploadWidgetOnPreUploadResult";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { UploadWidgetPendingFile } from "@bytescale/upload-widget/model/UploadWidgetPendingFile";
import { UploadWidgetFailedFile } from "@bytescale/upload-widget/model/UploadWidgetFailedFile";
import { UploadWidgetValidationError } from "@bytescale/upload-widget";

interface Props {
  options: UploadWidgetConfigRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadWidgetResult[]) => void;
  upload: UploadTracker;
}

function inferMimeType(fileName: string): string {
  const ext = (fileName.split(".").pop() ?? "").trim().toLowerCase();
  const fallback = "application/octet-stream";

  // These are popular file types that some browser+OSs don't recognise (so return "" for the file.type), meaning
  // we need to lookup the extension ourselves. In the future, it would be a good idea to over an API endpoint to
  // perform this resolution (so that we can hold a more extensive dataset, without increasing bundle size).
  const commonUnsupportedExtensions: Record<string, string | undefined> = {
    heic: "image/heic",
    heif: "image/heif"
  };

  return commonUnsupportedExtensions[ext] ?? fallback;
}

function isValidMimeType(allowedMimeTypes: string[] | undefined, file: File): boolean {
  if (allowedMimeTypes === undefined || allowedMimeTypes.length === 0) {
    return true;
  }
  // Some browsers/OSs return "" as the MIME type for unknown MIME types (e.g. HEIC on some devices is reported like this).
  const actualMimeType = (file.type === "" ? undefined : file.type) ?? inferMimeType(file.name);
  const normalize = (x: string): string => x.trim().toLowerCase();
  const actualNormalized = normalize(actualMimeType);
  return allowedMimeTypes.some(x => {
    const requiredNormalized = normalize(x);
    return (
      requiredNormalized === actualNormalized ||
      (requiredNormalized.endsWith("*") &&
        actualNormalized.startsWith(requiredNormalized.substring(0, requiredNormalized.length - 1)))
    );
  });
}

export const UploadWidget = ({ resolve, options, upload }: Props): JSX.Element => {
  const [, setNextSparseFileIndex] = useState<number>(0);
  const [isInitialUpdate, setIsInitialUpdate] = useState(true);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFileMap>({});
  const submittedFileList: SubmittedFile[] = Object.values(submittedFiles).filter(isDefined);
  const uploadedFiles = submittedFileList.filter(isUploadedFile);
  const pendingFiles = submittedFileList.filter(isPendingFile);
  const failedFiles = submittedFileList.filter(isFailedFile);
  const makeDeps = (fileLists: SubmittedFile[][]): number[] => [
    ...fileLists.map(x => x.length),
    ...fileLists.flatMap(x => x.map(y => y.fileIndex))
  ];
  const onFileUploadDelay = progressWheelDelay + (progressWheelVanish - 100); // Allows the animation to finish before closing modal. We add some time to allow the wheel to fade out.
  const { multi, tags, metadata, path } = options;
  const uploadedFilesReady = uploadedFiles.filter(x => x.isReady);
  const uploadedFilesNotReady = uploadedFiles.filter(x => !x.isReady); // These will be previewable or editable media files.
  const uploadedFilesReadyResult = uploadedFilesReady.map(x => UploadWidgetResult.from(x.uploadedFile, x.editedFile));
  const canEditImages = options.editor.images.crop;
  const canPreviewImages = options.editor.images.preview;
  const fileRequiresUserInteraction = (uploadedFile: UploadedFile): boolean =>
    ((canEditImages || canPreviewImages) && isEditableImage(uploadedFile)) ||
    (canPreviewImages && isReadOnlyImage(uploadedFile));
  const showImageEditor = useShowImageEditor(uploadedFilesNotReady, onFileUploadDelay);

  const onFileReady = (keepFile: boolean, editedFile: UploadedFile | undefined, sparseFileIndex: number): void => {
    if (!keepFile) {
      removeSubmittedFile(sparseFileIndex);
    } else {
      updateFile<UploadedFileContainer>(
        sparseFileIndex,
        "uploaded",
        (file): UploadedFileContainer => ({
          ...file,
          editedFile,
          isReady: true
        })
      );
    }
  };

  const finalize = (): void => {
    resolve(uploadedFilesReadyResult);
  };

  // We want to use a 'layout effect' since if the cropper has just been closed in 'single file mode', we want to
  // immediately resolve the Upload Widget, rather than momentarily showing the main screen.
  useLayoutEffect(() => {
    if (isInitialUpdate) {
      setIsInitialUpdate(false);
      return;
    }

    options.onUpdate({
      failedFiles: failedFiles.map(({ file, error }): UploadWidgetFailedFile => ({ file, error })),
      uploadedFiles: uploadedFilesReadyResult,
      pendingFiles: [...pendingFiles, ...uploadedFilesNotReady].map(({ file }): UploadWidgetPendingFile => ({ file }))
    });

    // For inline layouts, if in single-file mode, we never resolve (there is no terminal state): we just allow the
    // user to add/remove their file, and the caller should instead rely on the 'onUpdate' method above.
    const shouldCloseModalImmediatelyAfterUpload =
      !multi && uploadedFilesReady.length > 0 && !options.showFinishButton && options.layout === "modal";

    if (shouldCloseModalImmediatelyAfterUpload) {
      // Just in case the user dragged-and-dropped multiple files.
      const firstUploadedFile = uploadedFilesReadyResult.slice(0, 1);
      const doResolve = (): void => resolve(firstUploadedFile);
      const previousScreenWasEditor = fileRequiresUserInteraction(uploadedFiles[0].uploadedFile);

      if (previousScreenWasEditor) {
        doResolve();
      } else {
        const timeout = setTimeout(doResolve, onFileUploadDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, makeDeps([pendingFiles, uploadedFilesNotReady, uploadedFilesReady, failedFiles]));

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
    const raiseValidationError = (errorMessage: string): never => {
      const error = new UploadWidgetValidationError(errorMessage);

      setSubmittedFile(fileIndex, {
        file,
        fileIndex,
        error,
        type: "failed"
      });

      throw error;
    };

    const { maxFileSizeBytes, mimeTypes, onPreUpload } = options;
    if (maxFileSizeBytes !== undefined && file.size > maxFileSizeBytes) {
      raiseValidationError(`${options.locale.maxSize} ${humanFileSize(maxFileSizeBytes)}`);
    }
    if (!isValidMimeType(mimeTypes, file)) {
      raiseValidationError(options.locale.unsupportedFileType);
    }

    setSubmittedFile(fileIndex, {
      file,
      fileIndex,
      type: "preprocessing"
    });

    let preUploadResult: UploadWidgetOnPreUploadResult | undefined;

    try {
      preUploadResult = (await onPreUpload(file)) ?? undefined; // incase the user returns 'null' instead of undefined.
    } catch (e) {
      preUploadResult = {
        errorMessage: options.locale.customValidationFailed
      };
      console.error("[upload-widget] onPreUpload function raised an error.", e);
    }

    if (preUploadResult?.errorMessage !== undefined) {
      raiseValidationError(preUploadResult.errorMessage);
    }

    const fileToUpload = preUploadResult?.transformedFile ?? file;

    return await upload.uploadFile(fileToUpload, {
      path,
      metadata,
      tags,
      onBegin: ({ cancel }) =>
        setSubmittedFile(fileIndex, {
          // IMPORTANT: use 'setSubmittedFile' as file may already exist in collection as a "validating" file.
          file: fileToUpload,
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
                file,
                fileIndex,
                uploadedFile,
                editedFile: undefined,
                isReady: !fileRequiresUserInteraction(uploadedFile),
                type: "uploaded"
              })
            );
          },
          error => {
            updateFile<UploadingFile>(
              fileIndex,
              "uploading",
              (uploadingFile): FailedFile => ({
                fileIndex,
                error,
                file: uploadingFile.file,
                type: "failed"
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
      ) : showImageEditor && uploadedFilesNotReady.length > 0 ? (
        <UploaderImageListEditor
          images={uploadedFilesNotReady}
          onImageEdited={onFileReady}
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
