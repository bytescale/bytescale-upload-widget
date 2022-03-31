import { DataTaggedElementTracker } from "uploader/modules/common/DataTaggedElementTracker";
import { Uploader } from "uploader";
import { UploaderOptions } from "uploader/UploaderOptions";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

export class InlineWidgetBinder {
  private readonly elementTracker: DataTaggedElementTracker;
  private readonly attributes = {
    onUpload: "data-upload-complete",
    onFinalize: "data-upload-finalized",
    uploadConfig: "data-upload-config"
  };

  constructor(private readonly uploader: Uploader) {
    this.elementTracker = new DataTaggedElementTracker([this.attributes.onUpload, this.attributes.onFinalize], e =>
      this.bindWidget(e)
    );
  }

  bindWidgetsAndMonitor(): void {
    this.elementTracker.findElementsAndMonitor();
  }

  private bindWidget(element: HTMLElement): void {
    switch (element.nodeName.toLowerCase()) {
      case "div":
        this.bindInlineWidget(element);
        break;
      case "a":
      case "button":
        this.bindGenericWidget(element);
        break;
      default:
        console.error(`Uploader does not support [${this.attributes.onUpload}] on <${element.nodeName} /> elements.`);
    }
  }

  private bindInlineWidget(element: HTMLElement): void {
    this.openUploader(element, {
      ...this.getConfig(element),
      container: element,
      layout: "inline",
      onUpdate: f => this.fireUploadComplete(element, f, true)
    });
  }

  private bindGenericWidget(element: HTMLElement): void {
    element.onclick = e => {
      e.preventDefault();
      this.openUploader(element, this.getConfig(element));
    };
  }

  private openUploader(element: HTMLElement, options: UploaderOptions | undefined): void {
    this.uploader.open(options).then(
      f => this.fireUploadComplete(element, f, false),
      e => console.error(e)
    );
  }

  private fireUploadComplete(element: HTMLElement, f: UploaderResult[], isUpdateEvent: boolean): void {
    if (f.length === 0 && !isUpdateEvent) {
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

    // Separate event handler required because <div> elements (which render inline) will have there 'data-upload-complete'
    // handle called on 'onUpdate' too. The 'data-upload-finalize' event gives them the ability to differentiate between
    // the update events & the terminal events.
    if (!isUpdateEvent) {
      // eslint-disable-next-line no-eval
      eval(element.getAttribute(this.attributes.onFinalize) ?? "");
    }
  }

  private getConfig(element: HTMLElement): UploaderOptions | undefined {
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
