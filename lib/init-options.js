/*
 * Created on 2019-02-23 16:52
 * @file 初始化 LIME 构造函数options信息
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')

const _defaultOpt = {
  root: process.cwd() // site root dir: indicate the absolute path of the site files
}

module.exports = function(options) {
  return Object.assign({}, _defaultOpt, options)
}
