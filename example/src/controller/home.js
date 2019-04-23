const HomeController = {
  async service() {
    logger.info('城市', this.ctx.query.city)
    const weather = await this.service('weather')[this.ctx.query.city||'beijing']({city: '北京'})
    ctx.body = weather
    
  },

  async index() {
    await this.render('home', {
      title: 'LIME.JS',
      weather: {
        a: 1
      }
    })
  }

}

module.exports = HomeController
