module.exports = function () {
  // catch global error as early
  const originalError = this.context.onerror
  this.context.onerror = function (err) {
    // throw new Error('堆栈测试')
    originalError.call(this, err)
  }
  this.use(async (ctx, next) => {
    await next()
  })
  this._logger.ok('[core:error]', `异常机制初始化完成!`)
}
