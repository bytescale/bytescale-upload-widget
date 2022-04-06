import { UploaderColorOptions, UploaderColorOptionsRequired } from "uploader/UploaderColorOptions";
import { UploaderFontSizeOptions, UploaderFontSizeOptionsRequired } from "uploader/UploaderFontSizeOptions";

export interface UploaderStyleOptions {
  colors?: UploaderColorOptions;
  fontSizes?: UploaderFontSizeOptions;
}

export interface UploaderStyleOptionsRequired {
  colors: UploaderColorOptionsRequired;
  fontSizes: UploaderFontSizeOptionsRequired;
}

export namespace UploaderStyleOptionsRequired {
  export function from(options: UploaderStyleOptions | undefined): UploaderStyleOptionsRequired {
    return {
      colors: UploaderColorOptionsRequired.from(options?.colors),
      fontSizes: UploaderFontSizeOptionsRequired.from(options?.fontSizes)
    };
  }
}
