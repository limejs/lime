/**
 * 继承koa-router
 */
const Router = require('koa-router')
const path = require('path')

class LimeRouter extends Router {
  constructor(app) {
    super()
    this._app = app
    this._config = app.config
    this._paths = {
      controllerDir: path.join(app.config.paths.src, 'controllers')
    }
  }
}

'get|put|post|patch|delete|del'.split('|').forEach(method => {
  LimeRouter.prototype[method] = function (pathname, handlerPath) {
    if (typeof handlerPath === 'function') {
      // 这是直接提供了处理函数，不走controller
      return Router.prototype[method].call(this, pathname, (ctx, next) => {
        return handlerPath(ctx, next) // 交给用户的async函数来处理
      })
    }
    // 读取 controller 对象的 action 函数
    let splitHandlerPath = handlerPath.split('@')
    let controller = splitHandlerPath[0]
    let action = splitHandlerPath[1] || 'index'
    let handlerController = require(path.join(this._paths.controllerDir, controller))
    if (typeof handlerController[action] != 'function') {
      // throw new Error('controller中缺少路由定义的action')
      throw new Error('action必须是一个函数')
    }

    Router.prototype[method].call(this, pathname, (ctx, next) => {
      // v2.0 implement (此实现下，被调action不是真正的controller实例方法(因为根本没有实例化controller)，因此同一个controller下的不同action直接无法通过 this.xxx 的方式互相调用)
      const actionHandler = handlerController[action]
      const contextObj = {
        ctx,
        view: getInstanse(this._app.baseView),
        service: getInstanse(this._app.baseService),
        model: getInstanse(this._app.baseModel)
      }
      contextObj.__proto__ = this._app.baseController

      function getInstanse(baseObj) {
        const ins = {
          ctx
        }
        ins.__proto__ = baseObj
        return ins
      }
      return actionHandler.call(contextObj)
    })
  }
})

module.exports = LimeRouter
