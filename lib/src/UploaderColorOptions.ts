import { highlightColor } from "uploader/modules/ColorUtils";

export interface UploaderColorOptions {
  active?: string;
  primary?: string;
}

export interface UploaderColorOptionsRequired {
  active: string;
  primary: string;
}

export namespace UploaderColorOptionsRequired {
  export function from(options: UploaderColorOptions | undefined): UploaderColorOptionsRequired {
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
      active: options?.active ?? active,
      primary
    };
  }
}
