import { JSX } from "preact";
import { UploadedFile } from "upload-js";
import { ImageEditorLayout } from "uploader/components/widgets/uploader/components/editors/ImageEditorLayout";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { getImageEditorHeader } from "uploader/components/widgets/uploader/components/editors/ImageEditorHeader";
import { ImageEditorButtons } from "uploader/components/widgets/uploader/components/editors/ImageEditorButtons";
import "./ImageCropper.scss";

interface Props {
  imageCount: number;
  imageIndex: number;
  onFinish: (keep: boolean) => void;
  options: UploadWidgetConfigRequired;
  originalImage: UploadedFile;
}

export const ImagePreview = (props: Props): JSX.Element => {
  const { options, originalImage, onFinish } = props;

  const submit = async (keep: boolean): Promise<void> => {
    onFinish(keep);
  };

  return (
    <ImageEditorLayout
      modal={options.layout === "modal"}
      header={getImageEditorHeader(props)}
      actions={<ImageEditorButtons options={options} onFinish={submit} />}
      originalImage={originalImage}
    />
  );
};
