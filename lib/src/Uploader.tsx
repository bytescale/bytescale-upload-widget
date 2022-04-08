import { Upload, UploadConfig } from "upload-js";
import { UploaderOptions, UploaderOptionsRequired } from "uploader/UploaderOptions";
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

    if (typeof document !== "undefined") {
      this.inlineWidgets.bindWidgetsAndMonitor();
    }
  }

  async open(optionsMaybe: UploaderOptions = {}): Promise<UploaderResult[]> {
    const options = UploaderOptionsRequired.from(optionsMaybe);

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

    widget.className = `uploader${options.layout === "modal" ? " uploader--with-modal" : ""}`;
    widget.setAttribute(
      "style",
      `--primary-color: ${options.styles.colors.primary}; --primary-active-color: ${options.styles.colors.active}; font-size: ${options.styles.fontSizes.base}px;`
    );

    const uploadedFiles = await new Promise<UploaderResult[]>((resolve, reject) => {
      const props: UploaderRootProps = {
        upload: this.upload,
        resolve,
        reject,
        options
      };

      render(
        options.layout === "modal" ? <RootModal {...props} container={widget} /> : <UploaderRoot {...props} />,
        widget
      );
    });

    if (options.layout === "modal") {
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
