const HomeController = {
  async weather(ctx, next) {
    logger.info('城市', ctx.query.city)
    const weather = await this.service('weather')[ctx.query.city||'beijing']({city: '北京'})
    // // const weather = {a: 1}
    // console.log('what?')
    await this.render('home', {
      title: 'LIME.JS',
      weather: weather
    })
  },

  async user(ctx, next) {
    const userModel = await this.model('user')
    ctx.body = userModel
  }

}

module.exports = HomeController
