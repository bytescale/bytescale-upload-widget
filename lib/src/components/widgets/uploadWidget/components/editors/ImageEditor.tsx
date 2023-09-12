import { JSX } from "preact";
import { ImageCropper } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageCropper";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { ImagePreview } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImagePreview";
import { isEditableImage } from "@bytescale/upload-widget/modules/MimeUtils";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";

interface Props {
  imageCount: number;
  imageIndex: number;
  onImageEdited: (keep: boolean, editedFile: UploadedFile | undefined) => void;
  options: UploadWidgetConfigRequired;
  originalImage: UploadedFile;
  upload: UploadTracker;
}

function canCropImage(options: UploadWidgetConfigRequired, originalImage: UploadedFile): boolean {
  return options.editor.images.crop && isEditableImage(originalImage);
}

export const ImageEditor = ({
  imageCount,
  imageIndex,
  originalImage,
  upload,
  onImageEdited,
  options
}: Props): JSX.Element => {
  // Currently we only provide a cropper: it would be good to provide rotation in the future, too, and we can switch between
  // them here.
  return canCropImage(options, originalImage) ? (
    <ImageCropper
      imageCount={imageCount}
      imageIndex={imageIndex}
      options={options}
      onFinish={onImageEdited}
      upload={upload}
      originalImage={originalImage}
    />
  ) : (
    <ImagePreview
      imageCount={imageCount}
      imageIndex={imageIndex}
      options={options}
      onFinish={keep => onImageEdited(keep, undefined)}
      originalImage={originalImage}
    />
  );
};
