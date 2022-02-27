import { JSX } from "preact";
import { ResizedSvg } from "uploader/assets/svgs/utils/ResizedSvg";

export const CloseSvg = ({ className, width }: { className?: string; width?: number }): JSX.Element => (
  <ResizedSvg originalWidth={27} originalHeight={26} width={width ?? 27} className={className}>
    <g transform="rotate(45 6.547 16.13)" fill="currentColor" fillRule="evenodd">
      <rect x="7.75" width="2.5" height="18" rx="1.25" />
      <rect transform="rotate(90 9 9)" x="7.75" width="2.5" height="18" rx="1.25" />
    </g>
  </ResizedSvg>
);
