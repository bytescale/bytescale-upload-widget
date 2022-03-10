export interface UploaderEditorParams {
  images?: {
    crop?: boolean;
    cropRatio?: number;
  };
}

export interface UploaderEditorParamsRequired {
  images: {
    crop: boolean;
    cropRatio: number | undefined;
  };
}

export namespace UploaderEditorParamsRequired {
  export function from(params: UploaderEditorParams | undefined): UploaderEditorParamsRequired {
    return {
      images: {
        crop: params?.images?.crop ?? true,
        cropRatio: params?.images?.cropRatio
      }
    };
  }
}
