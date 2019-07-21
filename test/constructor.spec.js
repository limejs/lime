const expect = require('chai').expect
const Lime = require('../index.js')
const http = require('http')

describe('Lime constructor test', function () {
  const app = new Lime()
  it('initialize Lime app', function () {
    expect(app).to.be.an.instanceof(Lime)
  })
  it('app.listen(0) return a http.Server class', async () => {
    // use zero to find a random port. refer: https://f-e-d.club/topic/use-nodejs-start-a-random-port-available.article
    const server = await app.listen(0)
    expect(server).to.be.an.instanceOf(http.Server)
    server.close()
  })
})
