/**
 * 进行配置webpack client
 * --config 用于指定config文件
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDEV = process.env.NODE_ENV === 'development' // 判断当前环境处于开发/生产
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const NamedModulesPlugin = require('name-all-modules-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 包分析插件

const analyzer = false // 是否开启分析模式
const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js') // path.join是node的语法，用于标志当前项目的根目录
  },
  output: {
    filename: '[name].js', // 开发模式下不开启hash
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 用于打包到html时，直接加在静态资源的前面。线上可写cdn路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.tmp.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDEV) {
  config.entry = {
    app: [ // 配置hot-loader-replacement
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    compress: true, // 启动gzip压缩
    contentBase: path.join(__dirname, '../dist'),
    hot: true, // 开启 Hot module replacement
    overlay: {
      errors: true // 在webpack编译出错的时候，在页面上显示弹窗
    },
    open: true, // 自动打开浏览器
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath: '/public',
    stats: { colors: true }, // 彩色输出
    historyApiFallback: { // 让我们所有404的请求都返回这个
      index: '/public/index.html'
    }
  }
  config.devtool = '#source-map'
  config.plugins.push(new webpack.HotModuleReplacementPlugin()) // 配置hot-loader-replacement
} else {
  config.entry = {
    app: path.join(__dirname, '../client/app.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'dva',
      'axios'
    ]
  }
  config.output.filename = '[name].[chunkhash].js' // 有多个entry时，文件的hash是每个文件自己的hash，而不是总的打包的hash
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // 压缩js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }), // 自动提取重复代码  会存在一个问题，vendor每次打包的hash都会变因为webpack他自身的代码每次打包都不一样
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }), // 将webpack重复代码打包到一起
    new webpack.NamedModulesPlugin(), // webpack异步加载模块的顺序
    new NamedModulesPlugin(), // 同上
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedChunksPlugin(chunk => { // 给异步模块命名
      if (chunk.name) {
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    }),
    new webpack.optimize.ModuleConcatenationPlugin() // 开启tree-shaking，尽可能压缩代码
  )
  if (analyzer) {
    config.plugins.push(
      new BundleAnalyzerPlugin() // 包分析插件
    )
  }
}

module.exports = config
