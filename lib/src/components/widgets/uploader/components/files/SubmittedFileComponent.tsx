import { SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";
import { assertUnreachable } from "uploader/common/TypeUtils";
import { ProgressIcon } from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { getFileIconImageSource } from "uploader/components/widgets/uploader/components/fileIcons/utils/FileIconUtil";
import unknownSvg from "uploader/components/widgets/uploader/components/fileIcons/svgs/Unknown.svg";
import "./SubmittedFileComponent.scss";
import { useEffect, useState } from "preact/compat";
import { UploaderWidgetLocale } from "uploader/modules/locales/UploaderWidgetLocale";

interface Props {
  file: SubmittedFile;
  locale: UploaderWidgetLocale;
  remove: () => void;
}

// Keep up-to-date with total animation duration in CSS.
const removalAnimationTime = 1000;

export const SubmittedFileComponent = ({ file, remove, locale }: Props): JSX.Element => {
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
      fileName = file.file.name;
      break;
    default:
      assertUnreachable(file);
  }

  return (
    <div className="mb-3 uploader__submitted-file">
      {/* span required to align button to right of div */}
      <span className="vcenter">
        <ProgressIcon progress={Math.max(progressMargin, progress)} onCompleteImageSource={thumbnail} height={15} />{" "}
        <span className="ml-2 mr-3">{fileName}</span>
      </span>
      {isDelayedRemove ? (
        <span className="uploader__submitted-file__action">
          {file.type === "uploading" ? locale["cancelled!"] : locale["removed!"]}
        </span>
      ) : (
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
    </div>
  );
};
