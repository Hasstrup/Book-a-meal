const merge = require('webpack-merge');
const { devServer, LoadCSS } = require('./webpack.parts');

const devConfig = merge([
  devServer({
    host: 'localhost',
    port: 8080,
    historyApiFallback: true
  }),
  LoadCSS()
]);
module.exports = devConfig;
