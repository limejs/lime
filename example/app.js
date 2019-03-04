// process.chdir(__dirname) 可通过 Lime 构造器选项修改站点root目录

const Lime = require('../index.js')

const app = new Lime({
  root: __dirname
})

async function start() {
  const server = await app.listen()
  logger.info('server.address', server.address())
}


start()
