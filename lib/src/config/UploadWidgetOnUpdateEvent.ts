import { UploadWidgetResult } from "@bytescale/upload-widget";
import { UploadWidgetPendingFile } from "@bytescale/upload-widget/model/UploadWidgetPendingFile";
import { UploadWidgetFailedFile } from "@bytescale/upload-widget/model/UploadWidgetFailedFile";

export interface UploadWidgetOnUpdateEvent {
  failedFiles: UploadWidgetFailedFile[];
  pendingFiles: UploadWidgetPendingFile[];
  uploadedFiles: UploadWidgetResult[];
}
