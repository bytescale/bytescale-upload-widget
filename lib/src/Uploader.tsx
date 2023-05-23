import { Upload, UploadInterface, UploadConfig } from "upload-js";
import { UploadWidgetConfig, UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploadWidgetContainerProps } from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploaderInterface } from "uploader/UploaderInterface";
import { RootContainer } from "uploader/components/RootContainer";
import { UploadManager } from "uploader/modules/UploadManager";

export function Uploader(uploadOrConfig: UploadConfig | UploadInterface): UploaderInterface {
  // ----------------
  // READONLY MEMBERS
  // ----------------

  let uploadMaybe: UploadInstanceMaybe;

  // ----------------
  // CONSTRUCTOR
  // ----------------

  if (UploadInstanceMaybe.isUploadInstance(uploadOrConfig)) {
    uploadMaybe = { type: "upload", value: uploadOrConfig };
  } else {
    try {
      uploadMaybe = { type: "upload", value: Upload(uploadOrConfig) };
    } catch (e) {
      uploadMaybe = { type: "error", value: e as Error };
    }
  }

  // ----------------
  // PUBLIC METHODS
  // ----------------

  const open = async (optionsMaybe: UploadWidgetConfig = {}): Promise<UploadWidgetResult[]> => {
    const options = UploadWidgetConfigRequired.from(optionsMaybe);

    // Important: wait for body first, before using 'querySelector' below.
    const body = await getBody();

    const container =
      options.container !== undefined
        ? typeof options.container === "string"
          ? document.querySelector(options.container) ?? undefined
          : options.container
        : undefined;

    const widget = document.createElement("div");
    (container ?? body).appendChild(widget);

    // Do not refer to 'options' in this file (where possible): move to 'RootContainer' so that it can handle prop updates.
    widget.className = "uploader__root";

    let uploadManager: UploadManager | undefined;
    let upload = uploadMaybe;
    if (uploadMaybe.type === "upload") {
      uploadManager = new UploadManager(uploadMaybe.value);
      upload = { type: "upload", value: uploadManager };
    }

    const uploadedFiles = await new Promise<UploadWidgetResult[]>((resolve, reject) => {
      const props: UploadWidgetContainerProps = {
        upload,
        resolve,
        reject,
        options
      };

      render(<RootContainer widgetProps={props} />, widget);
    });

    widget.remove();
    uploadManager?.cancelAll(); // Stops in-progress uploads when the widget is closed.

    return uploadedFiles;
  };

  // ----------------
  // PRIVATE METHODS
  // ----------------

  /**
   * Required when the 'uploader.open()' method is called from within '<head>'.
   */
  const getBody = async (): Promise<HTMLElement> => {
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
  };

  // If this isn't a valid upload instance, then the user will experience errors when attempting to use it as one, but
  // they'll also be aware there's a problem as we'll render one on screen.
  const upload: UploadInterface = uploadMaybe.type === "upload" ? uploadMaybe.value : ({} as any);

  return {
    ...upload,
    open
  };
}
