const paths = require('./paths')
const fs = require('fs')
const path = require('path')
const logger = require('koa-logger')
const CSRF = require('koa-csrf')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const controller = require('../mvc/controller')
const debug = require('debug')('lime:plugin')
const view = require('../mvc/view')

const siteConf = require(paths.siteConf)

const files = fs.readdirSync(paths.pluginDir)
const plugins = []
const catedPlugins = {}
files.forEach(file => {
  try {
    const plugin = require(path.join(paths.pluginDir, file))
    plugins.push(plugin)
  } catch (err) {
    debug(`plugin解析出错: ${err.message}`)
  }
})
catedPlugins.middleware = plugins.filter(f => Boolean(f.middleware))
catedPlugins.controller = plugins.filter(f => Boolean(f.controller))
catedPlugins.view = plugins.filter(f => Boolean(f.view))
catedPlugins.install = plugins.filter(f => Boolean(f.install))

module.exports = {
  registerInstall(app) {
    // 注册官方插件
    // TODO

    // 注册用户自定义插件
    catedPlugins.install.forEach(p => {
      if (p.install && typeof p.install === 'function') {
        p.install(app, app.context)
      }
    })
  },
  registerMiddleware(app) {
    // 先注册内置的中间件
    app.use(logger()) // 日志
    app.keys = siteConf.cookieKeys // cookie key
    app.use(session({
      key: 'lime:sid'
    }, app)) // session
    app.use(bodyParser()) // body 解析
    app.use(new CSRF({
      invalidSessionSecretMessage: '老铁 要点脸行不? (非法的session secret)',
      invalidSessionSecretStatusCode: 403,
      invalidTokenMessage: '老铁 要点脸行不？(非法的CSRF token)',
      invalidTokenStatusCode: 403,
      excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
      disableQuery: false
    })) // csrf
    // 再注册用户自定义的中间件
    catedPlugins.middleware.forEach(p => {
      if (p.middleware && typeof p.middleware === 'function') {
        p.middleware(app)
      }
    })
  },
  // 注册 controller 插件
  registerController() {
    // 先注册内置的controller插件

    // 再注册自定义的controller插件
    catedPlugins.controller.forEach(plugin => {
      plugin.controller(controller)
    })
  },
  registerView() {
    catedPlugins.view.forEach(plugin => {
      plugin.view(view)
    })
  }
}
