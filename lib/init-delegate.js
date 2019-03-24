/*
 * Created on 2019-02-23 19:05
 * @file 代理 Koa 实例 到 Lime 实例
 * @author: sheldoncui
 * @date: 2019-02-23 20:11
 * Copyright (c) 2018 limefe
 */


const Koa = require('koa')


module.exports = function() {
  const koaInstanse = this._app = new Koa()

  const methods = ['use']
  const props = ['context']

  methods.forEach(method => {
    if (!this[method]) {
      this[method] = koaInstanse[method].bind(koaInstanse)
    }
    else {
      logger.warn(`要代理的 Koa 方法 ${method} 在 LIME 上已经存在`)
    }
  })
  props.forEach(prop => {
    if (!this[prop]) {
      this[prop] = koaInstanse[prop]
    }
    else {
      logger.warn(`要代理的 Koa 属性 ${prop} 在 LIME 上已经存在`)
    }
  })
}
