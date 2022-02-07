/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require("./webpack.config.js");

/**
 * Creates the dist that's analysed for polyfills (to update POLYFILLS.md).
 */
module.exports = {
  ...config,
  output: {
    ...config.output,
    filename: `index-fat.js`
  },
  // Important: causes all dependencies to be bundled into one JS file.
  externals: [],
  resolve: {
    ...config.resolve,
    modules: [
      // Default value (resolve relative 'node_modules' from current dir, and up the ancestors).
      "node_modules"
    ]
  }
};
