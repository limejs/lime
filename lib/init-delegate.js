/*
 * Created on 2019-02-23 19:05
 * @file 代理 Koa 实例 到 Lime 实例
 * @author: sheldoncui
 * @date: 2019-02-23 20:11
 * Copyright (c) 2018 limefe
 */


const Koa = require('koa')
const debug = require('debug')('lime:delegate')


module.exports = function() {
  debug('start 初始化Koa')
  const koaInstanse = this._app = new Koa()

  const methods = ['use']
  const props = ['context', 'proxy']

  methods.forEach(method => {
    if (!this[method]) {
      this[method] = koaInstanse[method].bind(koaInstanse)
    }
    else {
      logger.warn('[core:delegate]', `要代理的 Koa 方法 ${method} 在 LIME 上已经存在`)
    }
  })
  props.forEach(prop => {
    if (!this[prop]) {
      Object.defineProperty(this, prop, {
        get() {
          return this._app[prop]
        },
        set(val) {
          this._app[prop] = val
        }
      })
    }
    else {
      logger.warn('[core:delegate]', `要代理的 Koa 属性 ${prop} 在 LIME 上已经存在`)
    }
  })
  this._logger.ok('[core:delegate]', `delegate初始化完成!`)
  debug('end 初始化Koa')
}
