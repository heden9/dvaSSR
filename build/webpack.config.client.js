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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 包分析插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const analyzer = true // 是否开启分析模式
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
  config.mode = 'development'
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
    },
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3333/api',
        pathRewrite: {'^/api': ''}
      }
    }
  }
  config.devtool = '#source-map'
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 配置hot-loader-replacement
    new ProgressBarPlugin({ summary: false })

  )
} else {
  config.entry = {
    app: path.join(__dirname, '../client/app.js')
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: chunk => (
            chunk.resource &&
            /\.js$/.test(chunk.resource) &&
            /node_modules/.test(chunk.resource)
          ),
          chunks: 'initial',
          name: 'vendor'
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: true,
    minimize: true
  }
  config.output.filename = '[name].[chunkhash].js' // 有多个entry时，文件的hash是每个文件自己的hash，而不是总的打包的hash
  config.plugins.push(
    new webpack.HashedModuleIdsPlugin(),
    /** new webpack.NamedModulePlugin(),
     * 这两个plugin让webpack不再使用数字给我们的模块进行命名，这样每个模块都会有一个独有的名字，也就不会出现增删模块导致模块id变化引起最终的hash变化了
     */
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name
      }
      /**
       * fixed: DeprecationWarning: Chunk.mapModules: Use Array.from(chunk.modulesIterable, fn) instead
       */
      return Array.from(chunk.modulesIterable, m => path.relative(m.context, m.request)).join('_')
    })
    /**
     * NamedChunksPlugin 用来给每一个chunk起名字，在用import函数动态导入时，可以用注释来告诉webpack 这个chunk的名字
     */
  )
  if (analyzer) {
    config.plugins.push(
      new BundleAnalyzerPlugin() // 包分析插件
    )
  }
}

module.exports = config
