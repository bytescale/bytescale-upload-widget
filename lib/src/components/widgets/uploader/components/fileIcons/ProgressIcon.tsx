import { JSX } from "preact";
import "./ProgressIcon.scss";
import { useEffect, useState } from "preact/compat";

interface Props {
  progress: number; // Factor (0 to 1)
}

export const ProgressIcon = ({ progress }: Props): JSX.Element => {
  const [completed, setCompleted] = useState(false);
  const radius = 10;
  const stokeWidth = radius * 2;
  const size = stokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;

  useEffect(() => {
    if (progress === 1) {
      const timeout = setTimeout(() => {
        setCompleted(true);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <>
      <svg className="progress-icon" width={size} height={size}>
        <circle
          className="progress-icon__circle"
          stroke-width={completed ? 0 : stokeWidth}
          fill="transparent"
          r={completed ? 0 : radius}
          cx={stokeWidth}
          cy={stokeWidth}
          style={{
            strokeDasharray,
            strokeDashoffset,
            opacity: completed ? 0 : 1
          }}
        />
      </svg>
    </>
  );
};
