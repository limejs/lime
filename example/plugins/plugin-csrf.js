module.exports = function(app, options) {
  const config = app.config
  // cookie 加密串
  app.keys = config.cookie && config.cookie.keys
  app.middleware(session({
    key: 'lime:sid'
  }, app))

      // csrf 防注入
  app.use(new CSRF({
    invalidSessionSecretMessage: '老铁 要点脸行不? (非法的session secret)',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: '老铁 要点脸行不？(非法的CSRF token)',
    invalidTokenStatusCode: 403,
    excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
    disableQuery: false
  }))
  // cors 跨域
  app.use(cors())
}
