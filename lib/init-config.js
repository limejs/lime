/*
 * Created on 2019-02-23 15:56
 * @file init site config file
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const debug = require('debug')('lime:debug')

module.exports = function() {
  debug('start 初始化config')
  const config = {
    port: process.env.PORT || '3000',
    host: process.env.HOST || '127.0.0.1',
    paths: {
      root: this.options.root || process.cwd()
    }
  }

  function resolveByRoot(rpath) {
    return path.join(config.paths.root, rpath)
  }

  config.paths = Object.assign(config.paths, {
    cmds: resolveByRoot('cmds'),
    config: resolveByRoot('config'),
    plugins: resolveByRoot('plugin'),
    public: resolveByRoot('public'),
    src: resolveByRoot('src'),
    controller: resolveByRoot('src/controller'),
    service: resolveByRoot('src/service'),
    view: resolveByRoot('src/view'),
    model: resolveByRoot('src/model'),
    tests: resolveByRoot('tests')
  })

  try {
    const commonConf = require(path.join(config.paths.config, 'common.js'))
    // NODE_ENV to filename map
    const m = {
      'prod': 'prod',
      'production': 'prod',
      'dev': 'dev',
      'development': 'dev',
      'test': 'test',
      'testing': 'test'
    }
    const computedEnv = process.env.NODE_ENV || 'production'
    const envFilename = m[computedEnv] || 'prod'
    const envConf = {}
    try {
      this._logger.info('[core:config]', '当前 NODE_ENV:', computedEnv)
      envConf = require(path.join(config.paths.config, `${envFilename}.js`))
    }
    catch(err) {
    }
    const result = Object.assign(config, commonConf, envConf)
    this._logger.ok('[core:config]', `站点配置 ${envFilename}.js 加载完成!`)
    debug('end 初始化config')
    return result
  }
  catch(err) {
    this._logger.error('[core:config]', '站点配置加载出错. 请检查站点根目录是否放置相应的 config 文件并正确导出配置对象', err.message, err.errno, err.code)
    throw err
  }
}


