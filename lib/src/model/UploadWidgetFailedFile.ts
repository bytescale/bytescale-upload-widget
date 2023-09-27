import { FileLike } from "@bytescale/upload-widget";

export interface UploadWidgetFailedFile {
  error: Error;
  file: FileLike;
}
