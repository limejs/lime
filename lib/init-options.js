/*
 * Created on 2019-02-23 16:52
 * @file 初始化 LIME 配置信息
 * @author: sheldoncui
 * @date: 2019-02-23 20:28
 * Copyright (c) 2018 limefe
 */

const path = require('path')

const _defaultOpt = {
  root: process.cwd() // site root dir: indicate the absolute path of the site files
}

module.exports = function(lime, options) {
  lime._options = Object.assign({}, _defaultOpt, options)
  let root = lime._options.root
  if (!lime._options.config) {
    lime._options.config = path.join(root, 'config')
  }
  if (!lime._options.plugin) {
    lime._options.plugin = path.join(root, 'plugin')
  }
  if (!lime._options.mvc) {
    lime._options.mvc = path.join(root, 'src')
  }
}
