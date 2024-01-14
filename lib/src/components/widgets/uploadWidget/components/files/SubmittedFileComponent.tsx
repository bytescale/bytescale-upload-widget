import { JSX } from "preact";
import { SubmittedFile } from "@bytescale/upload-widget/components/widgets/uploadWidget/model/SubmittedFile";
import { assertUnreachable } from "@bytescale/upload-widget/modules/common/TypeUtils";
import { ProgressIcon } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/ProgressIcon";
import { getFileIconImageSource } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/utils/FileIconUtil";
import unknownSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Unknown.svg";
import "./SubmittedFileComponent.scss";
import { useEffect, useState } from "preact/compat";
import { UploadWidgetLocale } from "@bytescale/upload-widget/modules/locales/UploadWidgetLocale";
import errorSvg from "@bytescale/upload-widget/components/widgets/uploadWidget/components/fileIcons/svgs/Error.svg";
import cn from "classnames";
import { Hypermedia } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/hypermedia/Hypermedia";

interface Props {
  file: SubmittedFile;
  fileCount: number;
  locale: UploadWidgetLocale;
  remove: () => void;
  showRemoveButton: boolean;
}

// Keep up-to-date with total animation duration in CSS.
const removalAnimationTime = 1000;

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

  const progressMargin = 0.03;
  let thumbnail = unknownSvg;
  let progress = 0;
  let fileName: string;
  let fileMessage: string | undefined;
  switch (file.type) {
    case "preprocessing":
      progress = 0;
      fileName = file.file.name;
      fileMessage = locale.processingFile;
      break;
    case "uploading":
      progress = Math.min(file.progress, 1 - progressMargin); // Do not let progress display 100%, as we don't have the MIME type & URL for the thumbnail yet. Plus it's confusing leaving it hanging on 100%.
      fileName = file.file.name;
      break;
    case "uploaded":
      progress = 1;
      thumbnail = getFileIconImageSource(file.uploadedFile.file.name, file.uploadedFile.mime);
      fileName = file.uploadedFile.file.name;
      break;
    case "failed":
      progress = 1;
      thumbnail = errorSvg;
      fileMessage = file.error?.message ?? "Unexpected error occurred.";
      fileName = file.file.name;
      break;
    default:
      assertUnreachable(file);
  }

  return (
    <div className={cn("upload-widget__submitted-file", { "upload-widget__submitted-file--loners": fileCount <= 2 })}>
      <div className="upload-widget__submitted-file__container">
        <div className="upload-widget__submitted-file__inner">
          <ProgressIcon
            progress={Math.max(progressMargin, progress)}
            onCompleteImageSource={thumbnail}
            height={15}
            isError={file.type === "failed"}
          />{" "}
          <span className="upload-widget__submitted-file__text">
            <span className="upload-widget__submitted-file__name" title={fileName}>
              {fileName}
            </span>
            {fileMessage !== undefined && (
              <span className="upload-widget__submitted-file__message">
                <Hypermedia text={fileMessage} />
              </span>
            )}
          </span>
          {isDelayedRemove ? (
            <span className="upload-widget__submitted-file__action upload-widget__submitted-file__action--performed">
              {file.type === "uploading" ? locale.cancelBtnClicked : locale.removeBtnClicked}
            </span>
          ) : (
            <>
              {(showRemoveButton || file.type === "uploading") && (
                <a
                  className="upload-widget__submitted-file__action"
                  href="#remove"
                  onClick={e => {
                    e.preventDefault();
                    delayedRemove();
                  }}>
                  {file.type === "uploading" ? locale.cancelBtn : locale.removeBtn}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
