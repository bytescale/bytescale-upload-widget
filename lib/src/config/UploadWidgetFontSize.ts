export interface UploadWidgetFontSize {
  base?: number;
}

export interface UploadWidgetFontSizeRequired {
  base: number;
}

export namespace UploadWidgetFontSizeRequired {
  export function from(options: UploadWidgetFontSize | undefined): UploadWidgetFontSizeRequired {
    return {
      base: options?.base ?? 16
    };
  }
}
