const debug = require('debug')('lime:read-plugin')
const fs = require('fs')
const path = require('path')

module.exports = function () {
  debug('start 读取所有插件')
  // 初始化各个组件的扩展方法
  const catedPlugins = {
    init: [],
    middleware: [],
    controller: [],
    model: [],
    service: []
  }
  // 按照插件定义读取所有插件，并暂存插件中对各个组件的扩展
  const config = this.config
  const app = this

  initPluginMethods(app, catedPlugins)

  if (!fs.existsSync(config.paths.plugins) || !fs.existsSync(path.join(config.paths.plugins, 'index.js'))) {
    // need not to load plugin
    return catedPlugins
  }

  const pluginEntry = require(config.paths.plugins)
  const plugins = pluginEntry(config)
  // 读取并暂存各个插件中对各个组件的扩展
  readPlugins(plugins, app)
  debug('end 读取所有插件', catedPlugins.init)
  return catedPlugins
}

/**
 *
 * @param {String} plugins 插件列表
 * @param {Object} 分类汇总后的插件
 */
const readPlugins = function (plugins, app) {
  const config = app.config
  plugins = plugins.map(plug => {
    if (typeof plug === 'string') {
      plug = {
        name: plug
      }
    }
    const plugModule = read(plug.name, config.paths.plugins)
    if (typeof plugModule !== 'function') {
      throw new Error('插件格式不合法, lime插件必须导出为一个函数')
    }
    // 执行插件注册函数
    plugModule(app, plug.options || {})
  })

  function read (name, basedir) {
    let plugModule = null
    if (
      fs.existsSync(path.join(basedir, name)) ||
      fs.existsSync(path.join(basedir, `${name}.js`))
    ) {
      plugModule = require(path.join(basedir, name))
    } else {
      plugModule = require(name)
    }
    return plugModule
  }
}

function initPluginMethods (app, store) {
  Object.keys(store).forEach(k => {
    app[k] = function (modfunc) {
      if (!modfunc) {
        return
      }
      store[k].push(modfunc)
    }
  })
}
