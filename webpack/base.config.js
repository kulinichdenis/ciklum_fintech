const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, '../dist')
const APP_DIR = path.resolve(__dirname, '../src')

module.exports = {
  context: APP_DIR,
  entry: {
    app: './app.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      { test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/, 
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader:'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new ExtractTextPlugin({
      filename:'style.[contenthash].css',
      disable: false,
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [ APP_DIR, "node_modules"]
  }
}

