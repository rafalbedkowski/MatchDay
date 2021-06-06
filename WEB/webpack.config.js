const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    move: "./src/scripts/move.js",
    html2: "./src/scripts/html2canvas.min.js",
  },
  output: {
    filename: "out-[name].js",
    path: path.resolve(__dirname, "../wwwroot"),
  },
  watch: false,
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|awif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              context: "public",
              name: "./media/[name]-[hash].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    require("autoprefixer"),
    require("cssnano"),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "MatchDay",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/media", to: "media" },
        { from: "src/favicon.png", to: "" },
      ],
    }),
  ],
  target: "web",

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    liveReload: true,
    compress: true,
    port: 3000,
  },
};
