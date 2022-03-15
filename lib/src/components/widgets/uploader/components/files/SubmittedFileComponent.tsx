import { SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";
import { assertUnreachable } from "uploader/modules/common/TypeUtils";
import { ProgressIcon } from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { getFileIconImageSource } from "uploader/components/widgets/uploader/components/fileIcons/utils/FileIconUtil";
import unknownSvg from "uploader/components/widgets/uploader/components/fileIcons/svgs/Unknown.svg";
import "./SubmittedFileComponent.scss";
import { useEffect, useState } from "preact/compat";
import { UploaderLocale } from "uploader/modules/locales/UploaderLocale";
import errorSvg from "uploader/components/widgets/uploader/components/fileIcons/svgs/Error.svg";
import cn from "classnames";

interface Props {
  file: SubmittedFile;
  fileCount: number;
  locale: UploaderLocale;
  remove: () => void;
  showRemoveButton: boolean;
}

// Keep up-to-date with total animation duration in CSS.
const removalAnimationTime = 1000;

const LinkToUpload = ({ text }: { text: string }): JSX.Element => {
  const find = "upload.io";
  const index = text.toLowerCase().indexOf(find);
  if (index === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.substring(0, index)}{" "}
      <a href="https://upload.io/pricing" target="_blank">
        Upload.io
      </a>{" "}
      {text.substring(index + find.length)}
    </>
  );
};

export const SubmittedFileComponent = ({ file, fileCount, remove, locale, showRemoveButton }: Props): JSX.Element => {
  const [isDelayedRemove, setIsDelayedRemove] = useState(false);

  const delayedRemove = (): void => {
    setIsDelayedRemove(true);
  };

  useEffect(() => {
    if (!isDelayedRemove) {
      return;
    }
    const timeout = setTimeout(() => {
      remove();
    }, removalAnimationTime);
    return () => clearTimeout(timeout);
  }, [isDelayedRemove]);

  const progressMargin = 0.02;
  let thumbnail = unknownSvg;
  let progress = 0;
  let fileName: string;
  let errorMessage: string | undefined;
  switch (file.type) {
    case "uploading":
      progress = Math.min(file.progress, 1 - progressMargin); // Do not let progress display 100%, as we don't have the MIME type & URL for the thumbnail yet. Plus it's confusing leaving it hanging on 100%.
      fileName = file.file.name;
      break;
    case "uploaded":
      progress = 1;
      thumbnail = getFileIconImageSource(file.uploadedFile.file.name, file.uploadedFile.mime);
      fileName = file.uploadedFile.file.name;
      break;
    case "error":
      progress = 1;
      thumbnail = errorSvg;
      errorMessage = file.error?.message ?? "Unexpected error occurred.";
      fileName = file.file.name;
      break;
    default:
      assertUnreachable(file);
  }

  return (
    <div className={cn("uploader__submitted-file", { "uploader__submitted-file--loners": fileCount <= 2 })}>
      <div className="uploader__submitted-file__container">
        <div className="uploader__submitted-file__inner">
          <ProgressIcon
            progress={Math.max(progressMargin, progress)}
            onCompleteImageSource={thumbnail}
            height={15}
            isError={file.type === "error"}
          />{" "}
          <span className="uploader__submitted-file__text">
            <span className="uploader__submitted-file__name" title={fileName}>
              {fileName}
            </span>
            {errorMessage !== undefined && (
              <span className="uploader__submitted-file__error">
                <LinkToUpload text={errorMessage} />
              </span>
            )}
          </span>
          {isDelayedRemove ? (
            <span className="uploader__submitted-file__action uploader__submitted-file__action--performed">
              {file.type === "uploading" ? locale["cancelled!"] : locale["removed!"]}
            </span>
          ) : (
            <>
              {(showRemoveButton || file.type === "uploading") && (
                <a
                  className="uploader__submitted-file__action"
                  href="#remove"
                  onClick={e => {
                    e.preventDefault();
                    delayedRemove();
                  }}>
                  {file.type === "uploading" ? locale.cancel : locale.remove}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
