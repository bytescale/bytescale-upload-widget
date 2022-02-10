import { JSX } from "preact";
import { WidgetBase } from "uploader/components/widgets/widgetBase/WidgetBase";
import { UploaderLayout } from "uploader/UploaderLayout";

interface Props {
  error: Error;
  layout: UploaderLayout;
}

export const ConfigError = ({ error, layout }: Props): JSX.Element => (
  <WidgetBase layout={layout}>
    <p>
      <strong>Invalid configuration:</strong>
    </p>
    <p>{(error.message ?? "unknown error").replace("[upload-js] ", "")}</p>
  </WidgetBase>
);
