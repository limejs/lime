/*
 * Created on 2019-02-23 15:56
 * @file init site config file
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')

module.exports = function() {
  const config = {
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
    plugins: resolveByRoot('plugins'),
    public: resolveByRoot('public'),
    src: resolveByRoot('src'),
    tests: resolveByRoot('tests')
  })

  try {
    const commonConf = require(path.join(config.paths.config, 'common.js'))
    const m = {
      'prod': 'prod',
      'production': 'prod',
      'dev': 'dev',
      'development': 'dev',
      'test': 'test',
      'testing': 'test'
    }
    const envFilename = m[commonConf.env] || 'production'
    const envConf = require(path.join(config.paths.config, `${envFilename}.js`))
    const result = Object.assign(commonConf, envConf, config)
    this._logger.ok(`[config] 站点配置加载完成!`)
    return result
  }
  catch(err) {
    this._logger.error('[config] 站点配置加载出错')
    throw err // config can not empty
  }
}


