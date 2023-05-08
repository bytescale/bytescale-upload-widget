import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { useLayoutEffect, useState } from "preact/compat";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";
import { UploadedFile } from "upload-js";
import { getElementDimensionsOnParentResize } from "uploader/modules/common/UseDimensionsFromElement";
import { calculateImagePreviewUrl } from "uploader/components/widgets/uploader/components/editors/modules/PreviewImageUrlCalculator";
import { Spinner } from "uploader/components/widgets/uploader/components/editors/Spinner";
import cn from "classnames";
import "./ImageEditorLayout.scss";

interface Props {
  actions: ReactNode;
  header?: ReactNode;
  image: (props: { imageUrl: string; imgDimensions: Rect }) => ReactNode;
  modal: boolean;
  originalImage: UploadedFile;
}

export const ImageEditorLayout = ({ actions, originalImage, header, image, modal }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState("");

  // Used to determine whether to show the image element or the spinner.
  const [imageLoaded, setImageLoaded] = useState(false);

  // Used to track if the image element is 'loaded' per its onload state.
  const [imageLoadedReal, setImageLoadedReal] = useState(false);

  const [containerId] = useState(`uploader__image-editor__image-${Math.round(Math.random() * 100000)}`);
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
    <div className="uploader__image-editor">
      <div
        className={cn({
          "uploader__image-editor__header": header !== undefined,
          "uploader__image-editor__header--empty-non-modal": header === undefined && !modal
        })}>
        {header}
      </div>
      <div className="uploader__image-editor__image" ref={containerRef}>
        <div className="uploader__image-editor__image-padding">
          {!imageLoaded && <Spinner />}
          <img
            id={containerId}
            src={imageUrl}
            onLoad={() => {
              setImageLoaded(true);
              setImageLoadedReal(true);
            }}
            className="uploader__image-editor__image-inner"
            style={imageLoaded ? {} : { display: "none" }}
            ref={imgRef}
            draggable={false}
          />
          {imgDimensions !== undefined && imageLoaded && (
            <div className="uploader__image-editor__image-overlay" style={RectWithPos.toCssProps(imgDimensions)}>
              {image({ imgDimensions, imageUrl })}
            </div>
          )}
        </div>
      </div>
      <div className="uploader__image-editor__actions btn-group">{actions}</div>
    </div>
  );
};
