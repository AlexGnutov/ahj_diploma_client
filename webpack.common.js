const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /service-worker\.js$/,
        type: "asset/resource",
        generator: {
          filename: '[name][ext]'
        },
      },
      {
        test: /notification.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.js$/,
        exclude: /node_modules|worker\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './src/favicon.ico',
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
