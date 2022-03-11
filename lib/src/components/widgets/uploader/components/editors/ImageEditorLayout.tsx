import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { useCallback, useLayoutEffect, useState } from "preact/compat";
import { Rect } from "uploader/modules/common/Rect";
import { UploadedFile } from "upload-js";
import { useElementDimensions } from "uploader/modules/common/UseElementDimensions";
import "./ImageEditorLayout.scss";

interface Props {
  actions: ReactNode;
  header?: ReactNode;
  image: (props: { boundary: Rect }) => ReactNode;
  originalImage: UploadedFile;
}

export const ImageEditorLayout = ({ actions, originalImage, header, image }: Props): JSX.Element => {
  const [imageUrl, setImageUrl] = useState(originalImage.fileUrl);
  const [containerId] = useState(`uploader__image-editor__image-${Math.round(Math.random() * 100000)}`);
  const [imgElement, setImgElement] = useState<HTMLImageElement | undefined>(undefined);
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    setImgElement(img ?? undefined);
  }, []);
  const dimensions = useElementDimensions(imgElement);

  useLayoutEffect(() => {
    setImageUrl(URL.createObjectURL(originalImage.file));
  }, [originalImage.fileUrl]);

  return (
    <div className="uploader__image-editor">
      <div
        className={header === undefined ? "uploader__image-editor__header--empty" : "uploader__image-editor__header"}>
        {header}
      </div>
      <div className="uploader__image-editor__image">
        <div className="uploader__image-editor__image-padding">
          <img id={containerId} src={imageUrl} className="uploader__image-editor__image-inner" ref={imgRef} />
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
