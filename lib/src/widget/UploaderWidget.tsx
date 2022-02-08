import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import "./UploaderWidget.scss";
import { useEffect, useState } from "preact/compat";
import { isDefined } from "uploader/common/TypeUtils";
import { FileInputChangeEvent } from "uploader/common/FileInputChangeEvent";
import cn from "classnames";

interface Props {
  params: UploaderParamsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadedFile[]) => void;
  upload: Upload;
}

interface UploadingFile {
  cancel: () => void;
  file: File;
  progress: number; // Factor (0 to 1)
  type: "uploading";
}

interface ErroneousFile {
  error: Error;
  file: File;
  type: "error";
}

interface UploadedFileContainer {
  type: "uploaded";
  uploadedFile: UploadedFile;
}

type SubmittedFile = UploadingFile | UploadedFileContainer | ErroneousFile;

function isUploadedFile(file: SubmittedFile): file is UploadedFileContainer {
  return file.type === "uploaded";
}

interface SubmittedFileMap {
  [sparseFileIndex: number]: SubmittedFile | undefined;
}

export const UploaderWidget = ({ resolve, params: { multi, locale, tags }, upload }: Props): JSX.Element => {
  const [nextSparseFileIndex, setNextSparseFileIndex] = useState<number>(0);
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFileMap>({});
  const submittedFileList: SubmittedFile[] = Object.values(submittedFiles).filter(isDefined);
  const uploadedFiles = submittedFileList.filter(isUploadedFile);

  useEffect(() => {
    if (!multi && uploadedFiles.length > 0) {
      // Just in case the user dragged-and-dropped multiple files.
      const firstUploadedFile = uploadedFiles.map(x => x.uploadedFile).slice(0, 1);
      resolve(firstUploadedFile);
    }
  }, [uploadedFiles]);

  const onCancel = (e: Event): void => {
    e.preventDefault();
    resolve([]);
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

  const onUpload = (file: File, onFinish: () => void): void => {
    const fileIndex = nextSparseFileIndex;
    setNextSparseFileIndex(fileIndex + 1);

    upload
      .uploadFile({
        file,
        tags,
        onBegin: ({ cancel }) =>
          setSubmittedFile(fileIndex, {
            file,
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
            uploadedFile,
            type: "uploaded"
          });
          onFinish();
        },
        error => {
          updateUploadingFile(
            fileIndex,
            (uploadingFile): ErroneousFile => ({
              error,
              file: uploadingFile.file,
              type: "error"
            })
          );
          onFinish();
        }
      );
  };

  return (
    <>
      <div className="uploader__backdrop" onClick={onCancel} />

      <div className="uploader__modal">
        <UploadButton
          text={multi ? locale.uploadFiles : locale.uploadFile}
          className="btn--primary btn--upload"
          onUpload={onUpload}
        />
        <p>{locale.orDragDropCopyPaste}</p>
      </div>
    </>
  );
};

const UploadButton = ({
  className,
  text,
  onUpload
}: {
  className: string;
  onUpload: (file: File, onFinish: () => void) => void;
  text: string;
}): JSX.Element => {
  const [fileInputKey, setFileInputKey] = useState(Math.random());
  const [inputId] = useState(`uploader__input__${Math.round(Math.random() * 1000000)}`);
  const [isUploading, setIsUploading] = useState(false);
  const isDisabled = isUploading;

  return (
    <label className={cn("btn custom-file-btn", className, { disabled: isDisabled })} htmlFor={inputId}>
      {text}

      <input
        key={fileInputKey}
        id={inputId}
        name={inputId}
        type="file"
        className="custom-file-btn-input"
        onChange={
          ((e: FileInputChangeEvent): void => {
            const input = e.target;
            const file = input.files?.[0] ?? undefined;
            if (file !== undefined) {
              setIsUploading(true);
              onUpload(file, () => {
                setFileInputKey(Math.random());
                setIsUploading(false);
              });
            }
          }) as any
        }
        disabled={isDisabled}
      />
    </label>
  );
};
