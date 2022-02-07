/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require("./webpack.config.dev.js");

module.exports = {
  ...config,
  resolve: {
    extensions: config.resolve.extensions,

    // Reset resolution back to defaults. Required for 'dist' mode. We want everything to be loaded from 'node_modules',
    // like it would in the end-user's app, with the exception of the source files for this example project.
    // modules: ...webpack defaults...
    alias: {
      "@upload.io/uploader-examples": config.resolve.alias["@upload.io/uploader-examples"]
    }
  }
};
