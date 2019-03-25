// DEBUG=koa-views
const koaViews = require("koa-views");
const path = require("path");

module.exports = function(options) {
  return {
    middleware(app) {
      app.use(koaViews(path.join(this.config.paths.src, "views"), {
        'extension': 'hbs',
        map: {
          'hbs': 'handlebars',
        }
      }))
    },
    view(proto) {
      // 视图插件
      proto.render = function(...args) {
        return this.ctx.render(...args)
      }
    }
  }
}
