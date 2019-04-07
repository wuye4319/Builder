/**
 * Author: CodeLai
 * Email: codelai@dotdotbuy.com
 * DateTime: 2016/8/15 18:12
 */
/**
 * Author: CodeLai
 * Email: codelai@dotdotbuy.com
 * DateTime: 2016/7/15 16:40
 */
var webpack = require("webpack");
const path = require('path')
module.exports = {
  entry  : {
    'util' : './static/plugin/dev/util'
  },
  output : {
    // path    : './static/plugin/base/',
    path    : path.resolve(__dirname, './static/plugin/base/'),
    filename: 'util.min.js'
  },
  module : {
    loaders: [
      {
        test   : /\.js?$/,
        loader : 'babel-loader',// short for babel-loader
        exclude: /node_modules/,
        query  : {
          presets: ["es2015","stage-0"]
        }

      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')// production | true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output  : {comments: false}
    }),
  ],
};