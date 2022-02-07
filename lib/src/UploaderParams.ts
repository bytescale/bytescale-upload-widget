import { FileTag } from "@upload-io/upload-api-client-upload-js";

export interface UploaderParams {
  tags?: Array<string | FileTag>;
}
