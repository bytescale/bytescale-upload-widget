import { UploadedFile } from "upload-js";

export interface UploaderResult {
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

export namespace UploaderResult {
  export function from(originalFile: UploadedFile, editedFile: UploadedFile | undefined): UploaderResult {
    const calculateFileUrl = (): string => {
      const find = "/raw/";
      const replace = "/thumbnail/"; // Will be the "auto" transformation in future.

      if (editedFile === undefined || !editedFile.fileUrl.includes(find)) {
        return originalFile.fileUrl;
      }

      return editedFile.fileUrl.replace(find, replace);
    };

    return {
      editedFile,
      originalFile,
      fileUrl: calculateFileUrl(),
      filePath: editedFile?.filePath ?? originalFile.filePath
    };
  }
}
