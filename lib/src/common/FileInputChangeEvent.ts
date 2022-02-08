/**
 * The subset of the native `Event` fields required by Upload.js: these fields exist both in the native `Event` type and
 * also in React Events, allowing both to be used with Upload.js without the need for any mapping code at call site.
 */
export interface FileInputChangeEvent {
  target: HTMLInputElement;
}
