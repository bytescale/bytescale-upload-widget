import { highlightColor } from "uploader/modules/ColorUtils";

export interface UploadWidgetColors {
  active?: string;
  error?: string;
  primary?: string;
  shade100?: string;
  shade200?: string;
  shade300?: string;
  shade400?: string;
  shade500?: string;
  shade700?: string;
  shade900?: string;
  shadeMax?: string;
  shadeMin?: string;
}

export interface UploaderColorOptionsRequired {
  active: string;
  error: string;
  primary: string;
  shade100: string;
  shade200: string;
  shade300: string;
  shade400: string;
  shade500: string;
  shade700: string;
  shade900: string;
  shadeMax: string;
  shadeMin: string;
}

export namespace UploaderColorOptionsRequired {
  export function from(options: UploadWidgetColors | undefined): UploaderColorOptionsRequired {
    const primaryDefault = "#377dff";
    const activeDefault = "#528fff";
    let primary = options?.primary ?? primaryDefault;
    let active;
    try {
      active = highlightColor(primary, 0.1);
    } catch (e) {
      console.error(`Invalid hex code '${primary}', using default colours.`);
      primary = primaryDefault;
      active = activeDefault;
    }
    return {
      primary,
      active: options?.active ?? active,
      error: options?.error ?? "#d23f4d",
      shadeMin: options?.shadeMin ?? "#333",
      shade100: options?.shade100 ?? "#7a7a7a",
      shade200: options?.shade200 ?? "#999",
      shade300: options?.shade300 ?? "#a5a6a8",
      shade400: options?.shade400 ?? "#d3d3d3",
      shade500: options?.shade500 ?? "#dddddd",
      shade700: options?.shade700 ?? "#f0f0f0",
      shade900: options?.shade900 ?? "#f8f8f8",
      shadeMax: options?.shadeMax ?? "#fff"
    };
  }
}
