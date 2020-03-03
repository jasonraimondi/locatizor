// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin";
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack";
import { smart } from "webpack-merge";

import postCssConfig from "./postcss.config";

import { baseConfig, projectRoot } from "./webpack.base";

const Result: Configuration = smart(baseConfig, {
  target: "electron-renderer",
  entry: {
    renderer: "./src/renderer.tsx",
  },
  output: {
    filename: "[name].[contentHash].js",
    path: projectRoot + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader },
          // "style-loader",
          {loader: "css-loader", options: {importLoaders: 1}},
          {loader: "postcss-loader", options: {plugins: postCssConfig}},
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contentHash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /src\/renderer\/styles/,
        use: "svg-inline-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contentHash].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: projectRoot + "/index.html",
    }),
  ],
});

export default Result;
