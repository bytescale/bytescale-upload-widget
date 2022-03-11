export interface UploaderEditorParams {
  images?: {
    crop?: boolean;
    cropRatio?: number;
    cropShape?: "rect" | "circ";
  };
}

export interface UploaderEditorParamsRequired {
  images: {
    crop: boolean;
    cropRatio: number | undefined;
    cropShape: "rect" | "circ";
  };
}

export namespace UploaderEditorParamsRequired {
  export function from(params: UploaderEditorParams | undefined): UploaderEditorParamsRequired {
    const cropShape = params?.images?.cropShape ?? "rect";
    return {
      images: {
        crop: params?.images?.crop ?? true,
        cropRatio: cropShape === "circ" ? 1 : params?.images?.cropRatio,
        cropShape
      }
    };
  }
}
