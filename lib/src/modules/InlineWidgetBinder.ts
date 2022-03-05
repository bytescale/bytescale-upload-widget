import { DataTaggedElementTracker } from "uploader/common/DataTaggedElementTracker";
import { Uploader } from "uploader";
import { UploaderParams } from "uploader/UploaderParams";
import { UploadedFile } from "upload-js";

export class InlineWidgetBinder {
  private readonly elementTracker: DataTaggedElementTracker;
  private readonly attributes = {
    onUpload: "data-upload-complete",
    uploadConfig: "data-upload-config"
  };

  constructor(private readonly uploader: Uploader) {
    this.elementTracker = new DataTaggedElementTracker(this.attributes.onUpload, e => this.bindWidget(e));
  }

  bindWidgetsAndMonitor(): void {
    this.elementTracker.findElementsAndMonitor();
  }

  private bindWidget(element: HTMLElement): void {
    switch (element.nodeName.toLowerCase()) {
      case "div":
        this.bindInline(element);
        break;
      case "a":
      case "button":
        this.bindGenericWidget(element);
        break;
      default:
        console.error(`Uploader does not support [${this.attributes.onUpload}] on <${element.nodeName} /> elements.`);
    }
  }

  private bindInline(element: HTMLElement): void {
    this.openUploader(element, {
      ...this.getConfig(element),
      container: element,
      layout: "inline"
    });
  }

  private bindGenericWidget(element: HTMLElement): void {
    element.onclick = e => {
      e.preventDefault();
      this.openUploader(element, this.getConfig(element));
    };
  }

  private openUploader(element: HTMLElement, params: UploaderParams | undefined): void {
    this.uploader.open(params).then(
      f => this.fireUploadComplete(element, f),
      e => console.error(e)
    );
  }

  private fireUploadComplete(element: HTMLElement, f: UploadedFile[]): void {
    if (f.length === 0) {
      return;
    }

    /* eslint-disable */
    // @ts-expect-error
    const event = {
      // IMPORTANT: this is the event object used by 'data-upload-complete' handlers.
      target: element,
      files: f
    };
    /* eslint-enable */

    // eslint-disable-next-line no-eval
    eval(element.getAttribute(this.attributes.onUpload) ?? "");
  }

  private getConfig(element: HTMLElement): UploaderParams | undefined {
    const config = element.getAttribute(this.attributes.uploadConfig);
    if (config === null) {
      return undefined;
    }

    try {
      return JSON.parse(config);
    } catch (e) {
      throw new Error(`Invalid JSON configuration object found in ${this.attributes.uploadConfig} attribute.`);
    }
  }
}
