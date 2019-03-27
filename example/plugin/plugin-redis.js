module.exports = function (app, options) {
  const redis = {}

  app.controller({
    redis: redis
  })

  app.service({
    redis: redis
  })
}
