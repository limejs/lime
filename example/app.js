// process.chdir(__dirname) 可通过 Lime 构造器选项修改站点root目录
const Lime = require('../index.js')

const app = new Lime({
  root: __dirname
})

app.listen().then(server => {
  // you can logger the server info here
  // eg. logger.ok('*app*', 'server.address', server.address())
  logger.ok('lime listening...', server.address())
})
