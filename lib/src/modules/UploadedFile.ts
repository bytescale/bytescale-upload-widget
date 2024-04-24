import { UploadResult } from "@bytescale/sdk";
import { FileLike } from "@bytescale/upload-widget/modules/FileLike";

export interface UploadedFile extends UploadResult {
  file: FileLike;
}
