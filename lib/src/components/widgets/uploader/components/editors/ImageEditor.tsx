import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { ImageCropper } from "uploader/components/widgets/uploader/components/editors/ImageCropper";
import { UploaderLocale } from "uploader";

interface Props {
  cropRatio: number | undefined;
  locale: UploaderLocale;
  onImageEdited: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  upload: Upload;
}

export const ImageEditor = ({ originalImage, upload, onImageEdited, locale, cropRatio }: Props): JSX.Element => {
  // Currently we only provide a cropper: it would be good to provide rotation in future, too, and we can switch between
  // them here.
  return (
    <ImageCropper
      onFinish={onImageEdited}
      upload={upload}
      originalImage={originalImage}
      locale={locale}
      ratio={cropRatio}
    />
  );
};
