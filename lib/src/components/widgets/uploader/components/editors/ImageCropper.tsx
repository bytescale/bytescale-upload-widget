import { JSX } from "preact";
import { ResizableSquare } from "uploader/components/widgets/uploader/components/editors/shapes/ResizableSquare";
import { ParamsFromFile } from "uploader/components/widgets/uploader/model/ParamsFromFile";
import { Upload, UploadedFile } from "upload-js";
import { ImageEditorLayout } from "uploader/components/widgets/uploader/components/editors/ImageEditorLayout";
import { useState } from "preact/compat";
import { SubmitButton } from "uploader/components/widgets/uploader/components/buttons/SubmitButton";
import { UploaderLocale } from "uploader";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";

interface Props {
  locale: UploaderLocale;
  multi:
    | undefined
    | {
        imageCount: number;
        imageIndex: number;
      };
  onFinish: (editedFile: UploadedFile | undefined) => void;
  originalImage: UploadedFile;
  ratio: number | undefined;
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

export const ImageCropper = ({ locale, originalImage, upload, onFinish, ratio, multi }: Props): JSX.Element => {
  const [geometry, setGeometry] = useState<{ boundary: Rect; geometry: RectWithPos } | undefined>(undefined);

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
            {multi.imageIndex + 1} of {multi.imageCount}
          </span>
        )
      }
      actions={
        <>
          <SubmitButton
            onSubmit={submit}
            locale={locale}
            idleText={locale.continue}
            busyText={locale.pleaseWait}
            showIcon={false}
          />
        </>
      }
      image={({ boundary }) => <ResizableSquare boundary={boundary} onResized={setGeometry} ratio={ratio} />}
      originalImage={originalImage}
    />
  );
};
