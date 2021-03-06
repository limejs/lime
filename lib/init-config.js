/*
 * Created on 2019-02-23 15:56
 * @file init site config file
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const debug = require('debug')('lime:debug')

module.exports = function () {
  debug('start 初始化config')
  const config = {
    port: process.env.PORT || '3000',
    host: process.env.HOST || '127.0.0.1',
    paths: {
      root: this.options.root || process.cwd()
    }
  }

  function resolveByRoot (rpath) {
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

  let commonConf = null
  try {
    commonConf = require(path.join(config.paths.config, 'common.js'))
  } catch (err) {
    commonConf = {}
    this._logger.warn('[core:config]', 'Lime正在使用默认配置；请检查站点根目录是否放置相应的 config 文件并正确导出配置对象', err.message, err.errno, err.code)
  }
  // NODE_ENV to filename map
  const m = {
    prod: 'prod',
    production: 'prod',
    dev: 'dev',
    development: 'dev',
    test: 'test',
    testing: 'test'
  }
  // 优先级，common.js 中的 env --> NODE_ENV --> production
  const computedEnv = commonConf['env'] || process.env.NODE_ENV || 'production'
  const envFilename = m[computedEnv] || 'prod'
  let envConf = {}
  try {
    this._logger.info('[core:config]', '当前 NODE_ENV:', computedEnv)
    envConf = require(path.join(config.paths.config, `${envFilename}.js`))
  } catch (err) {
  }
  const result = Object.assign(config, commonConf, envConf)
  result.env = {
    isDev: envFilename === 'dev',
    isTest: envFilename === 'test',
    isProd: envFilename === 'prod',
    name: {
      dev: 'development',
      test: 'test',
      prod: 'production'
    }[envFilename]
  }
  this._logger.ok('[core:config]', `站点配置 ${envFilename}.js 加载完成!`)
  debug('end 初始化config')
  return result
}
