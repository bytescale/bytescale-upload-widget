import { FilePathDefinition } from "@upload-io/upload-api-client-upload-js/dist/models/FilePathDefinition";
import { FileDetails } from "@upload-io/upload-api-client-upload-js/dist/models/FileDetails";

export interface UploadWidgetEditor {
  images?: {
    crop?: boolean;
    cropFilePath?: (originalFile: FileDetails) => FilePathDefinition;
    cropRatio?: number;
    cropShape?: "rect" | "circ";
  };
}

export interface UploadWidgetEditorRequired {
  images: {
    crop: boolean;
    cropFilePath: (originalFile: FileDetails) => FilePathDefinition;
    cropRatio: number | undefined;
    cropShape: "rect" | "circ";
  };
}

export namespace UploadWidgetEditorRequired {
  export function from(options: UploadWidgetEditor | undefined): UploadWidgetEditorRequired {
    const cropShape = options?.images?.cropShape ?? "rect";
    return {
      images: {
        crop: options?.images?.crop ?? true,
        cropFilePath: options?.images?.cropFilePath ?? (originalImage => `${originalImage.filePath}.crop`),
        cropRatio: cropShape === "circ" ? 1 : options?.images?.cropRatio,
        cropShape
      }
    };
  }
}
