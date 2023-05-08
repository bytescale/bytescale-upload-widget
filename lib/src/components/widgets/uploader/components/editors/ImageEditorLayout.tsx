import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { useLayoutEffect, useState } from "preact/compat";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";
import { UploadedFile } from "upload-js";
import { getElementDimensionsOnParentResize } from "uploader/modules/common/UseDimensionsFromElement";
import "./ImageEditorLayout.scss";
import { calculateImagePreviewUrl } from "uploader/components/widgets/uploader/components/editors/modules/PreviewImageUrlCalculator";

interface Props {
  actions: ReactNode;
  header?: ReactNode;
  image: (props: { imageUrl: string; imgDimensions: Rect }) => ReactNode;
  originalImage: UploadedFile;
}

export const ImageEditorLayout = ({ actions, originalImage, header, image }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState("");
  const [containerId] = useState(`uploader__image-editor__image-${Math.round(Math.random() * 100000)}`);
  const [imgDimensions, imgRef, containerRef] = getElementDimensionsOnParentResize();

  // When multiple images are uploaded, the same component instance is used, so we need to update the image with an effect:
  useLayoutEffect(() => {
    setImageUrl(calculateImagePreviewUrl(originalImage));
  }, [originalImage.fileUrl]);

  return (
    <div className="uploader__image-editor">
      <div
        className={header === undefined ? "uploader__image-editor__header--empty" : "uploader__image-editor__header"}>
        {header}
      </div>
      <div className="uploader__image-editor__image" ref={containerRef}>
        <div className="uploader__image-editor__image-padding">
          <img
            id={containerId}
            src={imageUrl}
            className="uploader__image-editor__image-inner"
            ref={imgRef}
            draggable={false}
          />
          {imgDimensions !== undefined && (
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
