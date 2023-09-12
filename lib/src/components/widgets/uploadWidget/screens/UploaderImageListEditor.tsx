import { JSX } from "preact";
import { UploadedFileContainer } from "@bytescale/upload-widget/components/widgets/uploadWidget/model/SubmittedFile";
import { ImageEditor } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditor";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { useImageList } from "@bytescale/upload-widget/components/widgets/uploadWidget/screens/modules/UseImageList";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";

interface Props {
  images: UploadedFileContainer[];
  onImageEdited: (keep: boolean, editedFile: UploadedFile | undefined, sparseFileIndex: number) => void;
  options: UploadWidgetConfigRequired;
  upload: UploadTracker;
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
