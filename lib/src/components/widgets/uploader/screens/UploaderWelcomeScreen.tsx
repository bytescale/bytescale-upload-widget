import { UploadButton } from "uploader/components/widgets/uploader/components/UploadButton";
import { JSX } from "preact";
import { UploaderParamsRequired } from "uploader/UploaderParams";

interface Props {
  addFiles: (files: File[]) => void;
  params: UploaderParamsRequired;
}

export const UploaderWelcomeScreen = ({ addFiles, params: { multi, locale } }: Props): JSX.Element => (
  <>
    <UploadButton
      multi={multi}
      text={multi ? locale.uploadFiles : locale.uploadFile}
      className="btn--primary btn--upload"
      onUpload={addFiles}
    />
    <p>{locale.orDragDropCopyPaste}</p>
  </>
);
