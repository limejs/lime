// controller 的原型proto. 这里会添加一些框架controller内置的能力

const path = require('path')

module.exports = function () {
  const app = this
  return {
    app: this,
    // 加载service模块
    service (name) {
      const service = require(path.join(app.config.paths.service, name))
      Object.setPrototypeOf(service, app.baseService)
      const ins = Object.create(service)
      ins.ctx = this.ctx
      ins.controller = this
      ins.app = app
      return ins
    },
    // 加载模型
    async model (name) {
      const modelDefined = require(path.join(app.config.paths.model, name))
      const model = app.loadModel(modelDefined) // 加载定义中的schema并挂载定义的method
      const ins = Object.create(model)
      // 一般model返回ORM给controller处理，而不需要实例上挂载ctx
      // ins.controller = this
      // ins.ctx = this.ctx
      // ins.app = app
      return ins
    }
  }
  // 加载model
  // model(modelRelPath) {
  //     let barePath = modelRelPath.replace(/[\.\/]*/, '')
  //     let modelPath = path.join(modelDir, '..', barePath)
  //     return new Model(require(modelPath), util.firstUpperCase(path.basename(modelPath)))
  // }
}
