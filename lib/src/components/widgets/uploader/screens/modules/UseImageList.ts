import { useLayoutEffect, useState } from "preact/compat";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { FilePath } from "@upload-io/upload-api-client-upload-js/dist/models/FilePath";

interface Foo {
  currentFile: FilePath;
  currentImage: UploadedFileContainer;
  imageCount: number;
  imageIndex: number;
}

export function useImageList(images: UploadedFileContainer[]): Foo {
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

  return { currentFile, imageCount, imageIndex, currentImage };
}
