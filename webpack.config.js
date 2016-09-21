const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const repoName = require('git-repo-name');

const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  style: path.join(__dirname, 'style'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({template: 'index.html'})]
};


let config;

switch (process.env.npm_lifecycle_event) {
  case 'start':
    config = merge(
      common,
      {devtool: 'eval-source-map'},
      parts.devServer(),
      parts.setupCSS(PATHS.style)
    );
    break;
  case 'build':
    config = merge(
      common,
      {devtool: 'source-map'},
      {
        output: {
          path: PATHS.build,
          publicPath: `/${repoName.sync()}/`,
          filename: 'bundle.js'
        }
      },
      parts.setupCSS(PATHS.style)
    );
    break;
  default:
    config = merge(common, {});
}

module.exports = validate(config);
