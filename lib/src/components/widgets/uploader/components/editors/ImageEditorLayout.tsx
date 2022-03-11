import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { useLayoutEffect, useState } from "preact/compat";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";
import { useWindowSize } from "uploader/modules/common/UseWindowSize";
import { UploadedFile } from "upload-js";
import "./ImageEditorLayout.scss";

interface Props {
  actions: ReactNode;
  header?: ReactNode;
  image: (props: { boundary: Rect }) => ReactNode;
  originalImage: UploadedFile;
}

export const ImageEditorLayout = ({ actions, image, originalImage, header }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState(originalImage.fileUrl);
  const [containerId] = useState(`uploader__image-editor__image-${Math.round(Math.random() * 100000)}`);
  const [dimensions, setDimensions] = useState<RectWithPos | undefined>(undefined);
  const windowSize = useWindowSize();

  useLayoutEffect(() => {
    const image = document.querySelector<HTMLImageElement>(`#${containerId}`);
    if (image !== null) {
      image.onload = function () {
        const domRect = image.getBoundingClientRect();
        setDimensions({
          width: domRect.width,
          height: domRect.height,
          x: image.offsetLeft,
          y: image.offsetTop
        });
      };
    }
  }, [windowSize]);

  useLayoutEffect(() => {
    setImageUrl(URL.createObjectURL(originalImage.file));
  }, [originalImage.fileUrl]);

  return (
    <div className="uploader__image-editor">
      <div className={header === undefined ? "uploader__image-editor__empty-header" : " btn-group"}>{header}</div>
      <div className="uploader__image-editor__image">
        <div className="uploader__image-editor__image-padding">
          <img id={containerId} src={imageUrl} className="uploader__image-editor__image-inner" />
          {dimensions !== undefined && (
            <div
              className="uploader__image-editor__image-overlay"
              style={{ width: dimensions.width, height: dimensions.height, left: dimensions.x, top: dimensions.y }}>
              {image({ boundary: dimensions })}
            </div>
          )}
        </div>
      </div>
      <div className="uploader__image-editor__actions btn-group">{actions}</div>
    </div>
  );
};
