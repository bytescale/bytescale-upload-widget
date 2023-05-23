import { UploadWidgetConfig } from "uploader/config/UploadWidgetConfig";

export interface UploadWidgetMethods {
  close: () => void;
  reset: () => void;
  updateConfig: (updatedConfig: UploadWidgetConfig) => void;
}
