import { UploadWidgetConfig } from "@bytescale/upload-widget/config/UploadWidgetConfig";

export interface UploadWidgetMethods {
  close: () => void;
  reset: () => void;
  updateConfig: (updatedConfig: UploadWidgetConfig) => void;
}
