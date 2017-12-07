const path = require('path')

module.exports = {
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
      }
    ]
  }
};
