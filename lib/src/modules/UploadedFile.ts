import { FileDetails } from "@bytescale/sdk";
import { FileLike } from "@bytescale/upload-widget/modules/FileLike";

export interface UploadedFile extends FileDetails {
  file: FileLike;
}
