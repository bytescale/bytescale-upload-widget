import { UploadWidgetColors, UploaderColorOptionsRequired } from "uploader/config/UploadWidgetColors";
import { UploadWidgetFontSize, UploadWidgetFontSizeRequired } from "uploader/config/UploadWidgetFontSize";

export interface UploadWidgetStyles {
  colors?: UploadWidgetColors;
  fontSizes?: UploadWidgetFontSize;
}

export interface UploadWidgetStylesRequired {
  colors: UploaderColorOptionsRequired;
  fontSizes: UploadWidgetFontSizeRequired;
}

export namespace UploadWidgetStylesRequired {
  export function from(options: UploadWidgetStyles | undefined): UploadWidgetStylesRequired {
    return {
      colors: UploaderColorOptionsRequired.from(options?.colors),
      fontSizes: UploadWidgetFontSizeRequired.from(options?.fontSizes)
    };
  }
}
