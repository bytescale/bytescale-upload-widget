import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { ImageEditor } from "uploader/components/widgets/uploader/components/editors/ImageEditor";
import { UploaderLocale } from "uploader";
import { useLayoutEffect, useState } from "preact/compat";

interface Props {
  cropCircular: boolean;
  cropRatio: number | undefined;
  images: UploadedFileContainer[];
  locale: UploaderLocale;
  multi: boolean;
  onImageEdited: (editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  upload: Upload;
}

export const UploaderImageListEditor = ({
  images,
  onImageEdited,
  upload,
  locale,
  cropCircular,
  cropRatio,
  multi
}: Props): JSX.Element => {
  const [currentImage, setCurrentImage] = useState<UploadedFileContainer>(images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(images.length);
  const editingFileIds = images.map(x => x.uploadedFile.fileId);
  const currentFileId = currentImage.uploadedFile.fileId;

  // Prevents image being swapped-out mid-edit if an upload that was started _before_ this image finishes _after_ this
  // image has uploaded.
  useLayoutEffect(() => {
    const hasFinishedEditing = !editingFileIds.includes(currentFileId);
    if (hasFinishedEditing) {
      setCurrentImage(images[0]);
      setImageIndex(i => i + 1);
    }
    setImageCount(imageIndex + images.length);
  }, [imageIndex, currentFileId, ...editingFileIds]);

  return (
    <>
      <ImageEditor
        multi={multi ? { imageIndex, imageCount } : undefined}
        key={currentFileId} // Key required to reset the internal state of the editor between files.
        cropRatio={cropRatio}
        cropCircular={cropCircular}
        locale={locale}
        originalImage={currentImage.uploadedFile}
        onImageEdited={e => onImageEdited(e, currentImage.fileIndex)}
        upload={upload}
      />
    </>
  );
};
