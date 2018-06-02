const merge = require('webpack-merge');
const commonConfig = require('./client/config/webpack.commons');
const devConfig = require('./client/config/webpack.dev');
const ProdConfig = require('./client/config/webpack.prod');

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, ProdConfig, { mode });
  }
  return merge(commonConfig, devConfig, { mode });
};
