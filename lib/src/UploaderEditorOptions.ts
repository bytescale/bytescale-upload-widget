export interface UploaderEditorOptions {
  images?: {
    crop?: boolean;
    cropRatio?: number;
    cropShape?: "rect" | "circ";
  };
}

export interface UploaderEditorOptionsRequired {
  images: {
    crop: boolean;
    cropRatio: number | undefined;
    cropShape: "rect" | "circ";
  };
}

export namespace UploaderEditorOptionsRequired {
  export function from(options: UploaderEditorOptions | undefined): UploaderEditorOptionsRequired {
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
