const ApiController = {
  async test(ctx, next) {
    ctx.body = {
      name: 'lime',
      isCool: true
    }
  }
}

module.exports = ApiController
