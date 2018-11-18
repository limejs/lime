
### API

* controller

controller 基于 ES6 的 Proxy 代理了 Koa context 的所有属性和方法，因此建议在 action 中直接使用 this.xxx 来访问 context对象，从而在语义上更符合mvc架构的写法。当然每个 action实际上也接收了一个 ctx 参数，你依然可以选择自己喜欢的ctx.xx写法风格。

在编写 lime-controller-xxx插件时，插件会挂载到controller基类原型上，而不是挂载在context对象上；在编写lime-app插件时，插件会根据你的需求挂载到app或app.context上面。

在编写

this.model

this.render
