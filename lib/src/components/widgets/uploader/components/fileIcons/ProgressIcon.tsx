import { JSX } from "preact";
import "./ProgressIcon.scss";
import { useEffect, useState } from "preact/compat";
import cn from "classnames";

interface Props {
  height: number;
  isError: boolean;
  onCompleteImageSource: string;
  progress: number; // Factor (0 to 1)
}

export const ProgressIcon = ({ height, progress, onCompleteImageSource, isError }: Props): JSX.Element => {
  const [completed, setCompleted] = useState(false);
  const radius = height / 2;
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
    <span className="progress-icon__container">
      <svg className="progress-icon" width={size} height={size}>
        <circle
          className="progress-icon__circle__bg"
          strokeWidth={0}
          r={size / 2}
          cx={size / 2}
          cy={size / 2}
          style={{ opacity: completed ? 0 : 1 }}
        />
        <circle
          className={cn("progress-icon__circle", { "progress-icon__circle--error": isError })}
          strokeWidth={completed ? 0 : stokeWidth}
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
      <span
        className={cn("progress-icon__thumbnail", { "progress-icon__thumbnail--hidden": !completed })}
        style={{ backgroundImage: `url(${onCompleteImageSource})` }}
      />
    </span>
  );
};
