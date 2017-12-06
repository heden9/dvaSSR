/**
 * 进行配置webpack client
 * --config 用于指定config文件
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDEV = process.env.NODE_ENV === 'development'; // 判断当前环境处于开发/生产

const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js') // path.join是node的语法，用于标志当前项目的根目录
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 用于打包到html时，直接加在静态资源的前面。线上可写cdn路径
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader' // babel-loader 需要 babel-core 的支持
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [ // 排除node_modules目录，不然编译会有问题
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
  ]
};

if (isDEV) {
  config.entry = {
    app: [ // 配置hot-loader-replacement
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js'),
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以使用本机ip，localhost，127.0.0.1 访问，最佳
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,  // 开启 Hot module replacement
    overlay: {
      errors: true,  // 在webpack编译出错的时候，在页面上显示弹窗
    },
    publicPath: '/public',
    historyApiFallback: { // 让我们所有404的请求都返回这个
      index: '/public/index.html',
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin()) // 配置hot-loader-replacement
}

module.exports = config;
