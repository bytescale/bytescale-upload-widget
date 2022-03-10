import { UploadedFile } from "upload-js";

export interface UploadingFile {
  cancel: () => void;
  file: File;
  fileIndex: number;
  progress: number; // Factor (0 to 1)
  type: "uploading";
}

export interface ErroneousFile {
  error: Error;
  file: File;
  fileIndex: number;
  type: "error";
}

export interface UploadedFileContainer {
  editedFile: UploadedFile | undefined;
  editingDone: boolean;
  fileIndex: number;
  type: "uploaded";
  uploadedFile: UploadedFile;
}

export type SubmittedFile = UploadingFile | UploadedFileContainer | ErroneousFile;

export function isUploadedFile(file: SubmittedFile): file is UploadedFileContainer {
  return file.type === "uploaded";
}

export interface SubmittedFileMap {
  [sparseFileIndex: number]: SubmittedFile | undefined;
}
