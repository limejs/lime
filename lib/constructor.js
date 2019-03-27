/*
 * Created on 2019-02-23 15:13
 * @file Lime 内核类
 * @author: sheldoncui
 * @date: 2019-02-24 00:07
 * Copyright (c) 2018 limefe
 */

const loggerUtil = require('./utils/logger')
const initOptions = require('./init-options')
const initConfig = require('./init-config')
const initPlugin = require('./init-plugin')
const initRouter = require('./init-router')
const initDelegate = require('./init-delegate')
const initErrorHandler = require('./init-error-handler')
const initMvc = require('./init-mvc')
const readPlugin = require('./utils/read-plugin')
const { EventEmitter } = require('events')
const doHook = require('./do-hooks')
const bindEvents = require('./bind-events')
const util = require('util')
const only = require('only')

module.exports = class Lime extends EventEmitter {
  constructor(options) {
    super()
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
    this._logger = loggerUtil
    this._options = initOptions.call(this, options)
    this._initCore()
  }

  /**
   * 【方法-公开】启动服务
   * @param  {...any} args port and host
   * @return {Server} server对象
   */
  async listen(...args) {
    if (!args.length) {
      args = [this.config.port, this.config.host]
    }
    // 注意这里要转为 promisify，否则 await 相当于 yield 一个普通listen函数不符合async正常使用方式
    const promisifyListen = new Promise((resolve, reject) => {
      const server = this._app.listen(...args)
      server.on('listening', (err) => {
        if (err) {
          this._logger.error(err)
        }
        resolve(server)
      })
    })
    const server = await promisifyListen
    this._logger.ok('[core:constructor]', `恭喜! LIME is listening at http://${server.address().address}:${server.address().port}`)
    return server
  }
  /**
   * 【方法-公开】返回一个 http 处理函数
   * @param  {...any} args 无
   */
  callback(...args) {
    this._app.callback(...args)
  }
  /**
   * 【属性】初始化选项
   */
  get options() {
    return this._options
  }
  /**
   * 【属性】站点配置信息
   */
  get config() {
    return this._config
  }
  /**
   * 【方法-私有】初始化选项参数
   * @param {Object} options 构造选项
   */
  _initOptions(options) {
    initOptions.call(this, options)
  }
  /**
   * 【方法-私有】初始化 Lime 核心
   */
  _initCore() {
    // config配置初始化
    this._config = initConfig.call(this)
    // 实例化Koa，并把 Koa app 的一些方法代理到 Lime 实例上 (插件注册需要用到 Koa 方法)
    initDelegate.call(this)
    // 绑定内核监听的事件（暂时还未用到，未来可以监听内核的钩子做内置的处理）
    // bindEvents.call(this)
    // 读取插件模块定义并暂存起来 (依赖config配置初始化)
    this._plugins = readPlugin.call(this)
    // 调用beforeCreate钩子（用户可以在这个钩子尽早的做一些事情，例如global上挂载函数，初始化一些公共模块）
    doHook.call(this, 'beforeCreate')
    // 初始化core的错误处理器（主要是处理app内部包裹的错误，并提供给开发者注入的自定义机制）
    initErrorHandler.call(this)
    // 初始化mvc基类（由于view的时候是作为controller的一个方法，因此这里不包括view；不过多了一个service和schedule）
    initMvc.call(this)
    // 实际注入用户插件中的middleware、controller、service、model模块
    initPlugin.call(this, ['init', 'middleware', 'controller', 'service', 'model'])
    // 初始化路由 (要在其他插件之后注册)
    initRouter.call(this)
    // 路由的兜底 banner
    this.use(async ctx => {
      ctx.status = 404
      ctx.type = 'html'
      ctx.body = `<h1 style="text-align: center; color: #222">status: ${ctx.status}</h1> <p style="text-align: center;">welcome to use lime framework!</p>`
    })
    doHook.call(this, 'created')
  }


  inspect() {
    return this.toJSON();
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   * 之所以改写inspect 一方面是减少输出，另一方面是解决console.log(app)报错的问题。原因在于: 由于Lime代理了Koa 的context变量，而Koa context在this!=其自身时，会hackconsole.log的inspect转而用ctx上下文输出，
   * 这会导致Lime打印app时爆出 cannot read property toJSON of undfined 错误
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'config',
      'options'
    ]);
  }

}
