// 这里最好用一下proxy代理

const mongoose = require('mongoose')

const _isSchemeProp = (prop) => {
    return [String, Number, Object, Date, Array].includes(prop)
}

let cache = {}

// mongoose 模型（对应一个mongodb表/collection）
const Model = function (schemeDefine, modelName) {
    if (cache[modelName]) return cache[modelName]
    let props = {}
    Object.keys(schemeDefine).forEach(k => {
        if (_isSchemeProp(schemeDefine[k])) {
            props[k] = schemeDefine[k]
        }
    })
    let methodsKeys = Object.keys(schemeDefine).filter(k => {
        return !_isSchemeProp(schemeDefine[k]) && (typeof schemeDefine[k] === 'function')
    })
    let modelScheme = mongoose.Schema(props)
    methodsKeys.forEach(m => {
        modelScheme.methods[m] = schemeDefine[m]
    })
    // 导出mongoose模型class
    let myModel = mongoose.model(modelName, modelScheme)
    cache[modelName] = myModel
    return myModel
}

module.exports = Model