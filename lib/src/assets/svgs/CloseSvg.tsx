import { JSX } from "preact";
import { ResizedSvg } from "uploader/assets/svgs/utils/ResizedSvg";

export const CloseSvg = ({ className, width }: { className?: string; width?: number }): JSX.Element => (
  <ResizedSvg originalWidth={20} originalHeight={20} width={width ?? 20} className={className}>
    <path
      fill="currentColor"
      d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"
    />
  </ResizedSvg>
);
