import { UploadedFile } from "upload-js";

export const isEditableImage = (originalImage: UploadedFile): boolean =>
  originalImage.mime.toLowerCase().startsWith("image/");

/**
 * Returns 'true' if the file can be rendered as an image (via our Image Processing API), but image editing options
 * should not be shown.
 *
 * IMPORTANT:
 * Must be mutually exclusive with 'isEditableImage' (there's several parts of the code that assume this).
 */
export const isReadOnlyImage = (originalImage: UploadedFile): boolean =>
  originalImage.mime.toLowerCase().startsWith("application/pdf");
