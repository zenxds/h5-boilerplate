// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlOnePlugin = require('webpack-html-one')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const moment = require('moment')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js'
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'url-loader?limit=8192&name=image/[hash].[ext]'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            quality: 80
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          }
        },
        // This will apply the loader before the other ones
        enforce: 'pre'
      }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.prod.html',
      hash: true
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`),
    new HtmlOnePlugin({
      decodeEntities: false
    })
  ]
}
