import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { ImageEditor } from "uploader/components/widgets/uploader/components/editors/ImageEditor";
import { UploaderLocale } from "uploader";

interface Props {
  cropRatio: number | undefined;
  images: UploadedFileContainer[];
  locale: UploaderLocale;
  onImageEdited: (editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  upload: Upload;
}

export const UploaderImageListEditor = ({ images, onImageEdited, upload, locale, cropRatio }: Props): JSX.Element => {
  const currentImage = images[0];
  return (
    <>
      <ImageEditor
        cropRatio={cropRatio}
        locale={locale}
        originalImage={currentImage.uploadedFile}
        onImageEdited={e => onImageEdited(e, currentImage.fileIndex)}
        upload={upload}
      />
    </>
  );
};
