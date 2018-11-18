// controller 的原型proto. 这里会添加一些框架controller内置的能力

const Model = require('./model')
const modelDir = require('../lib/paths').modelDir
const util = require('../lib/util')
const path = require('path')

module.exports = {
    // 加载model
    model(modelRelPath) {
        let barePath = modelRelPath.replace(/[\.\/]*/, '')
        let modelPath = path.join(modelDir, '..', barePath)
        return new Model(require(modelPath), util.firstUpperCase(path.basename(modelPath)))
    }
}


