/*
 * Created on 2019-02-23 18:11
 * @file 请求的全息日志中间件
 * @author: sheldoncui
 * @date: 2019-02-23 18:26
 * Copyright (c) 2018 limefe
 */

const logger = require('koa-logger')

module.exports = {
  middleware (app) {
    app.use(logger())
  }
}
