/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require("./webpack.config.js");
const version = require("./package.json").version;
const majorVersion = parseInt(version.split(".")[0]);

if (isNaN(majorVersion)) {
  throw new Error("Unable to parse version number in package.json");
}

/**
 * Creates the dist that's published to 'https://js.bytescale.com/uploader/v*'.
 */
module.exports = {
  ...config,
  entry: "./src/index.cdn.ts",
  output: {
    ...config.output,
    filename: `v${majorVersion}.js`,
    libraryTarget: "umd"
  },
  optimization: {}, // Re-enable optimizations (i.e. minification) for CDN bundle. (See base config.)
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
