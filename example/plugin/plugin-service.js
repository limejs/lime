// DEBUG=koa-views
module.exports = function (app, options) {
  app.service({
    async add (a, b) {
      return a + b
    }
  })
}
