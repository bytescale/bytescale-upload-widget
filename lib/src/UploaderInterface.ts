import { UploadWidgetConfig } from "uploader/config/UploadWidgetConfig";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploadInterface } from "upload-js";

export interface UploaderInterface extends UploadInterface {
  open: (options?: UploadWidgetConfig) => Promise<UploadWidgetResult[]>;
}
