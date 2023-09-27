import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { UrlBuilder } from "@bytescale/sdk";

export interface UploadWidgetResult {
  /**
   * The `accountId` the file was uploaded to.
   */
  accountId: string;

  editedFile: UploadedFile | undefined;

  /**
   * The `filePath` of `editedFile` (if it exists) else the `filePath` of `originalFile`.
   */
  filePath: string;

  /**
   * The browser-loadable URL for `filePath`, using the most suitable transformation available from the file owner's Upload account, else uses `raw`.
   */
  fileUrl: string;

  originalFile: UploadedFile;
}

export namespace UploadWidgetResult {
  export function from(originalFile: UploadedFile, editedFile: UploadedFile | undefined): UploadWidgetResult {
    const calculateFileUrl = (): string => {
      if (editedFile === undefined) {
        // Always return the original file if unedited (could be a ZIP, EXE, etc. so don't run through our image API).
        return UrlBuilder.url({ filePath: originalFile.filePath, accountId: originalFile.accountId });
      }

      // DO NOT add a width and height etc.
      // This causes confusion for users, as the expectation is this URL is the image they uploaded, not a resized version
      // of it, and has parity with the URL for images where the user has decided not to crop (which we simply return a
      // raw URL for).
      // The sole purpose of this result is to process CROP files so that they return as images, not JSON files, and to
      // do nothing more. (Again, for parity with uploading images where the user has decided not to crop.)
      return UrlBuilder.url({
        filePath: editedFile.filePath,
        accountId: editedFile.accountId,
        options: {
          transformation: "image"
        }
      });
    };

    return {
      accountId: originalFile.accountId,
      editedFile,
      originalFile,
      fileUrl: calculateFileUrl(),
      filePath: editedFile?.filePath ?? originalFile.filePath
    };
  }
}
