const Koa = require('koa')
const koaViews = require('koa-views')
const path = require('path')

const app = new Koa()
app.use(koaViews(path.join(__dirname, 'views'), {
  extension: 'hbs',
  map: {
    hbs: 'handlebars'
  }
}))

app.use(async ctx => {
  await ctx.render('home', {
    title: 'KOA',
    weather: {
      a: 1
    }
  })
})

app.listen('3009')
