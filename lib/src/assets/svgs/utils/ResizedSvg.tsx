import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { JSXInternal } from "preact/src/jsx";
import CSSProperties = JSXInternal.CSSProperties;

interface BaseProps {
  children: ReactNode;
  className?: string;
  originalHeight: number;
  originalWidth: number;
  style?: CSSProperties;
}

interface HeightProps extends BaseProps {
  height: number;
}
interface WidthProps extends BaseProps {
  width: number;
}

type Props = HeightProps | WidthProps;

/**
 * IE11 doesn't like it when setting only width or height, so this utility makes it easier to set both.
 */
export const ResizedSvg = ({
  children,
  className,
  originalHeight,
  originalWidth,
  style,
  ...rest
}: Props): JSX.Element => {
  const widthMaybe = (rest as Partial<WidthProps>)?.width;
  const heightMaybe = (rest as Partial<HeightProps>)?.height;
  return (
    <svg
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        ...style,
        ...(heightMaybe !== undefined
          ? { height: `${heightMaybe}px`, width: `${heightMaybe * (originalWidth / originalHeight)}px` }
          : widthMaybe !== undefined
          ? { width: `${widthMaybe}px`, height: `${widthMaybe * (originalHeight / originalWidth)}px` }
          : {})
      }}>
      {children}
    </svg>
  );
};
