/**
 * This script tests to see if errors occur when including Uploader server-side.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Uploader } = require("uploader");

const uploader = new Uploader({ apiKey: "free" });

console.log(uploader);
