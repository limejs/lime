const HomeController = {
  async index(ctx, next) {
    await this.render('home', {
      title: 'limejs'
    })
  }
}

module.exports = HomeController
