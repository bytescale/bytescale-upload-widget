import { UploadedFile } from "upload-js";

export const isEditableImage = (originalImage: UploadedFile): boolean =>
  originalImage.mime.toLowerCase().startsWith("image/");

/**
 * IMPORTANT:
 * Must be mutually exclusive with 'isEditableImage' (there's several parts of the code that assume this).
 */
export const isPreviewableFile = (originalImage: UploadedFile): boolean =>
  originalImage.mime.toLowerCase().startsWith("application/pdf");
