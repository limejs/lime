const kLogger = require('koa-logger')

module.exports = function(options) {
  return {
    install(app) {
      app.proxy = options.proxy
    },
    middleware(app) {
      app.use(async (ctx, next) => {
        const kloggerMid = kLogger((str, args) => {
          
          if (args.length > 3) {
            // method|hostname|ip|url|costtime|length|ip
            logger.info('响应日志', `${args[1]}|${ctx.hostname}|${ctx.ip}|${args[2]}|${args[3]}|${args[4]}|${args[5]}`)
          }
          else {
            // method|hostname|ip|url
            logger.info('请求日志', `${args[1]}|${ctx.hostname}|${ctx.ip}|${args[2]}`)
          }

        })
        await kloggerMid(ctx, next)
      })
    }
  }
}
