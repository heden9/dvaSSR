
const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const mfs = new MemoryFs()

const serverRender = require('./dev-render.js')
// 声明一个serverBundle
let serverBundle

const serverConfig = require('../../build/webpack.config.server')
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
const NativeModule = require('module') // 获取原生的模块
const vm = require('vm')

const getModuleFromString = (bundle, filename) => { // 获取模块的新方法
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle) // 可使用原生模块将JavaScript代码包装
  // (function(exports, requires, module, __filename, __dirname){ ...bundle code })
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  }) // 使用vm来跑JavaScript代码
  const result = script.runInThisContext() // 指定执行环境
  result.call(m.exports, m.exports, require, m)
  return m
}

// const Module = module.constructor
// 使用module的构造方法来创建一个新的module
const compiler = webpack(serverConfig)
// 使用memory-fs在内存中读写文件，加快打包速度
compiler.outputFileSystem = mfs

compiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.error(err)
  })

  stats.warnings.forEach(warn => {
    console.warn(warn)
  })

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf8') // 读字符串时一定要指定编码
  // hack的做法
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js') // 使用时一定要指定名字
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})
module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      res.send('serverBundle is running.... please wait for refresh')
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
