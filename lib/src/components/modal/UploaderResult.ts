import { UploadedFile } from "upload-js";

export interface UploaderResult {
  editedFile: UploadedFile | undefined;

  /**
   * If editedFile is defined, returns its URL, appended with the first suitable transformation (if any).
   * If editedFile is undefined, returns the original file URL, appended with the first suitable transformation (if any).
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
      fileUrl: calculateFileUrl()
    };
  }
}
