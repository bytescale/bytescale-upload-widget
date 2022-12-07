import { UploadButton } from "uploader/components/widgets/uploader/components/UploadButton";
import { JSX } from "preact";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";

interface Props {
  addFiles: (files: File[]) => void;
  isImageUploader: boolean;
  options: UploadWidgetConfigRequired;
}

export const UploaderWelcomeScreen = ({
  addFiles,
  options: { multi, locale },
  isImageUploader
}: Props): JSX.Element => {
  return (
    <>
      <UploadButton
        multi={multi}
        text={
          isImageUploader
            ? multi
              ? locale.uploadImages
              : locale.uploadImage
            : multi
            ? locale.uploadFiles
            : locale.uploadFile
        }
        className="btn--primary btn--upload"
        onUpload={addFiles}
      />
      <p className="text-secondary mb-0">
        {isImageUploader
          ? multi
            ? locale.orDragDropImages
            : locale.orDragDropImage
          : multi
          ? locale.orDragDropFiles
          : locale.orDragDropFile}
      </p>
    </>
  );
};
