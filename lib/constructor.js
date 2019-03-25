/*
 * Created on 2019-02-23 15:13
 * @file Lime 内核类
 * @author: sheldoncui
 * @date: 2019-02-24 00:07
 * Copyright (c) 2018 limefe
 */

const loggerUtil = require('./utils/logger')
// catch global error as early
process.on('uncaughtException', (err) => {
  console.log()
  loggerUtil.error('全局捕获的异常', err.code, err.message)
  loggerUtil.error(err)
  process.exit(0)
})
process.on('unhandledRejection', (err) => {
  console.log()
  loggerUtil.error('全局捕获的Promise异常', err.code, err.message)
  loggerUtil.error(err)
  process.exit(0)
})

const initOptions = require('./init-options')
const initConfig = require('./init-config')
const initPlugin = require('./init-plugin')
const initRouter = require('./init-router')
const initDelegate = require('./init-delegate')
const initErrorHandler = require('./init-error-handler')
const initMvc = require('./init-mvc')

module.exports = class Lime {
  constructor(options) {
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
    this._logger.ok('*constructor*', `恭喜! LIME is listening at http://${server.address().address}:${server.address().port}`)
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
    // init config
    this._config = initConfig.call(this)
    // 实例化Koa，并把 Koa app 的一些方法代理到 Lime 实例上 (插件注册需要用到 Koa 方法)
    initDelegate.call(this)
    initErrorHandler.call(this)
    // 初始化mvc基类
    initMvc.call(this)
    // 注册内置外置插件
    initPlugin.call(this)
    // 初始化路由 (要在其他插件之后注册)
    initRouter.call(this)
    // 路由的兜底 banner
    this.use(async ctx => {
      ctx.status = 404
      ctx.type = 'html'
      ctx.body = `<h1 style="text-align: center; color: #222">status: ${ctx.status}</h1> <p style="text-align: center;">welcome to use lime framework!</p>`
    })
  }
}
