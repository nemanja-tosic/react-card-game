const path = require('path');

const libraryName = 'game';
const outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/../src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve('./src')],
    extensions: ['.json', '.js']
  },
};

module.exports = config;
