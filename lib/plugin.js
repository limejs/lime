const paths = require('./paths')
const fs = require('fs')
const path = require('path')
const logger = require('koa-logger')

const files = fs.readdirSync(paths.pluginDir)
const plugins = []
files.forEach(file => {
    const plugin = require(path.join(paths.pluginDir, file))
    plugins.push(plugin)
})

module.exports = {
    registerInstall(app) {
        plugins.forEach(p => {
            if (p.install && typeof p.install === 'function') {
                p.install(app, app.context)
            }
        })
    },
    registerMiddleware(app) {
        // 先注册内置的中间件
        app.use(logger())
        // 再注册外置的中间件
        plugins.forEach(p => {
            if (p.middleware && typeof p.middleware === 'function') {
                p.middleware(app)
            }
        })
    }
}