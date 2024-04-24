import { JSX } from "preact";
import { ReactNode } from "@bytescale/upload-widget/modules/common/React";
import { useLayoutEffect, useState } from "preact/compat";
import { RectWithPos } from "@bytescale/upload-widget/modules/common/Rect";
import { getElementDimensionsOnParentResize } from "@bytescale/upload-widget/modules/common/UseDimensionsFromElement";
import { calculateImagePreviewUrl } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/modules/PreviewImageUrlCalculator";
import { Spinner } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/Spinner";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import cn from "classnames";
import "./ImageEditorLayout.scss";

interface Props {
  actions: ReactNode;
  header?: ReactNode;
  image?: (props: { imageUrl: string; imgDimensions: RectWithPos }) => ReactNode;
  modal: boolean;
  originalImage: UploadedFile;
}

export const ImageEditorLayout = ({ actions, originalImage, header, image, modal }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState("");

  // Used to determine whether to show the image element or the spinner.
  const [imageLoaded, setImageLoaded] = useState(false);

  // Used to track if the image element is 'loaded' per its onload state.
  const [imageLoadedReal, setImageLoadedReal] = useState(false);

  const [containerId] = useState(`upload-widget__image-editor__image-${Math.round(Math.random() * 100000)}`);
  const [imgDimensions, imgRef, containerRef] = getElementDimensionsOnParentResize(imageLoadedReal, [
    imageUrl,
    imageLoaded
  ]);

  // When multiple images are uploaded, the same component instance is used, so we need to update the image with an effect:
  useLayoutEffect(() => {
    const { url, external } = calculateImagePreviewUrl(originalImage);
    setImageUrl(url);
    setImageLoaded(!external); // Delay for displaying a local image is very short, so don't flash the loader to the user.
    setImageLoadedReal(false); // Image will be unloaded to being with, as we're changing its "src" attribute here.
  }, [originalImage.fileUrl]);

  return (
    <div className="upload-widget__image-editor">
      <div
        className={cn({
          "upload-widget__image-editor__header": header !== undefined,
          "upload-widget__image-editor__header--empty-non-modal": header === undefined && !modal
        })}
      >
        {header}
      </div>
      <div className="upload-widget__image-editor__image" ref={containerRef}>
        <div className="upload-widget__image-editor__image-padding">
          {!imageLoaded && <Spinner />}
          <img
            id={containerId}
            src={imageUrl}
            onLoad={() => {
              setImageLoaded(true);
              setImageLoadedReal(true);
            }}
            className="upload-widget__image-editor__image-inner"
            style={imageLoaded ? {} : { display: "none" }}
            ref={imgRef}
            draggable={false}
          />
          {imgDimensions !== undefined && imageLoaded && image !== undefined && image({ imgDimensions, imageUrl })}
        </div>
      </div>
      <div className="upload-widget__image-editor__actions upload-widget__controls upload-widget__controls--space">
        {actions}
      </div>
    </div>
  );
};
