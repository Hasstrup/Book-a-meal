import merge from 'webpack-merge';
import { devServer } from './webpack.parts';

const devConfig = merge([
  devServer({
    host: 'localhost',
    port: 8080
  })
]);

export default devConfig;
