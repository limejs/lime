const serve = require('koa-static')
const path = require('path')

module.exports = function(options) {
  return {
    middleware(app) {
      app.use(serve(path.join(this.config.paths.root, './public'), {
        maxage: 365 * 24 * 3600 * 1000
      }))
    }
  }
}
