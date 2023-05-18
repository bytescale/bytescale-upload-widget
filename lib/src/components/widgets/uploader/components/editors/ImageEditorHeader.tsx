import { JSX } from "preact";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";

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
      {locale.image} {multi.imageIndex + 1} {locale.of} {multi.imageCount}
    </span>
  );
};
