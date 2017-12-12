const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: process.env.NODE_ENV === 'development'
    })
  ],
  module: {
    rules: [
      { // 在编译之前执行这个loader，如果报错了就不继续
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader' // babel-loader 需要 babel-core 的支持
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [ // 排除node_modules目录，不然会有问题
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({ // 将css单独打包的插件
          fallback: 'iso-morphic-style-loader',
          use: [{
            loader: 'css-loader',
            options: { importLoader: 1 }
          }, 'postcss-loader']
        })
      },
      {
        test: /.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'less-loader',
            options: {
              modifyVars: {
                '@primary-color': 'rgb(100,194,92)',
                '@primary-grey': '#949494',
                '@hd': '2px'
              }
            }
          }],
          // use iso-morphic-style-loader in development
          fallback: 'iso-morphic-style-loader' // 解决window is not defined的问题
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.join(__dirname, '../client/assets/icon')
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 500, // 大小限制， 小于该大小的图片会被打包成base64
            outputPath: 'images/' // 文件输出的路径
          }
        }]
      }
    ]
  }
}
