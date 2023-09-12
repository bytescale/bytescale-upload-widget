import { UploadWidgetConfig, UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";
import { render } from "preact";
import { MaybeError } from "@bytescale/upload-widget/MaybeError";
import { UploadWidgetContainerProps } from "@bytescale/upload-widget/components/widgets/uploadWidget/UploadWidgetContainer";
import { UploadWidgetResult } from "@bytescale/upload-widget/components/modal/UploadWidgetResult";
import { RootContainer } from "@bytescale/upload-widget/components/RootContainer";
import { UploadTracker } from "@bytescale/upload-widget/modules/UploadTracker";
import { BytescaleApiClientConfig } from "@bytescale/sdk";

export class UploadWidget {
  private readonly uploadTracker: MaybeError<UploadTracker>;

  constructor(config: BytescaleApiClientConfig) {
    try {
      this.uploadTracker = { type: "success", value: new UploadTracker(config) };
    } catch (e) {
      this.uploadTracker = { type: "error", value: e as Error };
    }
  }

  async open(optionsMaybe: UploadWidgetConfig = {}): Promise<UploadWidgetResult[]> {
    const options = UploadWidgetConfigRequired.from(optionsMaybe);

    // Important: wait for body first, before using 'querySelector' below.
    const body = await this.getBody();

    const container =
      options.container !== undefined
        ? typeof options.container === "string"
          ? document.querySelector(options.container) ?? undefined
          : options.container
        : undefined;

    const widget = document.createElement("div");
    (container ?? body).appendChild(widget);

    // Do not refer to 'options' in this file (where possible): move to 'RootContainer' so that it can handle prop updates.
    widget.className = "upload-widget__root";

    const uploadedFiles = await new Promise<UploadWidgetResult[]>((resolve, reject) => {
      const props: UploadWidgetContainerProps = {
        upload: this.uploadTracker,
        resolve,
        reject,
        options
      };

      render(<RootContainer widgetProps={props} />, widget);
    });

    widget.remove();

    if (this.uploadTracker.type === "success") {
      this.uploadTracker.value.cancelAll(); // Stops in-progress uploads when the widget is closed.
    }

    return uploadedFiles;
  }

  /**
   * Required when the 'uploadWidget.open()' method is called from within '<head>'.
   */
  private async getBody(): Promise<HTMLElement> {
    return await new Promise(resolve => {
      const attempt = (): void => {
        const bodyMaybe = document.body ?? undefined;
        if (bodyMaybe !== undefined) {
          resolve(bodyMaybe);
        }
        setTimeout(attempt, 100);
      };

      attempt();
    });
  }
}
