// View的proto

module.exports = {
    render(...args) {
        return this.ctx.render.apply(this.ctx.render, args)
    }
}
