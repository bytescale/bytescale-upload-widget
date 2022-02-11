import { JSX } from "preact";
import { WidgetBase } from "uploader/components/widgets/widgetBase/WidgetBase";
import { UploaderLayout } from "uploader/UploaderLayout";

interface Props {
  error: Error;
  layout: UploaderLayout;
}

export const ConfigError = ({ error, layout }: Props): JSX.Element => (
  <WidgetBase layout={layout}>
    <h1>Oops!</h1>
    <p>{(error.message ?? "unknown error").replace("[upload-js] ", "")}</p>
  </WidgetBase>
);
