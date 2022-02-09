import { Upload } from "upload-js";

export type UploadInstanceMaybe =
  | {
      type: "upload";
      value: Upload;
    }
  | {
      type: "error";
      value: Error;
    };
