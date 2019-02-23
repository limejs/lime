/*
 * Created on 2019-02-23 15:13
 * @file Lime 基类
 * @author: sheldoncui
 * @date: 2019-02-23 21:10
 * Copyright (c) 2018 limefe
 */

const path = require('path')
const Koa = require('koa')
const initGlobal = require('./init-global')
const initOptions = require('./init-options')
const initConfig = require('./init-config')
const initPlugin = require('./init-plugin')
const initRouter = require('./init-router')
const proxy = require('./init-delegate')

module.exports = class Lime {
  constructor(options) {
    this._initGlobal()
    this._initOptions(options)
    this._initCore()
  }
  /**
   * 【方法-公开】启动服务
   * @param  {...any} args port and host
   */
  async listen(...args) {
    let server = null
    if (!args.length) {
      args = [this.config.port, this.config.host]
    }
    server = await this._app.listen(...args)
    logger.info(`NODE_ENV:`, process.env.NODE_ENV)
    logger.ok(`Congratulations! LIME is listening at http://${server.address().address}:${server.address().port}`)
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
   * 【方法-私有】初始化全局函数
   */
  _initGlobal() {
    initGlobal(this)
  }
  /**
   * 【方法-私有】初始化选项参数
   * @param {Object} options 构造选项
   */
  _initOptions(options) {
    initOptions(this, options)
  }
  /**
   * 【方法-私有】初始化 Lime 核心
   */
  _initCore() {
    // 配置文件初始化 this.config
    this._config = initConfig(this.options)
    // Koa 初始化 this._app
    this._app = new Koa()
    // 把 Koa app 的一些方法代理到 Lime 实例上 (插件注册需要用到 Koa 方法)
    proxy(this, this._app)
    // 注册内置外置插件
    initPlugin(this)
    // 初始化路由 (要在其他插件之后注册)
    initRouter(this)
    // 路由的兜底 banner
    this._app.use(async ctx => {
      ctx.status = 404
      ctx.type = 'html'
      ctx.body = `<h1 style="text-align: center; color: #222">status: ${ctx.status}</h1> <p style="text-align: center;">welcom to use lime framework!</p>`
    })
  }
}
