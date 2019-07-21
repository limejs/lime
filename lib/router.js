/**
 * 继承koa-router
 */
const Router = require('koa-router')
const path = require('path')

class LimeRouter extends Router {
  constructor (app) {
    super()
    this._app = app
    this._config = app.config
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
    const splitHandlerPath = handlerPath.split('@')
    const controller = splitHandlerPath[0]
    const action = splitHandlerPath[1] || 'index'
    const handlerController = require(path.join(this._config.paths.controller, controller))
    if (Object.getPrototypeOf(handlerController) !== this._app.baseController) {
      // 建立继承关系
      Object.setPrototypeOf(handlerController, this._app.baseController)
    }
    if (typeof handlerController[action] !== 'function') {
      // throw new Error('controller中缺少路由定义的action')
      throw new Error('action必须是一个函数')
    }

    Router.prototype[method].call(this, pathname, (ctx) => {
      // v2.0 implement
      const realController = {
        ctx
      }
      Object.setPrototypeOf(realController, handlerController) // 为了让插件可以往 controller、model、service 挂载方法，因此这3个概念都加了基类
      const actionHandler = handlerController[action]
      return actionHandler.call(realController)
    })
  }
})

module.exports = LimeRouter
