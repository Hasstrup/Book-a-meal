import merge from 'webpack-merge';
import commonConfig from './client/config/webpack.commons';
import devConfig from './client/config/webpack.dev';
import ProdConfig from './client/config/webpack.prod';

export default (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, ProdConfig, { mode });
  }
  return merge(commonConfig, devConfig, { mode });
};
