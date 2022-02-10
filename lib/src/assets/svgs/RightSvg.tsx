import { JSX } from "preact";
import { ResizedSvg } from "uploader/assets/svgs/utils/ResizedSvg";

export const RightSvg = ({ className, width }: { className?: string; width?: number }): JSX.Element => (
  <ResizedSvg originalWidth={13} originalHeight={10} width={width ?? 13} className={className}>
    <path
      d="M6.293.293a.999.999 0 0 0 0 1.414L8.586 4H1a1 1 0 0 0 0 2h7.586L6.293 8.293a.999.999 0 1 0 1.414 1.414L12.414 5 7.707.293a.999.999 0 0 0-1.414 0Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </ResizedSvg>
);
