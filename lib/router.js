/**
 * 继承koa-router
 */
const Router = require('koa-router')
const path = require('path')
const controllerDir = require('./paths').controllerDir
const baseController = require('../mvc/controller')
const debug = require('debug')('lime:router')

class MyRouter extends Router {}


'get|put|post|patch|delete|del'.split('|').forEach(method => {
    MyRouter.prototype[method] = function(pathname, handlerPath) {
        let splitHandlerPath = handlerPath.split('@')
        let controller = splitHandlerPath[0]
        let action = splitHandlerPath[1] || 'index'
        let handler = require(path.join(controllerDir, controller))
        if (typeof handler[action] != 'function') {
            // throw new Error('controller中缺少路由定义的action')
            debug(`${pathname}-controller中缺少路由定义的action`)
            return
        }
        // 给 controller 建立对Controller基类的继承关系
        if (handler.__proto__ != baseController.prototype) {
            handler.__proto__ = baseController.prototype
        }
        Router.prototype[method].call(this, pathname, handler[action].bind(handler))
    }
})

module.exports = new MyRouter()