/*
 * Created on 2019-02-23 15:56
 * @file init site config file
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const fs = require('fs')

module.exports = (options) => {
  // lime core should just concern the config/site.js, don't concern other config files
  const site = path.join(options.config, 'site.js')

  let config = {
    port: 3000,
    host: '127.0.0.1'
  }

  if (fs.existsSync(site)) {
    let siteconf = require(site)
    Object.assign(config, siteconf)
  }
  else {
    logger.warn('站点缺少 site.js 配置文件，将使用默认配置')
    logger.info('当前站点根目录: ', options.root)
  }

  // primary to use env variable host and port
  config.host = process.env.HOST || config.host
  config.port = process.env.PORT || config.port

  // delegate options' paths to config
  config.paths = {
    config: options.config,
    router: options.router,
    mvc: options.mvc
  }
  
  return config
}
