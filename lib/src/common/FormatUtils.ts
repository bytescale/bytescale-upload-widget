export function humanFileSize(bytes: number, dp = 1): string {
  let reference = bytes;
  const thresh = 1024;
  const sep = " ";
  const r = 10 ** dp;
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let magnitude = 0;

  if (Math.abs(reference) < thresh) {
    return `${reference}${sep}${units[magnitude]}`;
  }

  do {
    bytes /= thresh;
    reference /= thresh;
    ++magnitude;
  } while (Math.round(Math.abs(reference) * r) / r >= thresh && magnitude < units.length - 1);

  const number = bytes.toFixed(dp);

  return number + sep + units[magnitude];
}
