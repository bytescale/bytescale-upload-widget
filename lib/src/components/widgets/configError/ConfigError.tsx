import { JSX } from "preact";
import { WidgetBase } from "uploader/components/widgets/widgetBase/WidgetBase";

interface Props {
  error: Error;
}

export const ConfigError = ({ error }: Props): JSX.Element => (
  <WidgetBase>
    <p>
      <strong>Invalid configuration:</strong>
    </p>
    <p>{(error.message ?? "unknown error").replace("[upload-js] ", "")}</p>
  </WidgetBase>
);
