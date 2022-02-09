import { Upload, UploadConfig, UploadedFile } from "upload-js";
import { UploaderParams, UploaderParamsRequired } from "uploader/UploaderParams";
import { render } from "preact";
import { UploadInstanceMaybe } from "uploader/UploadInstanceMaybe";
import {
  UploaderOrConfigError,
  UploaderOrConfigErrorProps
} from "uploader/components/widgets/uploaderOrConfigError/UploaderOrConfigError";
import { RootModal } from "uploader/components/modal/RootModal";

export class Uploader {
  private readonly upload: UploadInstanceMaybe;

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
  }

  async open(paramsMaybe: UploaderParams = {}): Promise<UploadedFile[]> {
    const params = UploaderParamsRequired.from(paramsMaybe);
    const existingContainer =
      params.containerElementId !== undefined
        ? document.getElementById(params.containerElementId) ?? undefined
        : undefined;
    const container = existingContainer ?? document.createElement("div");
    container.className = `uploader${params.layout === "modal" ? " uploader--with-modal" : ""}`;

    if (existingContainer === undefined) {
      document.body.appendChild(container);
    }

    const uploadedFiles = await new Promise<UploadedFile[]>((resolve, reject) => {
      const props: UploaderOrConfigErrorProps = {
        upload: this.upload,
        resolve,
        reject,
        params
      };

      render(
        params.layout === "modal" ? (
          <RootModal {...props} container={container} />
        ) : (
          <UploaderOrConfigError {...props} />
        ),
        container
      );
    });

    container.remove();

    return uploadedFiles;
  }
}
