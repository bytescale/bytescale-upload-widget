module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        exclude: ["transform-regenerator"]
      }
    ],
    "@babel/preset-react"
  ]
};
