const Koa = require('koa')
const initPaths = require('./lib/paths')
const initStore = require('./lib/old/store')
const initGlobal = require('./lib/init-global')
const views = require('koa-views')
const router = require('./lib/router')
const plugin = require('./lib/init-plugin')

// 站点根目录变量
let siteRootDir = process.cwd()

// 初始化站点目录和文件相关的path变量
let paths = initPaths(siteRootDir)

// 初始化 global 相关方法 （如loadModel）
initGlobal()

// 初始化接入层(mongodb)
initStore()

// 实例化 koa
const app = new Koa()

// 注册插件 针对Koa实例和原型对象context等的插件
plugin.registerInstall(app)
plugin.registerController()
plugin.registerView()

// 注册模板引擎
app.use(views(paths.viewDir, {
  extension: 'hbs', // handlebar 模板引擎
  map: {
    hbs: 'handlebars'
  }
}));

// 注册业务逻辑之前的功能中间件和用户自定义的中间件
plugin.registerMiddleware(app)

// 注册业务路由中间件
const routerDefine = require(paths.routerConf)
routerDefine(router)
app.use(router.routes())
app.use(async ctx => {
  ctx.body = 'welcom to use lime framework!'
})

// lime内核导出
module.exports = (dir) => {
  siteRootDir = dir // 设置站点根目录
  return app
}
