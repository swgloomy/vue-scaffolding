const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.conf')
const webpack = require('webpack')
const portFinderSync = require('portfinder-sync')
const {WebpackOpenBrowser} = require('webpack-open-browser')

const port = portFinderSync.getPort(3000)

let config = merge(baseWebpackConfig, {
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]__[name]__[local]--[hash:base64:12]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackOpenBrowser({url: `http://localhost:${port}`}),
    new webpack.DefinePlugin({
      Gloomy_env: JSON.stringify('development')
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    hot: true,
    open: false,
    compress: true,
    client: {
      overlay: true,
      progress: true
    }
  }
})

module.exports = config
