/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require("./webpack.config.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const plugins = [...config.plugins];

plugins.push(new BundleAnalyzerPlugin({ defaultSizes: "gzip" }));

module.exports = {
  ...config,
  plugins
};
