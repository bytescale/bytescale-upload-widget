import { ErroneousFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";

interface Props {
  file: ErroneousFile;
}

export const ErroneousFileComponent = ({ file }: Props): JSX.Element => <div>{file.file.name} (failed)</div>;
