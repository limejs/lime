/*
 * Created on 2019-02-23 20:23
 * @file 初始化路由中间件
 * @author: sheldoncui
 * @date: 2019-02-23 20:55
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const LimeRouter = require('./router')

module.exports = (app) => {
  const routerFilename = path.join(app.config.paths.mvc, 'router.js')
  try {
    const registerRoutes = require(routerFilename)
    const router = new LimeRouter(app)
    registerRoutes(router)
    app.use(router.routes())
  }
  catch(err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      logger.error(`LIME 在 ${app.config.paths.mvc} 目录下没有找到可用的 router.js 路由文件，请检查`)
      return
    }
    logger.error(err)
  }
}

