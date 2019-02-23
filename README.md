[![npm version](https://img.shields.io/npm/v/@limejs/core.svg?style=flat)](https://www.npmjs.com/package/@limejs/core) [![downloads](https://img.shields.io/npm/dt/@limejs/core.svg)](https://www.npmjs.com/package/@limejs/core)


# LIME

lime.js 是一个基于 Koa2 的 Node.js Web开发框架，它基于经典的 MVC 范式，致力于提供简单易用的 Web 应用开发体验。

## Feature

* 内核简单、优雅， 易上手

  lime.js 可以无缝衔接 Koa 和 npm 的现有生态；在灵活与标准之间，lime 以 `中庸` 的态度做出权衡，并不断面向用户体验和未来而演进

* 可扩展性强， 功能完备

  尽管保持了小而精致的内核，但通过插件机制和社区生态打造的脚手架， lime 完全可以胜任复杂项目的开发

* 经典 MVC 范式， 约定大于配置

  采用最经典的分层架构、约定大于配置的设计理念。在 MVC 的基类设计上，用 proxy 代替继承以降低开销

* 面向未来的架构和工具链

  对于服务器端而言，升级运行环境的成本要比客户端小的多。也正因如此，lime.js 会毫不客气的废弃对老版本 Node.js 的支持。lime 会用面向未来的态度随时进化

## Case

* [波动星球](https://boodo.qq.com)
* [Gatebe](https://gatebe.com)

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
  |-mvc
    |-controller
      |-home.js # 一个叫做 Home首页 的 控制器
    |-view
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
    async index(ctx, next) {
      ctx.body = 'hello lime'
    }
  }

  // app.js 中引入 lime 框架内核并启动
  const Lime = require('@limejs/core')
  const app = new Lime()
  app.listen()
```

控制器代码中的 `index` 函数叫做控制器的 `action`，它本质上是一个完全意义上的 Koa 中间件函数，该函数所传入的 ctx 和 next 参数分别表示 Koa 的 ctx 上下文对象以及下一个中间件函数。更多细节请参考 controller 文档。

如果一切顺利，此时打开浏览器访问 <http://localhost:3000> 便可以看到

```bash
hello lime! # 看到它 说明已经运行成功
```

## Boileplate

尽管创建一个基于 LIME 框架的项目如此简单，但事实上在真实项目开发时你无须自己手工编写项目样板。LIME 官方提供了一坨开箱即用的项目样板供您享用。无论是开发 Rest API 项目，还是基于 Vue.js 的前后端分离项目，LIME 都有一套完备且易用的样板。目前有以下这些样板项目:

* SSR 服务端渲染的 Vue.js 样板 [适合面向消费者、对性能和SEO有一定要求的站点]
* 前后端分离的非 SSR 的 Vue.js 样板 [适合内网管理端】
* API 项目样板 [适合开发REST API项目]

我们正在加快开发 [Lime-cli](https://github.com/limefe/lime-cli) 脚手架工具，以提高 LIME 样板的创建效率和开发体验。敬请期待！

## Convention

LIME 是 `约定大于配置` 的，所以 LIME 内部有一些惯例(约定)，我们在这里做简要说明。

* 站点目录结构必须符合规范

```js
|-- config
  |-- site.js 站点配置文件
|-plugin
  |- ua.js 一个插件
|-- mvc
  |-- router.js 路由
  |-- controller 控制器
  |-- model 模型
  |-- view 视图
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

假如我们要创建一个 `新闻` 的控制器 `news`，并在控制器中提供一个获取 `新闻列表` 的 action 函数。那么，我们应该创建一个 `mvc/controller/news.js` 的文件，并在 `news.js` 中这样编写一个控制器对象:

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

* 路由

路由的约定是: `路由行为用@符号来分割controller和action`

举个栗子: 我们希望客户端发送的 `http://domain.com/news` 请求可以返回上面的 `新闻列表`，也就是说要把 `/news` 路径的 `get` 请求交给 `news controller` 的 `list action` 来处理。那么我们应该这样编写路由:

```js
module.exports = (router) => {
  router.get('/', 'news@list')
}
```

## Config

config/site.js 是 LIME 的框架基础配置，可配置的参数有:

```js
module.exports = {
  port: 3001, // 监听端口
  host: '127.0.0.1', // 监听地址
  cookie: [], // cookie加密串
  session: {
    open: false, // 是否启用session
    key: '' // 启用 session 后的session cookie名
  },
  cors: {} // 这是 LIME 内置插件 cors 的配置，配置规则参考 koa-cors
}
```

## Plugin

LIME 通过插件的机制来扩展框架的能力。通过编写插件，可以实现:

* 挂载 global 对象上的辅助函数
* 在请求生命周期中注入中间件
* 扩展 MVC 模块中的方法

如果你熟悉 Koa2, 那么插件的编写简直不要太简单，一个 plugin 插件就是一个 JavaScript 文件，插件的基本框架如下所示:

```js
module.exports = {
  install(app, context) {
    // 在这里修改 Koa 的 app 和 context 对象
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

这里的中间件 实际上就是 Koa 的中间件，因此我们可以复用 npm 仓库中数以万计的中间件模块。

举个栗子，我们以编写一个 logger 插件为例:

```js
const logger = require('koa-logger')
module.exports = {
  middleware(app) {
    // 在这里使用 Koa 中间件语法把 logger 中间件注入到 lime 框架中
    app.use(logger)
  }
}
````

当然，你不需要在项目中编写一个 logger 插件。对于一些 Web 开发的基础能力，LIME 在核心中内置了对应的插件:

* 模板引擎支持
* logger 请求响应日志
* CORS 跨域支持
* CSRF 防跨站脚本攻击
* bodyParser 自动根据 contentType 类型解析请求 payload

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
* [method] use 注入一个中间件处理函数. 该方法代理自 Koa

### [Global] global

Lime 除了核心类和实例方法之外，为了方便用户可以随时随地调用，还侵入性的在 Node.js global 对象添加了少量的辅助函数。他们有:

* [method] logger.\[warn|ok|error|info\](\<msg\>) 打印不同级别的信息到输出流（一般用来主动记录日志）


## Misc

### 环境变量说明

* DEBUG=lime:* 打开lime框架内核的调试日志；你也可以选择性地打开 lime:store, lime:controller, lime:router 等模块的调试日志
* PORT: node http server 监听的端口号
* HOST: node http server 监听的 host 地址

### 集成到已有的服务

除了前文讲到的通过 `app.listen` 来启动 LIME 服务，LIME 也可以单纯作为一个 http 处理器来用。这适用于把 LIME 集成到已有的 Node.js http 服务中(如 [tsw](https://github.com/Tencent/TSW))。

集成方式非常简单，只需把 `app.callback()` 的返回值作为 http 请求的 handler 处理器即可。示例:

```js
// your server code
const http = require('http')
const Lime = require('@limejs/core')
const app = new Lime()
http.createServer(app.callback()).listen(8080)
```

## CONTRIBUTE

1. Fork 本仓库到你的 github 账户

2. 克隆你 Fork 的仓库到本地

3. 在本地项目中新建一个 feature 或 bugfix 分支

4. 安装 LIME 内核的依赖

    ```bash
    cd lime
    npm install
    ```

5. 启动示例项目

    ```bash
    npm start
    ```

    修改框架核心代码，示例项目会自动监测代码保存并重启

6. vscode debug:

    遇到难以排查的问题，可以通过 vscode 的 debug 功能进行调试。其底层会调用 `npm run debug 命令启动 Node.js 调试服务器

7. unit test

    LIME 通过编写严格的单元测试保证框架质量，请保证修改的框架代码都编写并且通过了单元测试。LIME 在 github 使用 `travis-ci` 进行持续集成

    ```bash
    npm run test
    ```

8. pull request

    发起 pull request 与官方讨论合并

9. publish

    LIME 通过发布 npm 包的方式提供给用户使用，包名为 `@limejs/core`。所有官方插件放置在 `@limejs` 命名空间下。发布 npm 时仅发布运行时代码，包括:

    ```js
    "files": [
      "index.js",
      "lib",
      "mvc",
      "example",
      "doc"
    ]
    ```

    其中 doc 和 example 是为了方便用户在本地查看或调试框架代码。

## CHANGELOG

* 0.0.5 [2019-02-24]
  * 去掉兜底 200 status 的中间件，改成返回 404 错误码; 以免产生误解

* 0.0.4 [2019-02-23]
  * 重构代码，梳理初始化逻辑，lime 核心改为 class 方式调用
  * 增加 `example` 目录方便核心开发和贡献
  * 增加 vscode debug 脚本命令
  * 优化框架路径path的处理: 改为默认使用 cwd 工作目录，可通过 Lime 构造函数修改默认目录
  * 暴露了 app.config app.options 属性，分别用于获取站点配置、构造选项
  * 优化框架异常提示，提升用户使用体验
  * 增加一个 global.logger 函数，用于打日志

* 0.0.1 [2018-11-30]
  *first blood

## License

[MIT](./LICENSE) License
