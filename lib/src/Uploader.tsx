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
    container.className = "uploader";
    document.body.appendChild(container);

    return await this.addClass(
      document.documentElement,
      "uploader__html",
      async () =>
        await this.addClass(document.body, "uploader__body", async () => {
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
        })
    );
  }

  private async addClass<T>(element: Element, className: string, callback: () => Promise<T>): Promise<T> {
    const oldClass = element.className;
    try {
      element.className = `${oldClass} ${className}`;
      return await callback();
    } finally {
      element.className = oldClass;
    }
  }
}
