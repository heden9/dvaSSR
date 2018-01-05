
const ReactDOMServer = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript') // 序列化JavaScript对象
const Helmet = require('react-helmet').default

module.exports = function (bundle, template, req, res) {
  return new Promise((resolve, reject) => {
    if (bundle) {
      const routerContext = {}
      const state = bundle.getState()
      const app = bundle.default(routerContext, req.url)
      const content = ReactDOMServer.renderToString(app)
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
      })
      res.send(html)
      resolve()
    } else {
      res.send('serverBundle is running.... please wait for refresh')
    }
  })
}
