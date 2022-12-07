export interface UploadWidgetEditor {
  images?: {
    crop?: boolean;
    cropRatio?: number;
    cropShape?: "rect" | "circ";
  };
}

export interface UploadWidgetEditorRequired {
  images: {
    crop: boolean;
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
        cropRatio: cropShape === "circ" ? 1 : options?.images?.cropRatio,
        cropShape
      }
    };
  }
}
