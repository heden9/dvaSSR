/**
 * 服务端入口
 */
const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const serverEntry = require('../dist/server-entry').default; // nodeJS中的require，不会默认拿到export default的内容

// readFileSync 同步执行读的操作，utf8指定编码格式，默认为nodeJS中的buffer。
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
const app = express();

// 指定静态资源目录
app.use('/public', express.static(path.join(__dirname, '../dist')))

// 从浏览器端发出的任何请求，都返回服务端渲染代码，但要排除静态资源
app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry);

  res.send(template.replace('<!-- app -->', appString));
});

app.listen(3333, function() {
  console.log('server is listening on 3333');
})
