import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import { useEffect, useState } from "preact/compat";
import { isDefined } from "uploader/common/TypeUtils";
import { UploaderWelcomeScreen } from "uploader/components/widgets/uploader/screens/UploaderWelcomeScreen";
import { UploaderMainScreen } from "uploader/components/widgets/uploader/screens/UploaderMainScreen";
import {
  ErroneousFile,
  isUploadedFile,
  SubmittedFile,
  SubmittedFileMap,
  UploadingFile
} from "uploader/components/widgets/uploader/model/SubmittedFile";
import "./UploaderWidget.scss";

interface Props {
  params: UploaderParamsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadedFile[]) => void;
  upload: Upload;
}

export const UploaderWidget = ({ resolve, params, upload }: Props): JSX.Element => {
  const [nextSparseFileIndex, setNextSparseFileIndex] = useState<number>(0);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFileMap>({});
  const submittedFileList: SubmittedFile[] = Object.values(submittedFiles).filter(isDefined);
  const uploadedFiles = submittedFileList.filter(isUploadedFile);
  const { multi, tags } = params;

  useEffect(() => {
    if (!multi && uploadedFiles.length > 0) {
      // Just in case the user dragged-and-dropped multiple files.
      const firstUploadedFile = uploadedFiles.map(x => x.uploadedFile).slice(0, 1);
      resolve(firstUploadedFile);
    }
  }, [uploadedFiles]);

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

  const updateUploadingFile = (fileIndex: number, file: (uploadingFile: UploadingFile) => SubmittedFile): void => {
    setSubmittedFiles(
      (x): SubmittedFileMap => {
        const oldFile = x[fileIndex];
        if (oldFile === undefined || oldFile.type !== "uploading") {
          return x;
        }

        return {
          ...x,
          [fileIndex]: file(oldFile)
        };
      }
    );
  };

  const addFiles = (files: File[]): void => {
    setNextSparseFileIndex(nextSparseFileIndex + files.length);

    files.forEach((file, i) => {
      const fileIndex = nextSparseFileIndex + i;
      upload
        .uploadFile({
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
            updateUploadingFile(
              fileIndex,
              (uploadingFile): UploadingFile => ({
                ...uploadingFile,
                progress: bytesSent / bytesTotal
              })
            )
        })
        .then(
          uploadedFile => {
            setSubmittedFile(fileIndex, {
              fileIndex,
              uploadedFile,
              type: "uploaded"
            });
          },
          error => {
            updateUploadingFile(
              fileIndex,
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
  };

  return submittedFileList.length === 0 ? (
    <UploaderWelcomeScreen params={params} addFiles={addFiles} />
  ) : (
    <UploaderMainScreen
      params={params}
      addFiles={addFiles}
      submittedFiles={submittedFileList}
      remove={removeSubmittedFile}
    />
  );
};
