/*
 * Created on 2019-02-23 15:56
 * @file init site config file
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')

module.exports = () => {
  const config = {
    root: this.options.root || process.cwd()
  }

  function resolveByRoot(rpath) {
    return path.join(config.root, rpath)
  }

  config.paths = {
    cmds: resolveByRoot('cmds'),
    config: resolveByRoot('config'),
    plugins: resolveByRoot('plugins'),
    public: resolveByRoot('public'),
    src: resolveByRoot('src'),
    tests: resolveByRoot('tests')
  }

  try {
    const commonConf = require(path.join(config.paths.config, 'common.js'))
    const m = {
      'prod': 'production',
      'production': 'production',
      'dev': 'development',
      'development': 'development',
      'test': 'test',
      'testing': 'test'
    }
    const env = m[commonConf.env] || 'production'
    const envConf = require(path.join(config.paths.config, `${env}.js`))
    const result = Object.assign(commonConf, envConf, config)
    this._logger.ok(`配置: 站点配置加载完成!`)
    return result
  }
  catch(err) {
    this._logger.error('站点配置加载出错')
    throw err // config can not empty
  }
}


