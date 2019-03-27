module.exports = function() {
  this.on('coreError', function(err) {
    this._logger.error(err.message)
    this._logger.error(err)
  })

  // this.on('beforeCreate', function() {
  //   console.log('触发内部beforeCreate 钩子')
  // })

  this.on('created', function() {
    console.log('触发内部created 钩子')
  })
  this._logger.ok('[core:events]', `核心事件绑定初始化完成!`)
}
