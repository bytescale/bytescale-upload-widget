import { UploadConfig, UploadInterface } from "upload-js";

export type UploadInstanceMaybe =
  | {
      type: "upload";
      value: UploadInterface;
    }
  | {
      type: "error";
      value: Error;
    };

export namespace UploadInstanceMaybe {
  export function isUploadInstance(object: UploadConfig | UploadInterface): object is UploadInterface {
    return typeof (object as Partial<UploadInterface>).uploadFile === "function";
  }
}
