import { Upload, UploadConfig, UploadedFile } from "upload-js";
import { UploaderParams, UploaderParamsRequired } from "uploader/UploaderParams";
import { render } from "preact";
import { UploaderWidget } from "uploader/widget/UploaderWidget";

export class Uploader {
  private readonly upload: Upload;

  constructor(uploadOrConfig: UploadConfig | Upload) {
    if (uploadOrConfig instanceof Upload) {
      this.upload = uploadOrConfig;
    } else {
      this.upload = new Upload(uploadOrConfig);
    }
  }

  async open(params: UploaderParams = {}): Promise<UploadedFile[]> {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const uploadedFiles = await new Promise<UploadedFile[]>((resolve, reject) => {
      render(
        <UploaderWidget
          resolve={resolve}
          reject={reject}
          params={UploaderParamsRequired.from(params)}
          upload={this.upload}
        />,
        container
      );
    });

    container.remove();

    return uploadedFiles;
  }
}
