import { FilePathDefinition } from "@bytescale/sdk";
import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";

export interface UploadWidgetEditor {
  images?: {
    allowResizeOnMove?: boolean;
    crop?: boolean;
    cropFilePath?: (originalFile: UploadedFile) => FilePathDefinition;
    cropRatio?: number;
    cropShape?: "rect" | "circ";
    preview?: boolean;
  };
}

export interface UploadWidgetEditorRequired {
  images: {
    allowResizeOnMove: boolean;
    crop: boolean;
    cropFilePath: (originalFile: UploadedFile) => FilePathDefinition;
    cropRatio: number | undefined;
    cropShape: "rect" | "circ";
    preview: boolean;
  };
}

export namespace UploadWidgetEditorRequired {
  export function from(options: UploadWidgetEditor | undefined): UploadWidgetEditorRequired {
    const cropShape = options?.images?.cropShape ?? "rect";
    const crop = options?.images?.crop ?? true;
    return {
      images: {
        allowResizeOnMove: options?.images?.allowResizeOnMove ?? true,
        crop,
        cropFilePath: options?.images?.cropFilePath ?? (originalImage => `${originalImage.filePath}.crop`),
        cropRatio: cropShape === "circ" ? 1 : options?.images?.cropRatio,
        cropShape,
        // Prevents introducing a new step for existing users where previously they didn't expect any interruption, but
        // shows previews for new file types (PDFs) to users who are already expecting interruption for image uploads.
        // "If at least one editor option is enabled, then previews are enabled by default".
        preview: options?.images?.preview ?? crop
      }
    };
  }
}
