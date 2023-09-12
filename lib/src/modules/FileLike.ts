/**
 * Either a DOM file objects, or a BLOB.
 */
export interface FileLike {
  readonly name: string;
  readonly size: number;
  readonly type: string;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  slice: (start?: number, end?: number) => Blob;
}
