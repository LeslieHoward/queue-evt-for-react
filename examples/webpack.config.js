const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

fs.access(path.resolve(__dirname, "dist"), fs.constants.F_OK, (error) => {
  if (error) {
    fs.mkdirSync("dist");
  }
});

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "src/parent.js"),
  },
  resolve: {
    extensions: [".js"],
  },
  devtool: "#cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: {
          loader: "babel-loader",
          options: {
            configFile: false,
            babelrc: false,
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-arrow-functions",
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: false,
      template: path.resolve(__dirname, "template.html"),
      filename: "index.html",
      inject: true,
    }),
  ],
  output: {
    filename: "bundle.js",
  },
};
