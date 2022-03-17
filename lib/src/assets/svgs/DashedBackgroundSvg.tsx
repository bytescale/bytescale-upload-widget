import { JSX } from "preact";

const baseWidth = 600;
const baseHeight = 400;
const baseNotchSize = 50;

export const DashedBackgroundSvg = ({
  className,
  width,
  height,
  notchSize
}: {
  className?: string;
  height: number;
  notchSize: number;
  width: number;
}): JSX.Element => {
  const widthDelta = baseWidth - width;
  const heightDelta = baseHeight - height;
  const notchDelta = baseNotchSize - notchSize;
  return (
    <svg width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path
          d={`M76 99h${536 - (widthDelta - notchDelta)}a7 7 0 0 1 7 7v${36 - notchDelta}a7 7 0 0 0 7 7h${
            36 - notchDelta
          }a7 7 0 0 1 7 7v${336 - (heightDelta - notchDelta)}a7 7 0 0 1-7 7H76a7 7 0 0 1-7-7V106a7 7 0 0 1 7-7Z`}
          id="rectWithNotch"
        />
        <mask
          id="rectWithNotchMask"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#fff">
          <use xlinkHref="#rectWithNotch" />
        </mask>
      </defs>
      <use
        mask="url(#rectWithNotchMask)"
        xlinkHref="#rectWithNotch"
        transform="translate(-69 -99)"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        fillRule="evenodd"
        strokeDasharray="4"
      />
    </svg>
  );
};
