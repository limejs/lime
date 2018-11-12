/* 
* @file 站点全局的一些比较有用的变量
*/

const path = require('path')

let root = process.cwd()
module.exports = (rootDir) => {
    root = rootDir
    return module.exports
}

Object.assign(module.exports, {
    get routerConf() {
        return path.join(root, './config/router');
    },
    get siteConf() {
        return path.join(root, './config/site')
    },
    get storeConf() {
        return path.join(root, './config/store')
    },
    get controllerDir() {
        return path.join(root, './src/controller')
    },
    get modelDir() {
        return path.join(root, './src/model')
    },
    get viewDir() {
        return path.join(root, './src/view')
    }
})