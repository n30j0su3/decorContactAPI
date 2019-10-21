const path = require('path');
var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './api.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node',
  optimization: {
    minimize: false
  },
  externals: [
    {
      formidable: 'commonjs formidable',
    },
    nodeExternals()
  ]
};