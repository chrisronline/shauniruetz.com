const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, baseConfig, {
  entry: {
    site: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'deploy', 'assets'),
    filename: '[name]_[hash].js'
  },
  plugins: [
    new ExtractTextPlugin('[name]_[hash].css'),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

module.exports = config
