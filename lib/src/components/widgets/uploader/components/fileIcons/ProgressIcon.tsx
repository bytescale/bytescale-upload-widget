import { JSX } from "preact";
import "./ProgressIcon.scss";

interface Props {
  progress: number; // Factor (0 to 1)
}

export const ProgressIcon = ({ progress }: Props): JSX.Element => {
  const radius = 10;
  const stokeWidth = radius * 2;
  const size = stokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;

  return (
    <>
      <svg className="progress-icon" width={size} height={size}>
        <circle
          className="progress-icon__circle"
          stroke-width={stokeWidth}
          fill="transparent"
          r={radius}
          cx={stokeWidth}
          cy={stokeWidth}
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
        />
      </svg>
    </>
  );
};
