const chalk = require('chalk')

module.exports = function install (app, options) {
  app.on('beforeCreate', function () {
    global.logger = makeLogger()
    logger.info('触发外部beforeCreate钩子')
  })
}

function makeLogger () {
  const ok = (...msg) => {
    console.log(chalk.green(`[INFO ]`), '[site]', ...msg)
  }

  return {
    ok (...msg) {
      ok(...msg)
    },
    success (...msg) {
      ok(...msg)
    },
    info (...msg) {
      console.log(chalk.cyan(`[INFO ]`), '[site]', ...msg)
    },
    warn (...msg) {
      console.log(chalk.yellow(`[WARN ]`), '[site]', ...msg)
    },
    error (...msg) {
      console.log(chalk.red(`[ERROR]`), '[site]', ...msg)
    }
  }
}
