/*
 * Created on 2019-02-23 19:05
 * @file 代理 Koa 实例 到 Lime 实例
 * @author: sheldoncui
 * @date: 2019-02-23 20:11
 * Copyright (c) 2018 limefe
 */


const methods = ['use']
const props = ['context']

module.exports = (lime, koa) => {
  methods.forEach(method => {
    if (!lime[method]) {
      lime[method] = koa[method].bind(koa)
    }
    else {
      logger.warn(`要代理的 Koa 方法 ${method} 在 LIME 上已经存在`)
    }
  })
  props.forEach(prop => {
    if (!lime[prop]) {
      lime[prop] = koa[prop]
    }
    else {
      logger.warn(`要代理的 Koa 属性 ${prop} 在 LIME 上已经存在`)
    }
  })
}
