import { JSX } from "preact";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";

interface Props {
  imageCount: number;
  imageIndex: number;
  options: UploadWidgetConfigRequired;
}

export const getImageEditorHeader = ({ imageCount, imageIndex, options }: Props): JSX.Element | undefined => {
  const { locale } = options;
  const multi = options.multi ? { imageIndex, imageCount } : undefined;

  return multi === undefined || multi.imageCount === 1 ? undefined : (
    <span className="text-secondary">
      {locale.imageCropNumberPrefix} {multi.imageIndex + 1} {locale.xOfY} {multi.imageCount}
    </span>
  );
};
