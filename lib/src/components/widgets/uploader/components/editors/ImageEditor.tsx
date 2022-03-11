import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { ImageCropper } from "uploader/components/widgets/uploader/components/editors/ImageCropper";
import { UploaderLocale } from "uploader";

interface Props {
  cropCircular: boolean;
  cropRatio: number | undefined;
  locale: UploaderLocale;
  multi:
    | undefined
    | {
        imageCount: number;
        imageIndex: number;
      };
  onImageEdited: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  upload: Upload;
}

export const ImageEditor = ({
  originalImage,
  upload,
  onImageEdited,
  locale,
  cropRatio,
  multi,
  cropCircular
}: Props): JSX.Element => {
  // Currently we only provide a cropper: it would be good to provide rotation in future, too, and we can switch between
  // them here.
  return (
    <ImageCropper
      circular={cropCircular}
      multi={multi}
      onFinish={onImageEdited}
      upload={upload}
      originalImage={originalImage}
      locale={locale}
      ratio={cropRatio}
    />
  );
};
