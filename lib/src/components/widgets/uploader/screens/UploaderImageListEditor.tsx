import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { ImageEditor } from "uploader/components/widgets/uploader/components/editors/ImageEditor";
import { useLayoutEffect, useState } from "preact/compat";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";

interface Props {
  images: UploadedFileContainer[];
  onImageEdited: (editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  options: UploaderOptionsRequired;
  upload: Upload;
}

export const UploaderImageListEditor = ({ images, onImageEdited, upload, options }: Props): JSX.Element => {
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
        key={currentFileId} // Key required to reset the internal state of the editor between files.
        options={options}
        imageCount={imageCount}
        imageIndex={imageIndex}
        originalImage={currentImage.uploadedFile}
        onImageEdited={e => onImageEdited(e, currentImage.fileIndex)}
        upload={upload}
      />
    </>
  );
};
