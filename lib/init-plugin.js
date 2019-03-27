const fs = require('fs')
const path = require('path')
const sortedModule = ['global', 'install', 'middleware', 'controller', 'view', 'model', 'service']
const debug = require('debug')('core:plugin')

module.exports = function(types) {
  const app = this
  types.forEach(type => {
    const method = getMethods(type)
    this._plugins[type].forEach(mod => {
      method(mod, app)
    })
  })
  this._logger.ok('[core:plugin]', `插件初始化完成!`)
}

function getMethods(type) {
  const methods = {
    controller(mod, app) {
      // 放到 baseController 上
      for(let m in mod) {
        if (mod.hasOwnProperty(m) && !app.baseController[m]) {
          app.baseController[m] = mod[m]
        }
      }
    },
    service(mod, app) {
      for(let m in mod) {
        if (mod.hasOwnProperty(m) && !app.baseService[m]) {
          app.baseService[m] = mod[m]
        }
      }
    },
    model(mod, app) {
      if (app.loadModel && typeof app.loadModel === 'function') {
        app._logger.warn('model插件不允许多次调用，多次注册只能生效第一个')
      }
      app.loadModel = mod
    },
    middleware(mod, app) {
      app.use(mod)
    }
  }
  return methods[type]
}
