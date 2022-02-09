import { ReactNode } from "uploader/common/React";
import { JSX } from "preact";
import cn from "classnames";

import "./WidgetBase.scss";

interface Props {
  children: ReactNode;
  className?: string;
  htmlProps?: any;
}

export const WidgetBase = ({ children, className, htmlProps }: Props): JSX.Element => (
  <div className={cn("uploader__widget-base", className)} {...htmlProps}>
    {children}
  </div>
);
