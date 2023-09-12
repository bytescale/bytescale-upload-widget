import { JSX } from "preact";
import { ImageEditorLayout } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorLayout";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { getImageEditorHeader } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorHeader";
import { ImageEditorButtons } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorButtons";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
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
