module.exports = function() {
  this.use(async(ctx, next) => {
    await next()
  })
}
