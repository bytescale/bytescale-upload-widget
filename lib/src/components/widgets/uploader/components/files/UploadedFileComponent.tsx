import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";

interface Props {
  file: UploadedFileContainer;
}

export const UploadedFileComponent = ({ file }: Props): JSX.Element => (
  <div>{file.uploadedFile.file.name} (uploaded)</div>
);
