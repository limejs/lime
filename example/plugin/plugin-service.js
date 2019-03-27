// DEBUG=koa-views
const koaViews = require("koa-views");
const path = require("path");

module.exports = function(app, options) {
  app.service({
    async add(a, b) {
      return a + b
    }
  })
}
