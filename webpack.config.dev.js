var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
    sourceMapFilename: "[name].js.map"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'REINDEX_URL': JSON.stringify(process.env.REINDEX_URL),
      },
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
};
