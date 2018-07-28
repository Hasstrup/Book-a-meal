const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { loadJavascript, loadFonts } = require('./webpack.parts');

const NamedModule = new webpack.NamedModulesPlugin()
const HotModule = new webpack.HotModuleReplacementPlugin()

const commonConfig = merge([
  {
    entry: [
      'babel-polyfill',
      './client/index.js'
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Book-a-meal',
        template: 'client/index.html'
      }),
      NamedModule,
      HotModule
    ]
  },
  loadJavascript(),
  // lintJavascript(),
  loadFonts()
])

module.exports = commonConfig
