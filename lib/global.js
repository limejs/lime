/**
 * @file Node 全局挂载辅助方法
 */

const modelDir = require('./paths').modelDir
const Model = require('../mvc/model')
const path = require('path')

module.exports = () => {
    // 加载模型
    global.loadModel = (modelRelPath) => {
        let barePath = modelRelPath.replace(/[\.\/]*/, '')
        let modelPath = path.join(modelDir, '..', barePath)
        return new Model(require(modelPath), path.basename(modelPath))
    }
}