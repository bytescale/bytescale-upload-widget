import { isReadOnlyImage } from "@bytescale/upload-widget/modules/MimeUtils";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";

// Do not allow SVGs, as these may include scripts, so a user may unwittingly upload an SVG that captures their own session information.
const nativelySupportedImages = ["image/jpeg", "image/gif", "image/png", "image/webp"];

export function calculateImagePreviewUrl(
  originalImage: UploadedFile
): { external: boolean; url: string; urlForDimensions: string | undefined } {
  if (isImageNativelySupported(originalImage)) {
    try {
      return { url: URL.createObjectURL(originalImage.file as any), external: false, urlForDimensions: undefined };
    } catch (e) {
      // This happens when 'onPreUpload' is used and a 'transformedFile' is returned; createObjectURL does not recognise
      // these, so we catch the error and fall-through to the Bytescale API-generated preview instead.
    }
  }

  // We use WebP to support transparency, e.g. in SVGs.
  // and use fit=max to enlarge SVGs (as they typically come out very small
  // if left in their native dimensions).
  const enlarge = requiresServeSideEnlargement(originalImage);
  const imageUrl = originalImage.fileUrl.replace("/raw/", "/image/");
  const maxDimension = 1000;
  return {
    url: `${imageUrl}?f=webp&f2=jpg${enlarge ? `&w=${maxDimension}&h=${maxDimension}&fit=max` : ""}`,
    external: true,
    urlForDimensions: enlarge ? `${imageUrl}?f=jpg` : undefined
  };
}

function isImageNativelySupported(originalImage: UploadedFile): boolean {
  return nativelySupportedImages.includes(originalImage.mime);
}

/**
 * SVGs can come out very small natively, but can obviously be enlarged without affecting quality, so we enlarge them
 * server-side for the previews.
 * @param originalImage
 */
function requiresServeSideEnlargement(originalImage: UploadedFile): boolean {
  return isReadOnlyImage(originalImage) || originalImage.mime === "image/svg+xml";
}
