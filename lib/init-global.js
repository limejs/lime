/**
 * @file Node 全局挂载辅助方法
 */

// const modelDir = require('./paths').modelDir
const Model = require('./mvc/model')
const path = require('path')
const logger = require('./utils/logger')

module.exports = function() {
    // 加载模型
    // global.loadModel = (modelRelPath) => {
    //     let barePath = modelRelPath.replace(/[\.\/]*/, '')
    //     let modelPath = path.join(modelDir, '..', barePath)
    //     return new Model(require(modelPath), path.basename(modelPath))
    // }
    // logger
    // global.logger = logger
    // logger.ok(`全局: logger 函数注册成功!`)
}
