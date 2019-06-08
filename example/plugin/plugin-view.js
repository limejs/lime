// DEBUG=koa-views
const koaViews = require("koa-views");
const path = require("path");

module.exports = function(app, options) {
  app.middleware(koaViews(path.join(app.config.paths.src, "views"), {
    'extension': 'hbs',
    map: {
      'hbs': 'handlebars',
    }
  }))

  app.controller({
    render(...args) {
      return this.ctx.render(...args)
    }
  })
}
