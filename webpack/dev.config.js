const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../src/dist'),
    port: 9000
  }
})
