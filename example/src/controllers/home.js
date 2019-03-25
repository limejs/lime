const HomeController = {
  async index(ctx, next) {
    console.log(this.service.invoke('weather', {day: 123}))
    await this.view.render('home', {
      title: 'LIME.JS'
    })
  }
}

module.exports = HomeController
