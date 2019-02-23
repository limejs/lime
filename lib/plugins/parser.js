/*
 * Created on 2019-02-23 18:55
 * @file pyload解析插件
 * @author: sheldoncui
 * @date: 2019-02-23 18:56
 * Copyright (c) 2018 limefe
 */

const bodyParser = require('koa-bodyparser')

module.exports = {
  middleware(app) {
    app.use(bodyParser()) // body 解析
  }
}
