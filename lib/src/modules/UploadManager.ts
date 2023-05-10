import { UploadedFile, UploadInterface } from "upload-js";
import { UploadParams } from "upload-js/dist/UploadParams";
import { FileLike } from "upload-js/dist/FileLike";
import { UrlParams } from "upload-js/dist/UrlParams";

/**
 * Allows all file uploads to be cancelled (e.g. when widget closes).
 */
export class UploadManager implements UploadInterface {
  private uploadCancellations: Array<() => void> = [];

  constructor(private readonly instance: UploadInterface) {}

  cancelAll(): void {
    this.uploadCancellations.forEach(cancel => cancel());
  }

  async beginAuthSession(authUrl: string, authHeaders: () => Promise<Record<string, string>>): Promise<void> {
    return await this.instance.beginAuthSession(authUrl, authHeaders);
  }

  async endAuthSession(): Promise<void> {
    return await this.instance.endAuthSession();
  }

  async uploadFile(file: FileLike, params: UploadParams | undefined): Promise<UploadedFile> {
    let cancellation: (() => void) | undefined;
    try {
      return await this.instance.uploadFile(file, {
        ...params,
        onBegin: onBeginParams => {
          cancellation = onBeginParams.cancel;
          this.uploadCancellations = [...this.uploadCancellations, cancellation];
          if (params?.onBegin !== undefined) {
            params.onBegin(onBeginParams);
          }
        }
      });
    } finally {
      this.uploadCancellations = this.uploadCancellations.filter(x => x !== cancellation);
    }
  }

  url(filePath: string, slugOrParams?: string | UrlParams): string {
    return this.instance.url(filePath, slugOrParams);
  }
}
