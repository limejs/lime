module.exports = function () {
  this.baseController = require('./mvc/controller').call(this)
  // this.baseModel = require('./mvc/model').call(this)
  // this.baseView = require('./mvc/view').call(this)
  this.baseService = require('./mvc/service').call(this)
  this._logger.ok('[core:mvc]', `MVC模块初始化完成!`)
}
