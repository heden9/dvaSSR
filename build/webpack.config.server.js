/**
 * 进行配置webpack server
 * --config 用于指定config文件
 */
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = webpackMerge(baseConfig, {
  target: 'node', // webpack配置项，针对打包完成的内容的执行环境
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js') // path.join是node的语法，用于标志当前项目的根目录
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/', // 用于打包到html时，直接加在静态资源的前面。线上可写cdn路径
    libraryTarget: 'commonjs2' // 打包出来的js使用的模块方案，amd, cmd, umd, commonJS 等等
  }
})

module.exports = config
