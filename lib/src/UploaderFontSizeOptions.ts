export interface UploaderFontSizeOptions {
  base?: number;
}

export interface UploaderFontSizeOptionsRequired {
  base: number;
}

export namespace UploaderFontSizeOptionsRequired {
  export function from(options: UploaderFontSizeOptions | undefined): UploaderFontSizeOptionsRequired {
    return {
      base: options?.base ?? 16
    };
  }
}
