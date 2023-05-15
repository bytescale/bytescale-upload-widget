import { UploadWidgetColors, UploaderColorOptionsRequired } from "uploader/config/UploadWidgetColors";
import { UploadWidgetFontSize, UploadWidgetFontSizeRequired } from "uploader/config/UploadWidgetFontSize";
import { UploadWidgetFontFamily, UploadWidgetFontFamilyRequired } from "uploader/config/UploadWidgetFontFamily";

export interface UploadWidgetStyles {
  colors?: UploadWidgetColors;
  fontFamilies?: UploadWidgetFontFamily;
  fontSizes?: UploadWidgetFontSize;
}

export interface UploadWidgetStylesRequired {
  colors: UploaderColorOptionsRequired;
  fontFamilies: UploadWidgetFontFamilyRequired;
  fontSizes: UploadWidgetFontSizeRequired;
}

export namespace UploadWidgetStylesRequired {
  export function from(options: UploadWidgetStyles | undefined): UploadWidgetStylesRequired {
    return {
      colors: UploaderColorOptionsRequired.from(options?.colors),
      fontFamilies: UploadWidgetFontFamilyRequired.from(options?.fontFamilies),
      fontSizes: UploadWidgetFontSizeRequired.from(options?.fontSizes)
    };
  }
}
