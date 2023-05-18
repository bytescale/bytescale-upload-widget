import { JSX } from "preact";
import { UploadedFile, UploadInterface } from "upload-js";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { ImageEditor } from "uploader/components/widgets/uploader/components/editors/ImageEditor";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { useImageList } from "uploader/components/widgets/uploader/screens/modules/UseImageList";

interface Props {
  images: UploadedFileContainer[];
  onImageEdited: (keep: boolean, editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  options: UploadWidgetConfigRequired;
  upload: UploadInterface;
}

export const UploaderImageListEditor = ({ images, onImageEdited, upload, options }: Props): JSX.Element => {
  const { currentFile, imageCount, imageIndex, currentImage } = useImageList(images);
  return (
    <ImageEditor
      key={currentFile} // Key required to reset the internal state of the editor between files.
      options={options}
      imageCount={imageCount}
      imageIndex={imageIndex}
      originalImage={currentImage.uploadedFile}
      onImageEdited={(keep, editedFile) => onImageEdited(keep, editedFile, currentImage.fileIndex)}
      upload={upload}
    />
  );
};
