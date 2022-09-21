import { Upload, UploadInterface, UploadConfig } from "upload-js";
import { UploaderOptions, UploaderOptionsRequired } from "uploader/UploaderOptions";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import { UploaderRoot, UploaderRootProps } from "uploader/components/widgets/uploader/UploaderRoot";
import { RootModal } from "uploader/components/modal/RootModal";
import { UploaderResult } from "uploader/components/modal/UploaderResult";
import { UploaderInterface } from "uploader/UploaderInterface";

export function Uploader(uploadOrConfig: UploadConfig | UploadInterface): UploaderInterface {
  // ----------------
  // READONLY MEMBERS
  // ----------------

  let upload: UploadInstanceMaybe;

  // ----------------
  // CONSTRUCTOR
  // ----------------

  if (UploadInstanceMaybe.isUploadInstance(uploadOrConfig)) {
    upload = { type: "upload", value: uploadOrConfig };
  } else {
    try {
      upload = { type: "upload", value: Upload(uploadOrConfig) };
    } catch (e) {
      upload = { type: "error", value: e };
    }
  }

  // ----------------
  // PUBLIC METHODS
  // ----------------

  const open = async (optionsMaybe: UploaderOptions = {}): Promise<UploaderResult[]> => {
    const options = UploaderOptionsRequired.from(optionsMaybe);

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

    widget.className = `uploader${options.layout === "modal" ? " uploader--with-modal" : ""}`;
    widget.setAttribute(
      "style",
      `--primary-color: ${options.styles.colors.primary}; --primary-active-color: ${options.styles.colors.active}; font-size: ${options.styles.fontSizes.base}px;`
    );

    const uploadedFiles = await new Promise<UploaderResult[]>((resolve, reject) => {
      const props: UploaderRootProps = {
        upload,
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

  return {
    open
  };
}
