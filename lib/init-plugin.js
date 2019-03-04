
const fs = require('fs')
const path = require('path')
const controller = require('./mvc/controller')
const debug = require('debug')('lime:plugin')
const view = require('./mvc/view')

// 分类存储 plugin
let officialPlugins = [] // 内置
let userPlugins = [] // 外置

module.exports = (app) => {
  // read plugin from userPluginDirectory
  const officialPluginDir = path.join(__dirname, './plugins')
  const userPluginDir = app.options.plugin
  officialPlugins = readPluginsFromDir(officialPluginDir)
  userPlugins = readPluginsFromDir(userPluginDir)
  // registor the plugin
  register(officialPlugins)
  register(userPlugins)

  function register(plugins) {
    plugins.forEach(plug => {
      const types = Object.keys(plug) || []
      types.forEach(type => {
        let args = []
        switch(type) {
          case 'install':
            args = [app, app.context]
            break
          case 'middleware':
            args = [app]
            break
          case 'controller':
            args = [controller]
            break
          case 'view':
            args = [view]
            break
        }
        const func = plug[type]
        if (func || (typeof func === 'function')) {
          logger.ok('插件:', plug.name, '注册成功!')
          func(...args)
        }
      })
    })
  }
}

/**
 * 
 * @param {String} path 插件目录路径
 * @param {Object} catedOfficialPlugins 插件存储对象
 */
const readPluginsFromDir = function(pluginPath) {
  try {
    const files = fs.readdirSync(pluginPath)
    const plugins = []
    files.forEach(file => {
      try {
        const plugin = require(path.join(pluginPath, file))
        // 定义只读不可枚举的插件名
        Object.defineProperty(plugin, 'name', {
          value: path.basename(file, '.js'),
          enumerable: false
        })
        plugins.push(plugin)
      } catch (err) {
        debug(`plugin解析出错: ${err.message}`)
        throw err
      }
    })
    return plugins
  }
  catch(err) {
    if (err.code === 'ENOENT') {
      logger.warn(`插件读取失败! 插件路径 ${pluginPath} 不存在, LIME 将忽略该目录的插件读取`)
    }
    return []
  }
}
