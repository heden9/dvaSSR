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
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { importLoader: 1 }
          }]
        })
      },
      {
        test: /.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  }
}
