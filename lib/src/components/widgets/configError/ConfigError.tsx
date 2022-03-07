import { JSX } from "preact";
import { WidgetBase } from "uploader/components/widgets/widgetBase/WidgetBase";
import { UploaderLayout } from "uploader/UploaderLayout";
import { RightSvg } from "uploader/assets/svgs/RightSvg";

interface Props {
  error: Error;
  layout: UploaderLayout;
}

export const ConfigError = ({ error, layout }: Props): JSX.Element => {
  const errorMessage = (error.message ?? "unknown error").replace("[upload-js] ", "");
  const isApiKeyError = errorMessage.toLowerCase().includes("api key");
  return (
    <WidgetBase layout={layout} multi={false}>
      <h1>{isApiKeyError ? "Almost there..." : "Oops!"}</h1>
      <p>{errorMessage}</p>
      {isApiKeyError ? (
        <div className="mt-5">
          <a href="https://upload.io/get-started" className="btn btn--primary-outline">
            Get API Key <RightSvg width={12} className="ml-2" />
          </a>{" "}
        </div>
      ) : (
        <></>
      )}
    </WidgetBase>
  );
};
