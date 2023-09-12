import { UploadedFile } from "@bytescale/upload-widget/modules/UploadedFile";

export interface PreprocessingFile {
  file: File;
  fileIndex: number;
  type: "preprocessing";
}

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
  fileIndex: number;
  isSubmitted: boolean; // True if the image has been 'passed' by the user, i.e. successfully edited/left unedited, or has been accepted in the preview screen.
  type: "uploaded";
  uploadedFile: UploadedFile;
}

export type SubmittedFile = UploadingFile | PreprocessingFile | UploadedFileContainer | ErroneousFile;

export function isUploadedFile(file: SubmittedFile): file is UploadedFileContainer {
  return file.type === "uploaded";
}

export interface SubmittedFileMap {
  [sparseFileIndex: number]: SubmittedFile | undefined;
}
