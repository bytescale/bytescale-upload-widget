export interface UploadWidgetFontFamily {
  base?: string;
}

export interface UploadWidgetFontFamilyRequired {
  base: string;
}

export namespace UploadWidgetFontFamilyRequired {
  export function from(options: UploadWidgetFontFamily | undefined): UploadWidgetFontFamilyRequired {
    return {
      base:
        options?.base ??
        "-apple-system, blinkmacsystemfont, Segoe UI, helvetica, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
    };
  }
}
