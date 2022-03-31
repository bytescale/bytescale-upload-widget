import { JSX } from "preact";
import { ResizableSquare } from "uploader/components/widgets/uploader/components/editors/shapes/ResizableSquare";
import { ParamsFromFile } from "uploader/components/widgets/uploader/model/ParamsFromFile";
import { Upload, UploadedFile } from "upload-js";
import { ImageEditorLayout } from "uploader/components/widgets/uploader/components/editors/ImageEditorLayout";
import { useState } from "preact/compat";
import { SubmitButton } from "uploader/components/widgets/uploader/components/buttons/SubmitButton";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";
import "./ImageCropper.scss";
import cn from "classnames";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";

interface Props {
  imageCount: number;
  imageIndex: number;
  onFinish: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  options: UploaderOptionsRequired;
  upload: Upload;
}

function makeCropJson(
  originalFileId: string,
  geometry: RectWithPos,
  boundary: Rect,
  nativeImageSize: Rect
): ParamsFromFile {
  const scale = nativeImageSize.width / boundary.width;
  return {
    input: originalFileId,
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

export const ImageCropper = ({
  imageCount,
  imageIndex,
  options,
  originalImage,
  upload,
  onFinish
}: Props): JSX.Element => {
  const { locale } = options;
  const [geometry, setGeometry] = useState<{ boundary: Rect; geometry: RectWithPos } | undefined>(undefined);
  const multi = options.multi ? { imageIndex, imageCount } : undefined;

  const submit = async (): Promise<void> => {
    if (geometry === undefined) {
      onFinish(undefined);
    } else {
      const nativeImageSize = await new Promise<Rect>(resolve => {
        const img = new Image();
        img.onload = function () {
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = URL.createObjectURL(originalImage.file);
      });

      const cropJson = makeCropJson(originalImage.fileId, geometry.geometry, geometry.boundary, nativeImageSize);
      const blob = new Blob([JSON.stringify(cropJson)], { type: "application/json" });
      const editedFile = await upload.uploadFile({
        file: {
          name: `${originalImage.file.name ?? originalImage.fileId}.crop`,
          type: blob.type,
          size: blob.size,
          slice: (start, end) => blob.slice(start, end)
        }
      });
      onFinish(editedFile);
    }
  };

  return (
    <ImageEditorLayout
      header={
        multi === undefined || multi.imageCount === 1 ? undefined : (
          <span className="text-secondary">
            {locale.image} {multi.imageIndex + 1} {locale.of} {multi.imageCount}
          </span>
        )
      }
      actions={
        <>
          <SubmitButton
            onSubmit={submit}
            locale={locale}
            idleText={options.multi ? locale.continue : locale.done}
            busyText={locale.pleaseWait}
            showIcon={false}
          />
        </>
      }
      image={({ imgDimensions, imageUrl }) => (
        <ResizableSquare boundary={imgDimensions} onResized={setGeometry} ratio={options.editor.images.cropRatio}>
          <div
            className={cn("uploader__image-cropper__clip", {
              "uploader__image-cropper__clip--circular": options.editor.images.cropShape === "circ"
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
      )}
      originalImage={originalImage}
    />
  );
};
