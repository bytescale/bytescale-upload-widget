import { SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";
import { assertUnreachable } from "uploader/common/TypeUtils";
import { ProgressIcon } from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { getFileIconImageSource } from "uploader/components/widgets/uploader/components/fileIcons/utils/FileIconUtil";
import unknownSvg from "uploader/components/widgets/uploader/components/fileIcons/svgs/Unknown.svg";
import "./SubmittedFileComponent.scss";

interface Props {
  file: SubmittedFile;
}

export const SubmittedFileComponent = ({ file }: Props): JSX.Element => {
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
      <ProgressIcon progress={Math.max(progressMargin, progress)} onCompleteImageSource={thumbnail} height={15} />{" "}
      <span className="ml-2">{fileName}</span>
    </div>
  );
};
