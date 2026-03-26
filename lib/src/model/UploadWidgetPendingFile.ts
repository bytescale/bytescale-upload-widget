import { FileLike } from "@bytescale/upload-widget";

/**
 * `Preprocessing` is emitted while the widget is preparing the file for upload, such as running `onPreUpload`.
 * `Uploading` is emitted while file bytes are being uploaded.
 * `AwaitingUserInput` is emitted after upload completes when the file still requires user action, such as image preview or cropping. After this completes, the file moves from the `pendingFiles` array to the `uploadedFiles` array.
 */
export type UploadWidgetPendingFileStatus = "Preprocessing" | "Uploading" | "AwaitingUserInput";

export interface UploadWidgetPendingFile {
  file: FileLike;
  progress: number; // Factor (0 to 1)
  status: UploadWidgetPendingFileStatus;
}
