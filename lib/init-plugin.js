
const fs = require('fs')
const path = require('path')
const controller = require('./mvc/controller')
const view = require('./mvc/view')
const sortedModule = ['global', 'install', 'middleware', 'controller', 'view', 'model']
const debug = require('debug')('lime:plugin')


module.exports = function() {
  const app = this
  const config = app.config
  if (!fs.existsSync(config.paths.plugins) || !fs.existsSync(path.join(config.paths.plugins, 'index.js'))) {
    // need not to load plugin
    return
  }
  try {
    // read plugin from userPluginDirectory
    const pluginEntry = require(config.paths.plugins)
    const plugins = pluginEntry(config)
    // registor the plugin
    registerPlugins(plugins, app)
  }
  catch(err) {
    app._logger.error('*plugin*', '插件注册失败', err.message)
    throw err
  }
}

function registerPlugins(plugins, app) {
  const readedPlugins = readPlugins(plugins, app)
  sortedModule.forEach(mod => {
    debug('start plugin mod: ', mod)
    const args = getArgs(mod, app)

    readedPlugins.forEach(plug => {
      if (plug.module[mod] && ((typeof plug.module[mod]) === 'function')) {
        plug.module[mod](...args)
        plug.counts++
        if (plug.modCounts === plug.counts) {
          app._logger.ok('*plugin*', `插件 ${plug.name} 注册成功`)
        }
      }
    })
  })
}


/**
 * 
 * @param {String} plugins 插件列表
 */
const readPlugins = function(plugins, app) {
  const config = app.config
  const _logger = app._logger

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
    plug.module = plugModule(plug.options || {})
    plug.counts = 0
    plug.modCounts = Object.keys(plug.module).filter(item => {
      return sortedModule.indexOf(item) >= 0
    }).length
    return plug
  })

  function read(name, basedir) {
    let plugModule = null
    if (fs.existsSync(path.join(basedir, name)) || fs.existsSync(path.join(basedir, `${name}.js`))) {
      plugModule = require(path.join(basedir, name))
    }
    else {
      plugModule = require(name)
    }
    return plugModule
  }

  return plugins
}


function getArgs(type, app) {
  let args = []
  switch(type) {
    case 'global':
      args = [app.config]
    case 'install':
      args = [app, app.context, app.config]
      break
    case 'middleware':
      args = [app, app.config]
      break
    case 'controller':
      args = [controller, app.config]
      break
    case 'view':
      args = [view, app.config]
      break
  }
  return args
}
