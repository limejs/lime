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
  }
  catch(err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      app._logger.error(`路由注册失败! LIME 在 ${app.config.paths.src} 目录下没有找到可用的 router.js 路由文件`)
    }
    throw err
  }
}

