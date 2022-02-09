import { UploadingFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";

interface Props {
  file: UploadingFile;
}

export const UploadingFileComponent = ({ file }: Props): JSX.Element => (
  <div>
    {file.file.name} {Math.round(file.progress * 100)}
  </div>
);
