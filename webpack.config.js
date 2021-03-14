const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    // 이 정도만 있어도, 자동 build + reload.
    // webpack-dev-server
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
  },
  plugins: [
    // generate `index.html`.
    new HtmlWebpackPlugin({
      title: "Robust RxJS Stream!",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};

module.exports = (env, argv) => {
  // config.mode = argv.mode;

  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    //...
  }

  return config;
};
