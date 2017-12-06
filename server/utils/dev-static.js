
const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');
const MemoryFs = require('memory-fs');
const ReactDOMServer = require('react-dom/server');
const mfs = new MemoryFs();

// 声明一个serverBundle
let serverBundle;


const serverConfig = require('../../build/webpack.config.server');
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data);
      })
      .catch(reject)
  })
}

const Module = module.constructor;
// 使用module的构造方法来创建一个新的module
const compiler = webpack(serverConfig);
//使用memory-fs在内存中读写文件
compiler.outputFileSystem = mfs;

compiler.watch({}, (err, stats) => {
  if(err) {
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(err => {
    console.error(err);
  });

  stats.warnings.forEach(warn => {
    console.warn(warn);
  });

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf8');

  const m = new Module();

  m._compile(bundle, 'server-entry.js'); // 使用时一定要指定名字

  serverBundle = m.exports.default;
})
module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888',
  }))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDOMServer.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->', content));
    })
  })
}
