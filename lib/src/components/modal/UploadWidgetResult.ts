import { UploadedFile, UploadInterface } from "upload-js";

export interface UploadWidgetResult {
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
  export function from(
    upload: UploadInterface,
    originalFile: UploadedFile,
    editedFile: UploadedFile | undefined
  ): UploadWidgetResult {
    const calculateFileUrl = (): string => {
      const imageUrl = upload.url(editedFile?.filePath ?? originalFile.filePath, { transformation: "image" });
      return `${imageUrl}?w=600&h=600&fit=max&q=70`;
    };

    return {
      editedFile,
      originalFile,
      fileUrl: calculateFileUrl(),
      filePath: editedFile?.filePath ?? originalFile.filePath
    };
  }
}
