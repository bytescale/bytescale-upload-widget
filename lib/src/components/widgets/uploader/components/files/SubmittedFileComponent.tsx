import { SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { JSX } from "preact";
import { assertUnreachable } from "uploader/common/TypeUtils";
import { UploadingFileComponent } from "uploader/components/widgets/uploader/components/files/UploadingFileComponent";
import { UploadedFileComponent } from "uploader/components/widgets/uploader/components/files/UploadedFileComponent";
import { ErroneousFileComponent } from "uploader/components/widgets/uploader/components/files/ErroneousFileComponent";

interface Props {
  file: SubmittedFile;
}

export const SubmittedFileComponent = ({ file }: Props): JSX.Element => {
  switch (file.type) {
    case "uploading":
      return <UploadingFileComponent file={file} />;
    case "uploaded":
      return <UploadedFileComponent file={file} />;
    case "error":
      return <ErroneousFileComponent file={file} />;
    default:
      assertUnreachable(file);
  }
};
