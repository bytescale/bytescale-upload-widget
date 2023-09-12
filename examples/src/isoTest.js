/**
 * This script tests to see if errors occur when including the Bytescale Upload Widget server-side.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { UploadWidget } = require("@bytescale/upload-widget");

const uploadWidget = new UploadWidget({ apiKey: "free" });

console.log(uploadWidget);
