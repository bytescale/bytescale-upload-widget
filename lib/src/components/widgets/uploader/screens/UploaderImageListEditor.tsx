import { JSX } from "preact";
import { UploadedFile, UploadInterface } from "upload-js";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { ImageEditor } from "uploader/components/widgets/uploader/components/editors/ImageEditor";
import { useLayoutEffect, useState } from "preact/compat";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";

interface Props {
  images: UploadedFileContainer[];
  onImageEdited: (editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  options: UploaderOptionsRequired;
  upload: UploadInterface;
}

export const UploaderImageListEditor = ({ images, onImageEdited, upload, options }: Props): JSX.Element => {
  const [currentImage, setCurrentImage] = useState<UploadedFileContainer>(images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(images.length);
  const editingFiles = images.map(x => x.uploadedFile.filePath);
  const currentFile = currentImage.uploadedFile.filePath;

  // Prevents image being swapped-out mid-edit if an upload that was started _before_ this image finishes _after_ this
  // image has uploaded.
  useLayoutEffect(() => {
    const hasFinishedEditing = !editingFiles.includes(currentFile);
    if (hasFinishedEditing) {
      setCurrentImage(images[0]);
      setImageIndex(i => i + 1);
    }
    setImageCount(imageIndex + images.length);
  }, [imageIndex, currentFile, ...editingFiles]);

  return (
    <>
      <ImageEditor
        key={currentFile} // Key required to reset the internal state of the editor between files.
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
