import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin'

const commonConfig = merge([
  {
    entry: ['./client/index.js'],
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Book-a-meal',
        template: 'client/index.html'
      })
    ]
  }
])

export default commonConfig
