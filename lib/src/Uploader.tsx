import { Upload, UploadConfig, UploadedFile } from "upload-js";
import { UploaderParams, UploaderParamsRequired } from "uploader/UploaderParams";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderRoot, UploaderRootProps } from "uploader/components/widgets/uploader/UploaderRoot";
import { RootModal } from "uploader/components/modal/RootModal";
import { InlineWidgetBinder } from "uploader/modules/InlineWidgetBinder";

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

  async open(paramsMaybe: UploaderParams = {}): Promise<UploadedFile[]> {
    const params = UploaderParamsRequired.from(paramsMaybe);
    const container =
      params.container !== undefined
        ? typeof params.container === "string"
          ? document.querySelector(params.container) ?? undefined
          : params.container
        : undefined;

    const body = await this.getBody();

    let widget: Element;

    if (params.layout === "modal") {
      widget = document.createElement("div");
      (container ?? body).appendChild(widget);
    } else {
      widget = container ?? document.createElement("div");
    }

    widget.className = `uploader${params.layout === "modal" ? " uploader--with-modal" : ""}`;

    const uploadedFiles = await new Promise<UploadedFile[]>((resolve, reject) => {
      let isPromiseResolved = false;
      const resolver = (files: UploadedFile[]): void => {
        // We only resolve the promise on modals. On inline layouts, the widget never reaches a terminal state. Instead,
        // the user should receive updates via the 'onUpdate' callback. This allows integrators to have their own
        // "finish" button on their form, along with other form fields, and allow the inline Uploader to essentially be
        // a mutable file control that in itself never "ends".
        if (!isPromiseResolved && params.layout === "modal") {
          resolve(files);
          isPromiseResolved = true;
        }
      };
      const props: UploaderRootProps = {
        upload: this.upload,
        resolve: resolver,
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
