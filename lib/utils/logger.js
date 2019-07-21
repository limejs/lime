/*
 * Created on 2019-02-23 16:43
 * @file 简单的日志工具
 * @author: sheldoncui
 * @date: 2019-02-23 21:05
 * Copyright (c) 2018 limefe
 */

const chalk = require('chalk')

const ok = (...msg) => {
  console.info(chalk.green(`[INFO ]`), ...msg)
}

module.exports = {
  ok (...msg) {
    ok(...msg)
  },
  success (...msg) {
    ok(...msg)
  },
  info (...msg) {
    console.info(chalk.cyan(`[INFO ]`), ...msg)
  },
  debug (...msg) {
    console.info(chalk.cyan(`[DEBUG]`), ...msg)
  },
  warn (...msg) {
    console.warn(chalk.yellow(`[WARN ]`), ...msg)
  },
  error (...msg) {
    console.error(chalk.red(`[ERROR]`), ...msg)
  }
}
