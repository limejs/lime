// 这里最好用一下proxy代理

const mongoose = require('mongoose')

const _isSchemeProp = (prop) => {
    return [String, Number, Object, Date, Array].includes(prop)
}

const Model = function (schemeDefine, modelName) {
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
    return mongoose.model(modelName, modelScheme)
}

module.exports = Model