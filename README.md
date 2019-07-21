[![npm version](https://img.shields.io/npm/v/@limejs/core.svg?style=flat-square)](https://www.npmjs.com/package/@limejs/core) [![downloads](https://img.shields.io/npm/dw/@limejs/core.svg?style=flat-square)](https://www.npmjs.com/package/@limejs/core) [![Build Status](https://img.shields.io/travis/limejs/lime.svg?style=flat-square)](https://travis-ci.com/limejs/lime) [![License](https://img.shields.io/npm/l/@limejs/core.svg?style=flat-square)](./License)



# LIME

lime.js 是一个轻量的基于 Koa2 的 Node.js Web开发框架，它基于经典的 MVC 范式，致力于提供简单易用的 Web 应用开发体验。

## Feature

* 内核简单、优雅， 易上手

  lime.js 可以无缝衔接 Koa 和 npm 的现有生态；在灵活与标准之间，lime 以 `中庸` 的态度做出权衡，并不断面向用户体验和未来而演进

* 经典 MVC 范式，约定大于配置

  采用最经典的分层架构、约定大于配置的设计理念

* 可扩展性强， 功能完备

  尽管保持了小而精致的内核，但通过插件机制和社区生态打造的脚手架， lime 完全可以胜任复杂项目的开发

* 面向未来的架构和工具链

  对于服务器端而言，升级运行环境的成本要比客户端小的多。也正因如此，lime.js 会毫不客气的废弃对老版本 Node.js 的支持。lime 会用面向未来的态度随时进化


## Guide

只要你熟悉 Node.js 基本语法并了解 [Koa](https://koa.bootcss.com/) 框架中的基本概念(如中间件)，即可 3 秒钟快速上手 lime.js 框架

下面，我们通过简单的 3 个步骤，开启 LIME.JS 的 Web 开发之旅

1. 创建项目并安装 lime.js

```bash
  # 创建一个项目目录 lime-demo
  mkdir lime-demo
  cd lime-demo
  # 初始化 package.json
  npm init -y
  # 安装 lime.js 核心作为项目依赖
  npm install @limejs/core --save
```

2. 创建 LIME 框架运行所需的项目结构

```bash
  # 创建一系列目录和文件
  mkdir -p config plugin mvc/controller mvc/view mvc/model
  touch mvc/router.js mvc/controller/home.js
  touch app.js

  # 此时 目录结构如下所示
  |-config # 站点配置，本示例不涉及
  |-plugins # 站点插件，本示例不涉及
  |-src
    |-controller
      |-home.js # 一个叫做 Home首页 的 控制器
    |-view
      |-home.hbs
    |-model
    |-router.js # 站点路由
  |-app.js # 站点应用入口
  |-package.json
```

3. 分别对 app.js、router.js、home.js 编写代码。内容如下:

```js
  // router.js 中定义路由
  module.exports = (router) => {
    router.get('/', 'home@index')
  }

  // home.js 中定义index首页请求的逻辑
  module.exports = {
    async index() {
      this.ctx.body = 'hello lime' // 通过 this.ctx 可以访问到 Koa 上下文对象
    }
  }

  // app.js 中引入 lime 框架内核并启动
  const Lime = require('@limejs/core')
  const app = new Lime()
  app.listen()
```

控制器代码中的 `index` 函数叫做控制器的 `action`，它本质上是一个完全意义上的 Koa 中间件函数，该函数所传入的 ctx 和 next 参数分别表示 Koa 的 ctx 上下文对象以及下一个中间件函数。

如果一切顺利，此时打开浏览器访问 <http://localhost:3000> 便可以看到

```bash
hello lime! # 看到它 说明已经运行成功
```

## Boileplate

尽管创建一个基于 LIME 框架的项目如此简单，但事实上要开发一个生产环境的站点还需要大量其他的能力，例如使用模板引擎进行视图渲染、使用mongoose进行数据存取、打印日志等等；而LIME内核通过灵活的插件机制让你可以通过插拔插件的方式，应对复杂的Web应用开发。只要你引入对应的LIME插件，LIME就可以变得无所不能。

我们知道选择插件组装应用是一件纠结的事情，所以事实上你无须自己手工创建项目样板。LIME 官方提供了一坨开箱即用的项目样板供您享用。无论是开发 Rest API 项目，还是基于 Vue.js 的前后端分离项目，还是传统的MVC模式的站点，LIME 都有一套完备且易用的样板。目前有以下这些样板项目:

* [MVC](https://github.com/limejs/lime-template-mvc) 这是传统的 MVC 开发模式的项目样板，包含完整的MVC模块，服务端通过模板引擎来渲染视图。`[立刻启动一个传统MVC模式的开发](https://github.com/limejs/lime-template-standard)`
* [SPA](https://github.com/limejs/lime-template-spa) 基于 Lime+Vue 的前后端分离的项目样板，兼顾单页应用运行和API开发。通过 lime 框架作为中间层来托管 Vue 资源文件，并在 limejs 中通过 webpack-dev-middleware 等插件完成Vue的热加载和热替换。`[立刻启动一个用 Node.js 作为中间层的SPA项目](https://github.com/limejs/lime-template-spa)`
* [SSR](https://github.com/limejs/lime-template-ssr) Lime+VueSSR 服务端同构渲染的项目样板，适合面向消费者、对首屏加载性能和SEO有一定要求的站点；同样实现了热加载热替换、异常处理、cookie处理、api开发等。`[立刻启动一个用 Node.js 作为中间层的同构VueSSR项目](https://github.com/limejs/lime-template-spa)`
* [API](https://github.com/limejs/lime-template-ssr) API 项目样板，去除了 model层、view层，增加了services层，适合开发REST API项目。 

通过 [lime-cli](https://github.com/limejs/lime-cli) 初始化时进行交互选择，您可以轻松创建一个 Web 应用样板来开发复杂应用；当然你也无需担心 cli 工具蒙蔽了你的双眼，事实上它仅仅是帮你引入了合适的 LIME 插件而已，内部发生的一切都很容易理解。了解更多的话你需要去参考对应项目样板的 README，当然继续读完本文档对你上手开发总是有益的。

## Convention

LIME 是 `约定大于配置` 的，所以 LIME 内部有一些惯例(约定)，我们在这里做简要说明。

* 站点目录结构必须符合规范

```js
|-- config
  |-- site.js 站点配置文件
|-plugins
  |- ua.js 一个插件
|-- src
  |-- router.js 路由
  |-- controllers 控制器
  |-- models 模型
  |-- views 视图
|-- app.js 站点启动入口
|-- package.json
```

你无法通过配置文件来修改 LIME 所要求的目录结构。如确有必要的话，可通过 Lime 构造函数的参数来配置(但不建议这么做)，如:

```js
const app = new Lime({
  root: __dirname,
  config: path.join(__dirname, './myconfig') // 修改默认配置文件的目录
})
```

* 控制器的物理文件名就是 controller 的名字

假如我们要创建一个 `新闻` 的控制器 `news`，并在控制器中提供一个获取 `新闻列表` 的 `list` 函数。那么，我们应该创建一个 `mvc/controller/news.js` 的文件，并在 `news.js` 中这样编写一个控制器对象:

```js
const NewsController = {
  // 返回新闻列表
  async list(ctx, next) {
    ctx.body = []
  }
  // 返回一个新闻详情
  async detail(ctx, next) {
    let id = ctx.query.id
    // ...
    ctx.body = {}
  }
}

module.exports = NewsController
```

这样，`news` 就是控制器的名字，`list` 就是 action 的名字。在路由中，可以通过 `news@list` 映射到这个新闻列表函数。

* 路由

路由的约定是: `路由行为用@符号来分割 controller 和 action `

举个栗子: 我们希望客户端发送的 `http://domain.com/news` 请求可以返回上面的 `新闻列表`，也就是说要把 `/news` 路径的 `get` 请求交给 `news controller` 的 `list action` 来处理。那么我们应该这样编写路由:

```js
module.exports = (router) => {
  router.get('/', 'news@list')
}
```

这里 `router` 对象的所有 API 都可以参考 `koa-router` 来使用。


## Router

Lime 的默认使用 src/router.js 进行路由规则配置，Lime 的路由在底层基于 `koa-router` 实现。支持如下实例方法:

```js
router.get|put|post|patch|delete|del ⇒ Router
router.routes ⇒ function
router.use([path], middleware) ⇒ Router
router.prefix(prefix) ⇒ Router
router.allowedMethods([options]) ⇒ function
router.redirect(source, destination, [code]) ⇒ Router
router.route(name) ⇒ Layer | false
router.url(name, params, [options]) ⇒ String | Error
router.param(param, middleware) ⇒ Router
```

## Config

config目录中存放 LIME 的框架基础配置，其中有四个配置文件，分别影响不同环境的配置:

```js
common.js 公共配置，即各个环境都会使用的配置
dev.js 开发环境配置
test.js 测试环境配置
prod.js 生产环境配置
```

配置的覆盖规则是这样的: common配置是最底层的配置，如果特定环境里面指定了相同的配置项导致冲突，则优先使用 环境配置文件 里所指定的配置。

LIME中的最终配置不仅会指导 LIME内核的行为，同时你也可以在业务开发过程中通过 ctx.config 获取到这个配置对象，从而可以基于配置进行相关业务逻辑的开发。

可配置的参数字段有:

```js
module.exports = {
  env: process.env.NODE_ENV, // env变量用于指导内核如何输出调试信息。支持 development、test、production三种字符串。建议您在业务开发过程中也使用 ctx.config.env 获取该变量，这样便与内核保持相同的环境判断方法。
  port: process.env.PORT || 3000, // 监听端口。你可以根据自己实际业务逻辑进行修改
  host: process.env.HOST || '127.0.0.1', // 监听地址
  publicPath: '/', // 站点的域名访问目录，默认是`/`表示站点运行在根path下。如果你要将本项目运行在 `www.baidu.com/bbs` 这样的目录下，你需要将此处配置为 `/bbs`
  plugins: [
    'logger', // 插件名称标识符
    'plugin-lime-cors',
    // 也可以用一个对象来表示一个插件
    {
      name: 'session',
      options: {
        key: 'abc'
      }
    }
  ]
}
```

插件配置在下文 Plugin 一节详细解释

## Plugin

LIME 通过插件的机制来扩展框架的能力。通过编写插件，可以实现:

* 挂载 global 对象上的辅助函数。例如全局的looger函数: `global.logger()`
* 在请求生命周期中注入Koa原生的中间件
* 扩展 MVC 模块中的方法，例如在controller中注入一个 `this.http` 的方法用来发起http请求

为了更你能编写出更优雅的插件，有必要在这里解释下 Lime 初始化时注册插件的过程: 

* Lime 首先会按顺序收集站点 config 配置中指定的 plugins 字段中所有插件
* 接下来，Lime 会按照插件顺序依次执行各个插件的 global函数，再依次执行所有插件的 install 函数，再依次执行各个插件的 middleware 函数，以此类推到 controller、view、model。

这个机制对编写 middleware 类型的插件会有影响，因为很多中间件对执行顺序有要求，所以你可以通过配置插件的顺序来影响中间件的执行顺序。

下面，我们来编写一个插件，插件的编写简直不要太简单，一个 plugin 插件就是一个 JavaScript 文件，插件的基本框架如下所示:

```js
module.exports = function(options) {
  global(g) {
    // 在这里往 global 对象上挂载方法；因为global函数会在 Lime 生命周期的最开始执行挂载，因此可以确保你在
  },
  install(app, context) {
    // 在这里修改 Koa 的 app 和 context 对象原型
  },
  middleware(app) {
    // 在这里通过 app.use() 注入中间件
  },
  controller(proto) {
    // 在这里扩展 控制器 的能力
  },
  model(proto) {
    // 在这里扩展 模型能力
  },
  view(proto) {
    // 在这里扩展 视图能力
  }
}
```

这里的middleware字段所注入的中间件 实际上就是 Koa 的原生中间件，因此我们可以复用 npm 仓库中数以万计的中间件模块。

举个栗子，我们以编写一个 logger 插件为例:

```js
const logger = require('koa-logger') // 引入一个 Koa2 原生中间件
module.exports = function(options) {
  middleware(app) {
    // 在这里使用 Koa 中间件语法把 logger 中间件注入到 lime 框架中
    app.use(logger)
  }
}
```

编写完成之后，我们把该文件命名为 `logger.js` 放置到项目根目录的 `plugins` 目录下:

```bash
|- src
|- plugins
  |- logger.js
```

当你的插件比较复杂(有多个文件时)，也可以以目录的形式组织起来，命名为目录放置在 plugins 目录下:

```bash
|- src
|- plugins
  |- logger
    |- index.js
    |- dep.js
```

不过要注意确保 `logger/index.js` 正确导出 lime 所要求的插件对象。


插件代码编写完成后，需要配置才能启用。我们去项目根目录的 `config` 目录下，在 `common.js` 公共配置中的 `plugins` 字段加入该插件:

```js
module.exports = {
  // plugins是个数组，依次填写插件名称或插件对象
  plugins: [
    'logger'
  ]
}
```

注意: 通常情况下，Koa 的一些中间件是有顺序要求的。例如 `koa-logger` 中间件的官方建议:

> Recommended that you .use() this middleware near the top to "wrap" all subsequent middleware.

而 limejs 框架是依靠你在 plugins 字段上配置的前后顺序来依次加载的。因此，在 `common.js` 的配置中你要注意把 logger 插件放置在靠前的位置就好了。

### 使用 npm 模块插件

有些插件是其他人开发好，并且发布到 npm 仓库的，此时你不需要把插件下载到自己项目中。你只需要安装它:

```bash
npm install @limejs/plugin-cors
```

然后在插件配置中这样指定上插件的npm包名

```js
module.exports = {
  // plugins是个数组，依次填写插件名称或插件对象
  plugins: [
    '@limejs/plugin-cors'
  ]
}
```

Lime 注册插件的机制是: 优先寻找本项目 plugins 目录下的同名插件，如果无法找到，则寻找 node_modules 下的同名插件。如果都找不到，则抛出错误。

### 插件配置选项

在 config 中配置插件时，除了使用字符串的形式指定插件名称，还可以使用对象形式。对象形式可以允许你给插件传入 options 选项参数

例如，我们使用 koa-csrf 中间件来编写一个 Lime 插件:

```js
// 插件名称: lime-csrf
const CSRF = require('koa-csrf')
module.exports = function (options){
  middleware(app) {
    // 把 options 传入 koa-csrf 构造器
    app.use(new CSRF(options))
  }
}
```

那么，在使用该插件时，便可以在配置中加入选项配置:

```js
// common.js
module.exports = {
  plugins: [
    {
      name: 'lime-csrf',
      options: {
        invalidTokenMessage: '非法的token',
        invalidTokenStatusCode: 403
      }
    }
  ]
}
```


## API

### [Class] Lime

Lime 构造函数可以支持传入选项，以控制框架的初始化逻辑:

```js
const app = new Lime({
  root: __dirname, // 站点的项目目录
  config: '', // 站点配置文件目录
  mvc: '', // 站点 mvc 代码放置目录
  plugin: '', // LIME 插件 的放置目录
})
```

默认情况下，LIME 使用当前的 `工作目录` (process.cwd) 作为站点的根目录，同时站点的配置、路由、控制器路径也都是基于 `root` 的位置进行解析的. 因此，如果你的工作目录不在站点根目录下，或者你需要修改默认目录的位置，可在初始化时通过 Lime 构造函数选项来修改

对于使用 pm2、supervisor 等工具启动的 LIME 站点，我们建议你设置 root 参数为 `__dirname` (即当前站点项目的根目录), 以减少你错误配置 pm2、supervisor 的工作目录带来的问题。

### [Instance] app

Lime 的实例在 plugin 中经常碰到，lime 实例有以下属性和方法

* [prop] options 初始化 Lime 所用的选项配置
* [prop] config 基于站点配置文件site.js的站点信息
* [method] global 注入一个中间件处理函数. 该方法代理自 Koa
*

### [Global] global

Lime 除了核心类和实例方法之外，为了方便用户可以随时随地调用，还侵入性的在 Node.js global 对象添加了少量的辅助函数。他们有:

* [method] logger.\[warn|ok|error|info\](\<msg\>) 打印不同级别的信息到输出流（一般用来主动记录日志）


## Misc

### 环境变量说明

* DEBUG=lime:* 打开lime框架内核的调试日志；你也可以选择性地打开 lime:store, lime:controller, lime:router 等模块的调试日志
* PORT: http server 监听的端口号
* HOST: http server 监听的 host 地址

### 集成到已有的服务

除了前文讲到的通过 `app.listen` 来启动 LIME 服务，LIME 也可以单纯作为一个 http 处理器来用。这适用于把 LIME 集成到已有的 Node.js http 服务中(如腾讯公司的 [tsw](https://github.com/Tencent/TSW))。

集成方式非常简单，只需把 `app.callback()` 的返回值作为 http 请求的 handler 处理器即可。示例:

```js
// your server code
const http = require('http')
const Lime = require('@limejs/core')
const app = new Lime()
http.createServer(app.callback()).listen(8080)
```

## CONTRIBUTE

欢迎帮助 LIME 进化和修复 issue，您可遵循 [CONTRIBUTE](./CONTRIBUTE.md) 规范来参与开发。

todo任务分为 内核、工具、生态、插件，这是我们的 TODO 列表:

* [内核] 插件支持配置和options
* [内核] 优化启动方式，启动的port和host改成从配置文件获取，减轻启动时代码复杂度
* [内核] 路由、插件解析报错的处理
* [内核] 异常处理优化
* [内核] 内置插件移除 转为limejs/plugin-x 的npm包
* [生态] 更多脚手架模板完善
* [内核] view、model、service层完善
* [内核] 支持 global 挂载
* [工具] PM2 和 nginx 配置
* [内核] host,port,publicPath，env 配置支持
* [工具] docker支持
* [插件] redis，mongoose插件
* [内核] 利用app.onerror 实现优雅的让用户定制500 404页面。
* [内核] 加载插件时，对于需要绑定this的函数，检测其是否使用了箭头函数(无法绑定this)，有的话则提醒并退出

## CHANGELOG

LIME 正在不断进化迭代中，你可以在 [这里](./CHANGELOG.md) 查看版本变更细节

## License

[MIT](./LICENSE) License
