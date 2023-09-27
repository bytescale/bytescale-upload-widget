export class UploadWidgetValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadWidgetValidationError";
  }
}
