// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlOnePlugin = require('webpack-html-one')
const dayjs = require('dayjs')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
    clean: {},
  },
  optimization: {
    // chunkIds: 'named',
    minimize: true,
    minimizer: [
      new webpack.BannerPlugin(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, 'postcss.config.js'),
              },
            },
          },
          'less-loader',
        ],
      },
    ]),
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash].css',
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.prod.html',
      inject: 'body',
      hash: true,
    }),
    new HtmlOnePlugin({
      decodeEntities: false,
    }),
  ],
}
