const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js')

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin(
      { 'process.env': {
       'NODE_ENV': JSON.stringify('production') 
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    })
  ]
})
