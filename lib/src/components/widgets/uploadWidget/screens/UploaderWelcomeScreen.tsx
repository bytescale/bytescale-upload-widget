import { UploadButton } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/UploadButton";
import { JSX } from "preact";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";

interface Props {
  addFiles: (files: File[]) => void;
  isImageUploader: boolean;
  options: UploadWidgetConfigRequired;
}

export const UploaderWelcomeScreen = ({ addFiles, options, isImageUploader }: Props): JSX.Element => {
  const { multi, locale } = options;
  return (
    <>
      <UploadButton
        options={options}
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
