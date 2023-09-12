import { highlightColor } from "@bytescale/upload-widget/modules/ColorUtils";

export interface UploadWidgetColors {
  active?: string;
  error?: string;
  primary?: string;
  shade100?: string;
  shade200?: string;
  shade300?: string;
  shade400?: string;
  shade500?: string;
  shade600?: string;
  shade700?: string;
  shade800?: string;
  shade900?: string;
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
  shade600: string;
  shade700: string;
  shade800: string;
  shade900: string;
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
      shade100: options?.shade100 ?? "#333", // 100 DONE
      shade200: options?.shade200 ?? "#7a7a7a", // 200 DONE
      shade300: options?.shade300 ?? "#999", // 300 DONE
      shade400: options?.shade400 ?? "#a5a6a8", // 400 DONE
      shade500: options?.shade500 ?? "#d3d3d3", // 500 DONE
      shade600: options?.shade600 ?? "#dddddd", // 600 DONE
      shade700: options?.shade700 ?? "#f0f0f0", // 700 DONE
      shade800: options?.shade800 ?? "#f8f8f8", // 800 DONE
      shade900: options?.shade900 ?? "#fff" // 900 DONE
    };
  }
}
