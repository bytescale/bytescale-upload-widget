import { JSX } from "preact";
import { ResizableSquare } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/shapes/ResizableSquare";
import { ParamsFromFile } from "@bytescale/upload-widget/components/widgets/uploadWidget/model/ParamsFromFile";
import { ImageEditorLayout } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorLayout";
import { useState } from "preact/compat";
import { Rect, RectWithPos } from "@bytescale/upload-widget/modules/common/Rect";
import cn from "classnames";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { calculateImagePreviewUrl } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/modules/PreviewImageUrlCalculator";
import { getImageEditorHeader } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorHeader";
import { ImageEditorButtons } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/editors/ImageEditorButtons";
import "./ImageCropper.scss";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";

interface Props {
  imageCount: number;
  imageIndex: number;
  onFinish: (keep: boolean, editedFile: UploadedFile | undefined) => void;
  options: UploadWidgetConfigRequired;
  originalImage: UploadedFile;
  upload: UploadTracker;
}

function makeCropJson(
  originalFilePathRelative: string,
  geometry: RectWithPos,
  boundary: Rect,
  nativeImageSize: Rect
): ParamsFromFile {
  const scale = nativeImageSize.width / boundary.width;
  return {
    inputPath: originalFilePathRelative,
    pipeline: {
      steps: [
        {
          geometry: {
            offset: {
              x: Math.round(geometry.x * scale),
              y: Math.round(geometry.y * scale)
            },
            size: {
              width: Math.round(geometry.width * scale),
              height: Math.round(geometry.height * scale),
              type: "widthxheight!"
            }
          },
          type: "crop"
        }
      ]
    }
  };
}

export const ImageCropper = (props: Props): JSX.Element => {
  const { options, originalImage, upload, onFinish } = props;
  const [geometry, setGeometry] = useState<{ boundary: Rect; geometry: RectWithPos } | undefined>(undefined);

  const submit = async (keep: boolean): Promise<void> => {
    if (!keep || geometry === undefined) {
      onFinish(keep, undefined);
    } else {
      const nativeImageSize = await new Promise<Rect>(resolve => {
        const img = new Image();
        const imgInfo = calculateImagePreviewUrl(originalImage);
        img.onload = function () {
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = imgInfo.urlForDimensions ?? imgInfo.url;
      });

      const originalImageUploadedName = originalImage.filePath.substring(originalImage.filePath.lastIndexOf("/") + 1);
      const cropJson = makeCropJson(originalImageUploadedName, geometry.geometry, geometry.boundary, nativeImageSize);
      const blob = new Blob([JSON.stringify(cropJson)], { type: "application/json" });
      const editedFile = await upload.uploadFile(
        {
          name: `${originalImage.originalFileName ?? "image"}.crop`,
          type: blob.type,
          size: blob.size,
          slice: (start, end) => blob.slice(start, end)
        },
        {
          path: options.editor.images.cropFilePath(originalImage)
        }
      );
      onFinish(keep, editedFile);
    }
  };

  return (
    <ImageEditorLayout
      modal={options.layout === "modal"}
      header={getImageEditorHeader(props)}
      actions={<ImageEditorButtons options={options} onFinish={submit} />}
      image={({ imgDimensions, imageUrl }) => (
        <div className="upload-widget__image-cropper__overlay" style={RectWithPos.toCssProps(imgDimensions)}>
          <ResizableSquare
            boundary={imgDimensions}
            onResized={setGeometry}
            ratio={options.editor.images.cropRatio}
            allowResizeOnMove={options.editor.images.allowResizeOnMove}>
            <div
              className={cn("upload-widget__image-cropper__clip", {
                "upload-widget__image-cropper__clip--circular": options.editor.images.cropShape === "circ"
              })}
              style={{
                width: geometry?.geometry.width ?? imgDimensions.width,
                height: geometry?.geometry.height ?? imgDimensions.height
              }}>
              <img
                src={imageUrl}
                draggable={false}
                style={{
                  width: imgDimensions.width,
                  height: imgDimensions.height,
                  transform: `translateX(${(geometry?.geometry.x ?? 0) * -1}px) translateY(${
                    (geometry?.geometry.y ?? 0) * -1
                  }px)`
                }}
              />
            </div>
          </ResizableSquare>
        </div>
      )}
      originalImage={originalImage}
    />
  );
};
