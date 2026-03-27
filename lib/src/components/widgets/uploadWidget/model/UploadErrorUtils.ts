export function isNetworkError(error: Error): boolean {
  return error.message.includes("Failed to fetch");
}

export function normalizeUploadError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Unexpected error occurred.");
  }
  return error;
}

export function getUploadErrorMessage(error: Error): string {
  if (isNetworkError(error)) {
    return "Network error, please retry.";
  }

  return error.message;
}
