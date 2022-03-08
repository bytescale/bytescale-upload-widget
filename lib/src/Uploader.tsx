import { Upload, UploadConfig } from "upload-js";
import { UploaderParams, UploaderParamsRequired } from "uploader/UploaderParams";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderRoot, UploaderRootProps } from "uploader/components/widgets/uploader/UploaderRoot";
import { RootModal } from "uploader/components/modal/RootModal";
import { InlineWidgetBinder } from "uploader/modules/InlineWidgetBinder";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

export class Uploader {
  private readonly upload: UploadInstanceMaybe;
  private readonly inlineWidgets = new InlineWidgetBinder(this);

  constructor(uploadOrConfig: UploadConfig | Upload) {
    if (uploadOrConfig instanceof Upload) {
      this.upload = { type: "upload", value: uploadOrConfig };
    } else {
      try {
        this.upload = { type: "upload", value: new Upload(uploadOrConfig) };
      } catch (e) {
        this.upload = { type: "error", value: e };
      }
    }

    this.inlineWidgets.bindWidgetsAndMonitor();
  }

  async open(paramsMaybe: UploaderParams = {}): Promise<UploaderResult[]> {
    const params = UploaderParamsRequired.from(paramsMaybe);

    // Important: wait for body first, before using 'querySelector' below.
    const body = await this.getBody();

    const container =
      params.container !== undefined
        ? typeof params.container === "string"
          ? document.querySelector(params.container) ?? undefined
          : params.container
        : undefined;

    let widget: Element;

    if (params.layout === "modal") {
      widget = document.createElement("div");
      (container ?? body).appendChild(widget);
    } else {
      widget = container ?? document.createElement("div");
    }

    widget.className = `uploader${params.layout === "modal" ? " uploader--with-modal" : ""}`;

    const uploadedFiles = await new Promise<UploaderResult[]>((resolve, reject) => {
      const props: UploaderRootProps = {
        upload: this.upload,
        resolve,
        reject,
        params
      };

      render(
        params.layout === "modal" ? <RootModal {...props} container={widget} /> : <UploaderRoot {...props} />,
        widget
      );
    });

    if (params.layout === "modal") {
      widget.remove();
    }

    return uploadedFiles;
  }

  /**
   * Required when the 'uploader.open()' method is called from within '<head>'.
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
