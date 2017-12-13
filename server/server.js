/**
 * 服务端入口
 */
const express = require('express')
const serverRender = require('./utils/dev-render')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
// const favicon = require('serve-favicon')
const session = require('express-session')

const isDEV = process.env.NODE_ENV === 'development'
const app = express()

app.use(bodyParser.json()) // 把application/json格式的数据转换成req.body上的数据
app.use(bodyParser.urlencoded({ extended: false })) // form-data的方式转换到req.body上
// app.use(favicon(path.join(__dirname, '')))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid', // session放一个cookieId到浏览器端
  resave: false, // 每次请求是否重新申请cookieId
  saveUninitialized: false, // 类似resave
  secret: 'bengi' // 盐
}))
app.use('/api/user', require('./handle-login'))
app.use('/api', require('./proxy'))
if (!isDEV) {
  const serverEntry = require('../dist/server-entry') // nodeJS中的require，不会默认拿到export default的内容

  // readFileSync 同步执行读的操作，utf8指定编码格式，默认为nodeJS中的buffer。
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')

  // 指定静态资源目录
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  // 从浏览器端发出的任何请求，都返回服务端渲染代码，但要排除静态资源
  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.use(function (error, req, res, next) { // express会判断参数长度来看看是不是error handle
  console.log(error)
  res.status(500).send(error)
})
app.listen(3333, function () {
  console.log('server is listening on 3333')
})
