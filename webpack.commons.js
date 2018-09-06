const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { loadJavascript, loadFonts } = require('./client/config/webpack.parts');

const NamedModule = new webpack.NamedModulesPlugin();
const HotModule = new webpack.HotModuleReplacementPlugin();

const commonConfig = merge([
  {
    entry: [
      'babel-polyfill',
      './client/index.js'
    ],
    output: {
    // just build directly to the node js app
      path: `${__dirname}/build/server/public`,
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
  loadFonts()
]);

module.exports = commonConfig;
