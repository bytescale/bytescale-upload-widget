import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";
import { FileLike } from "@bytescale/upload-widget";

export interface PreprocessingFile {
  file: FileLike;
  fileIndex: number;
  type: "Preprocessing";
}

export interface UploadingFile {
  cancel: () => void;
  file: FileLike;
  fileIndex: number;
  progress: number; // Factor (0 to 1)
  type: "Uploading";
}

export interface FailedFile {
  error: Error;
  file: FileLike;
  fileIndex: number;
  type: "Failed";
}

export interface UploadedFileContainer {
  editedFile: UploadedFile | undefined;
  file: FileLike;
  fileIndex: number;
  isReady: boolean; // False if the file still requires some action performing before it's considered fully uploaded, i.e. editing, or having 'accept' clicked in the preview screen.
  type: "Uploaded";
  uploadedFile: UploadedFile;
}

export type PendingFile = PreprocessingFile | UploadingFile;

export type SubmittedFile = PendingFile | UploadedFileContainer | FailedFile;

export function isUploadedFile(file: SubmittedFile): file is UploadedFileContainer {
  return file.type === "Uploaded";
}

export function isPendingFile(file: SubmittedFile): file is PendingFile {
  return file.type === "Preprocessing" || file.type === "Uploading";
}

export function isFailedFile(file: SubmittedFile): file is FailedFile {
  return file.type === "Failed";
}

export interface SubmittedFileMap {
  [sparseFileIndex: number]: SubmittedFile | undefined;
}
