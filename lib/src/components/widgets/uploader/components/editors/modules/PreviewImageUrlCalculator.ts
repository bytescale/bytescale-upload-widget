import { UploadedFile } from "upload-js";

// Do not allow SVGs, as these may include scripts, so a user may unwittingly upload an SVG that captures their own session information.
const nativelySupportedImages = ["image/jpeg", "image/gif", "image/png", "image/webp"];

export function calculateImagePreviewUrl(originalImage: UploadedFile): { external: boolean; url: string } {
  if (isImageNativelySupported(originalImage)) {
    return { url: URL.createObjectURL(originalImage.file as any), external: false };
  }

  // Don't modify dimensions (as it will interfere with the cropper's calculations), but use JPG to force faster processing.
  const imageUrl = originalImage.fileUrl.replace("/raw/", "/image/");
  return { url: `${imageUrl}?f=jpg`, external: true };
}

function isImageNativelySupported(originalImage: UploadedFile): boolean {
  return nativelySupportedImages.includes(originalImage.mime);
}
