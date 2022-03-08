export interface UploaderEditorParams {
  images?: {
    crop?: boolean;
  };
}

export interface UploaderEditorParamsRequired {
  images: {
    crop: boolean;
  };
}

export namespace UploaderEditorParamsRequired {
  export function from(params: UploaderEditorParams | undefined): UploaderEditorParamsRequired {
    return {
      images: {
        crop: params?.images?.crop ?? true
      }
    };
  }
}
