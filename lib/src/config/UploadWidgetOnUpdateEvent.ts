import { UploadWidgetResult } from "@bytescale/upload-widget";
import { UploadWidgetPendingFile } from "@bytescale/upload-widget/components/modal/UploadWidgetPendingFile";

export interface UploadWidgetOnUpdateEvent {
  pendingFiles: UploadWidgetPendingFile[];
  uploadedFiles: UploadWidgetResult[];
}
