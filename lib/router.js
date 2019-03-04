/**
 * 继承koa-router
 */
const Router = require('koa-router')
const path = require('path')
const baseController = require('./mvc/controller')
const view = require('./mvc/view')
const debug = require('debug')('lime:router')
const send = require('koa-send')

class LimeRouter extends Router {
  constructor(app) {
    super()
    this._app = app
    this._paths = {
      controllerDir: path.join(app.config.paths.mvc, 'controller')
    }
  }
  static(rootpath) {
    // 路由时被调的静态资源send函数
    return async function (ctx, next) {
      let routerDir = ''
      debug('静态资源托管的路由执行了', 'rootpath', path.resolve(routerDir, rootpath))
      try {
        console.log('发送文件', path.join(path.resolve(routerDir, rootpath), ctx.path))
        let destFilename = ctx.params[0] || ctx.path
        return  send(ctx, destFilename, { root: path.resolve(routerDir, rootpath) })
      }
      catch (err) {
        debug(err)
        // ctx.throw(err)
      }
    }
  }
}

'get|put|post|patch|delete|del'.split('|').forEach(method => {
  LimeRouter.prototype[method] = function (pathname, handlerPath) {
    debug('handlerPath', handlerPath)
    if (typeof handlerPath === 'function') {
      // 这是直接提供了处理函数，不走controller
      return Router.prototype[method].call(this, pathname, (ctx, next) => {
        return handlerPath(ctx, next) // 交给用户的async函数来处理
      })
    } 
    let splitHandlerPath = handlerPath.split('@')
    debug('splitHandlerPath', splitHandlerPath)
    let controller = splitHandlerPath[0]
    let action = splitHandlerPath[1] || 'index'
    let handlerController = null
    try {
      debug('controller path: ', path.join(this._paths.controllerDir, controller))
      handlerController = require(path.join(this._paths.controllerDir, controller))
    } catch (err) {
      logger.warn(`路由: ${method} ${pathname} --- controller中缺少路由定义的controller(${controller}), 该路由将返回404`)
      return
    }
    if (typeof handlerController[action] != 'function') {
      // throw new Error('controller中缺少路由定义的action')
      logger.warn(`路由: ${method} ${pathname} --- controller中缺少路由定义的action(${action})，该路由将返回404`)
      return
    }
    // 给 controller 建立对Controller基类的继承关系
    if (handlerController.__proto__ != baseController) {
      handlerController.__proto__ = baseController
    }
    Router.prototype[method].call(this, pathname, (ctx, next) => {
      
      // 实例化controller并调用action：最精彩的部分来了（用proxy搞的有点复杂了）:
      // 0. 创建view的代理
      view.ctx = ctx
      // 1. 创建handlerController的代理，拦截所有controller中不存在的调用 转向Koa context (相当于这里的proxyController对象才是真正工作的controller)
      let proxyController = new Proxy(handlerController, {
        get: function (target, key) {
          if (target[key]) return target[key] // 代理controller所有action
          if (key === 'view') return view
          if (key === 'ctx') return ctx
          return ctx[key]
        },
        set(obj, name, value) {
          ctx[name] = value
        }
      })
      // 2. 调用controller对应的action函数进行业务处理
      return proxyController[action].call(proxyController, ctx, next)
    })
    logger.ok(`路由: ${method} ${pathname} 注册成功!`)
  }
})

module.exports = LimeRouter
