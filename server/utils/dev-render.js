
const ReactDOMServer = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper').default
const ejs = require('ejs')
const serialize = require('serialize-javascript') // 序列化JavaScript对象
const Helmet = require('react-helmet').default
const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default
const colors = require('material-ui/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const stores = bundle.createStoreMap()
    const createApp = bundle.default
    const routerContext = {}
    const sheetsRegistry = new SheetsRegistry()
    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url)
    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const css = sheetsRegistry.toString()
      const state = getStoreState(stores) // 获取state
      const content = ReactDOMServer.renderToString(app)
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: css
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
