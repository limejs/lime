const HomeController = {
  async index(ctx, next) {
    ctx.body = 'hello lime!'
  }
}

module.exports = HomeController
