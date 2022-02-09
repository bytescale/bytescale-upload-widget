import { UploadingFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";
import { ProgressIcon } from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";

interface Props {
  file: UploadingFile;
}

export const UploadingFileComponent = ({ file }: Props): JSX.Element => (
  <div>
    <ProgressIcon progress={file.progress} /> {file.file.name}
  </div>
);
