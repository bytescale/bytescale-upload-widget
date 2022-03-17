import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { ImageCropper } from "uploader/components/widgets/uploader/components/editors/ImageCropper";
import { UploaderParamsRequired } from "uploader/UploaderParams";

interface Props {
  imageCount: number;
  imageIndex: number;
  onImageEdited: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  params: UploaderParamsRequired;
  upload: Upload;
}

export const ImageEditor = ({
  imageCount,
  imageIndex,
  originalImage,
  upload,
  onImageEdited,
  params
}: Props): JSX.Element => {
  // Currently we only provide a cropper: it would be good to provide rotation in future, too, and we can switch between
  // them here.
  return (
    <ImageCropper
      imageCount={imageCount}
      imageIndex={imageIndex}
      params={params}
      onFinish={onImageEdited}
      upload={upload}
      originalImage={originalImage}
    />
  );
};
