/*
 * Created on 2019-02-23 18:54
 * @file 安全插件
 * @author: sheldoncui
 * @date: 2019-02-23 20:16
 * Copyright (c) 2018 limefe
 */

const cors = require('@koa/cors')
const CSRF = require('koa-csrf')
const session = require('koa-session')

module.exports = {
  middleware (app) {
    const config = app.config
    // cookie 加密串
    app.keys = config.cookie && config.cookie.keys
    // session 开启
    if (config.session && config.session.open) {
      app.use(session({
        key: 'lime:sid'
      }, app))
    }
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
}
