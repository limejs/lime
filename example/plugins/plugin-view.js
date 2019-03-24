const koaViews = require('koa-views')
const path = require('path')

module.exports = function(options) {
  return {
    middleware(app, config) {
      app.use(koaViews(path.join(config.paths.src, 'views'), {
        extension: 'hbs',
        map: {
          'hbs': 'handlebars'
        }
      }))
    },
    controller(proto) {
      proto.render = async function(tpl, data) {
        return this.ctx.render(tpl, data)
      }
    }
  }
}
