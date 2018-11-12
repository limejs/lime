const Koa = require('koa')
const initPaths = require('./lib/paths')
const initStore = require('./lib/store')
const initGlobal = require('./lib/global')
const views = require('koa-views')
const router = require('./lib/router')

// 站点根目录变量
let siteRootDir = process.cwd()

// 初始化站点目录和文件相关的path变量
let paths = initPaths(siteRootDir)

// 初始化 global 方法 （如loadModel）
initGlobal()

// 初始化接入层(mongodb)
initStore()

// 实例化 koa
const app = new Koa()

// 注册模板引擎
app.use(views(paths.viewDir, {
    extension: 'hbs', // handlebar 模板引擎
    map: {
        hbs: 'handlebars'
    }
}));
// 注册路由中间件
const routerDefine = require(paths.routerConf)
routerDefine(router)
app.use(router.routes())
app.use(async ctx => {
    ctx.body = 'welcom to use lime framework!'
})
// lime内核导出 koa app 给调用站点
module.exports = (dir) => {
    siteRootDir = dir
    return app
}
