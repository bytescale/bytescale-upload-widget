import { FileLike } from "@bytescale/upload-widget/modules/FileLike";

export interface UploadWidgetOnPreUploadResult {
  errorMessage?: string;
  transformedFile?: FileLike;
}
