export interface UploadWidgetBreakpoints {
  fullScreenHeight?: number;
  fullScreenWidth?: number;
}

export interface UploadWidgetBreakpointsRequired {
  fullScreenHeight: number;
  fullScreenWidth: number;
}

export namespace UploadWidgetBreakpointsRequired {
  export function from(options: UploadWidgetBreakpoints | undefined): UploadWidgetBreakpointsRequired {
    return {
      fullScreenWidth: options?.fullScreenWidth ?? 750,
      fullScreenHeight: options?.fullScreenHeight ?? 420
    };
  }
}
