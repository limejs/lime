const mongoose = require('mongoose')
const paths = require('./paths')
const storeConf = require(paths.storeConf)
const debug = require('debug')('lime:store')

module.exports = (app) => {
    if (!storeConf || !storeConf.dbhost || !storeConf.dbname) {
        debug('store.js 中 mongodb 配置不完整. 请检查')
        return
    }    
    const db = mongoose.connection; //mongoose.connection 对象内部维护了连接池
    db.on('error', debug.bind(debug, 'mongoose 创建连接失败'));
    db.once('open', function() {
        // we're connected!
        debug('mongoose 连接成功')
    });
    // app.context.db =  必要时可以把连接挂到app上
    // 开始连接
    mongoose.connect(`mongodb://${storeConf.dbhost}/${storeConf.dbname}`, { 
      useNewUrlParser: true,
      server: {
        poolSize: 100
      }
    });
}
