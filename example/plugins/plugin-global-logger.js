module.exports = function (options) {
  return {
    global() {
      global.logger = makeLogger()
    }
  }
}

module.exports.logger = makeLogger()

function makeLogger() {
  const chalk = require('chalk')

  const ok = (...msg) => {
    console.info(chalk.green(`[INFO ]`), '[', ...msg, ']')
  }

  return {
    ok(...msg) {
      ok(...msg)
    },
    success(...msg) {
      ok(...msg)
    },
    info(...msg) {
      console.info(chalk.cyan(`[INFO ]`), '[', ...msg, ']')
    },
    debug(...msg) {
      console.debug(chalk.cyan(`[DEBUG]`), '[', ...msg, ']')
    },
    warn(...msg) {
      console.warn(chalk.yellow(`[WARN ]`), '[', ...msg, ']')
    },
    error(...msg) {
      console.error(chalk.red(`[ERROR]`), '[', ...msg, ']')
    }
  }
}
