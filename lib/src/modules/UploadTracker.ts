import { UploadManager, UploadManagerParams } from "@bytescale/sdk";
import { CancellationToken } from "@bytescale/sdk/dist/types/public/shared/CommonTypes";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { FileLike } from "@bytescale/upload-widget/modules/FileLike";
import { BytescaleApiClientConfig } from "@bytescale/sdk/dist/types/public/shared/generated";

/**
 * Allows all file uploads to be cancelled (e.g. when widget closes).
 */
export class UploadTracker {
  private uploadCancellations: Array<() => void> = [];
  private readonly uploadManager: UploadManager;

  constructor(readonly config: BytescaleApiClientConfig) {
    this.uploadManager = new UploadManager(config);
  }

  cancelAll(): void {
    this.uploadCancellations.forEach(cancel => cancel());
    this.uploadCancellations = [];
  }

  async uploadFile(
    file: FileLike,
    request: Omit<UploadManagerParams, "data" | "accountId"> & { onBegin?: (params: { cancel: () => void }) => void }
  ): Promise<UploadedFile> {
    let cancel: (() => void) | undefined;
    try {
      const cancellationToken: CancellationToken = request.cancellationToken ?? {
        isCancelled: false
      };
      cancel = () => {
        cancellationToken.isCancelled = true;
      };
      this.uploadCancellations = [...this.uploadCancellations, cancel];

      if (request.onBegin !== undefined) {
        request.onBegin({ cancel });
      }

      const fileDetails = await this.uploadManager.upload({
        ...request,
        cancellationToken,
        data: file
      });

      return {
        ...fileDetails,
        file
      };
    } finally {
      this.uploadCancellations = this.uploadCancellations.filter(x => x !== cancel);
    }
  }
}
