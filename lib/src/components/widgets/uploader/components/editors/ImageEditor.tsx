import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { ImageCropper } from "uploader/components/widgets/uploader/components/editors/ImageCropper";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";

interface Props {
  imageCount: number;
  imageIndex: number;
  onImageEdited: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  options: UploaderOptionsRequired;
  upload: Upload;
}

export const ImageEditor = ({
  imageCount,
  imageIndex,
  originalImage,
  upload,
  onImageEdited,
  options
}: Props): JSX.Element => {
  // Currently we only provide a cropper: it would be good to provide rotation in future, too, and we can switch between
  // them here.
  return (
    <ImageCropper
      imageCount={imageCount}
      imageIndex={imageIndex}
      options={options}
      onFinish={onImageEdited}
      upload={upload}
      originalImage={originalImage}
    />
  );
};
