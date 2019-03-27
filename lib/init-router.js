/*
 * Created on 2019-02-23 20:23
 * @file 初始化路由中间件
 * @author: sheldoncui
 * @date: 2019-02-24 01:48
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const LimeRouter = require('./router')

module.exports = function() {
  const app = this
  const routerFilename = path.join(app.config.paths.src, 'router.js')
  try {
    const registerRoutes = require(routerFilename)
    const router = new LimeRouter(app)
    registerRoutes(router)
    app.use(router.routes())
    this._logger.ok('[core:router]', `路由注册完成!`)
  }
  catch(err) {
    app._logger.error('[core:router]', `路由注册失败! `, err.message)
    throw err
  }
}

