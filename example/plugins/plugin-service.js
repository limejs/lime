// DEBUG=koa-views
const koaViews = require("koa-views");
const path = require("path");

module.exports = function(options) {
  return {
    service(proto) {
      proto.invoke = function(name, data) {
        console.log('invoke', name, data)
        // 获取对应文件
        const servicePath = path.join(this.config.paths.src, 'services', name)
        const serviceFunc = require(servicePath)
        // 执行service函数
        return serviceFunc.call(this, name, data)
      }
    }
  }
}
