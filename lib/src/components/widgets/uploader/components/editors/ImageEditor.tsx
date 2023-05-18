import { JSX } from "preact";
import { UploadedFile, UploadInterface } from "upload-js";
import { ImageCropper } from "uploader/components/widgets/uploader/components/editors/ImageCropper";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { ImagePreview } from "uploader/components/widgets/uploader/components/editors/ImagePreview";
import { isEditableImage } from "uploader/modules/MimeUtils";

interface Props {
  imageCount: number;
  imageIndex: number;
  onImageEdited: (keep: boolean, editedFile: UploadedFile | undefined) => void;
  options: UploadWidgetConfigRequired;
  originalImage: UploadedFile;
  upload: UploadInterface;
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
