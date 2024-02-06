import { UploadWidgetColors, UploaderColorOptionsRequired } from "@bytescale/upload-widget/config/UploadWidgetColors";
import {
  UploadWidgetFontSize,
  UploadWidgetFontSizeRequired
} from "@bytescale/upload-widget/config/UploadWidgetFontSize";
import {
  UploadWidgetFontFamily,
  UploadWidgetFontFamilyRequired
} from "@bytescale/upload-widget/config/UploadWidgetFontFamily";
import {
  UploadWidgetBreakpoints,
  UploadWidgetBreakpointsRequired
} from "@bytescale/upload-widget/config/UploadWidgetBreakpoints";

export interface UploadWidgetStyles {
  breakpoints?: UploadWidgetBreakpoints;
  colors?: UploadWidgetColors;
  fontFamilies?: UploadWidgetFontFamily;
  fontSizes?: UploadWidgetFontSize;
}

export interface UploadWidgetStylesRequired {
  breakpoints: UploadWidgetBreakpointsRequired;
  colors: UploaderColorOptionsRequired;
  fontFamilies: UploadWidgetFontFamilyRequired;
  fontSizes: UploadWidgetFontSizeRequired;
}

export namespace UploadWidgetStylesRequired {
  export function from(options: UploadWidgetStyles | undefined): UploadWidgetStylesRequired {
    return {
      breakpoints: UploadWidgetBreakpointsRequired.from(options?.breakpoints),
      colors: UploaderColorOptionsRequired.from(options?.colors),
      fontFamilies: UploadWidgetFontFamilyRequired.from(options?.fontFamilies),
      fontSizes: UploadWidgetFontSizeRequired.from(options?.fontSizes)
    };
  }
}
