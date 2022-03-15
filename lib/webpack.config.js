/* eslint @typescript-eslint/no-var-requires: 0 */
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const src = path.resolve(__dirname, "src");

const cssLoaders = [
  "style-loader",
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
            {
              // postcss options
            }
          ]
        ]
      }
    }
  }
];

/**
 * Creates the dist that's published to NPM.
 */
module.exports = {
  output: {
    libraryTarget: "commonjs2"
  },
  cache: false,
  mode: "production",
  target: "browserslist",
  entry: "./src/index.ts",
  plugins: [],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      // Remember to keep in sync with `tsconfig.json`
      uploader: path.resolve(__dirname, "../lib/src")
    }
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader" // Options are in 'babel.config.js'
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.build.json"
            }
          }
        ],
        include: [src]
      },
      {
        test: /\.css$/,
        include: src,
        use: [...cssLoaders]
      },
      {
        test: /\.scss/,
        include: src,
        use: [...cssLoaders, "sass-loader"]
      },
      {
        test: /\.(ico|png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        include: src,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  }
};
