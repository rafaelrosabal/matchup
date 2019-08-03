var webpack = require('webpack')
var path = require('path')
var DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = [{
  entry: './index.js',
  output: {
    library: 'MatchUp',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'build'),
    filename: 'browser.js'
  },
  node: {
    fs: 'empty',
    path: 'empty',
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: 'mock',
    __dirname: 'mock',
    setImmediate: false
  },
  externals: ['canvas'],

  plugins: [
    new DefinePlugin({
      BROWSER: true
    })
  ]
}, {
  entry: './index.js',
  output: {
    library: 'MatchUp',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'build'),
    filename: 'browser.min.js'
  },
  node: {
    fs: 'empty',
    path: 'empty',
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: 'mock',
    __dirname: 'mock',
    setImmediate: false
  },
  externals: ['canvas'],
  

  plugins: [
    new DefinePlugin({
      BROWSER: true
    })
    
  ]
}, {
  entry: './index.js',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    filename: 'node.js'
  },
  target: 'node',
  externals: ['canvas'],

}]
