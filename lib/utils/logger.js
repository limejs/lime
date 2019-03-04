/*
 * Created on 2019-02-23 16:43
 * @file 简单的日志工具
 * @author: sheldoncui
 * @date: 2019-02-23 21:05
 * Copyright (c) 2018 limefe
 */

const chalk = require('chalk')

const ok = (...msg) => {
  console.log(chalk.green(`[ OK ]`), '[', ...msg, ']')
}
 
module.exports = {
  ok(...msg) {
    ok(...msg)
  },
  success(...msg) {
    ok(...msg)
  },
  info(...msg) {
    console.log(chalk.cyan(`[INFO]`), '[', ...msg, ']')
  },
  warn(...msg) {
    console.log(chalk.yellow(`[WARN]`), '[', ...msg, ']')
  },
  error(...msg) {
    console.log(chalk.red(`[ERROR]`), '[', ...msg, ']')
  }
}
