# lime

LIME 是一个基于 Koa2 的 Node.js Web开发框架，它基于经典的 MVC 范式，致力于帮助前端开发工程师更规范地进行 Node 中间层的开发。

## Feature

LIME 希望打造一个简单的、易上手的、可扩展性强、功能完备的框架。我们认为大道至简，简单才能带来稳定和速度的提升。

LIME 有如下的特点:

* 简单易上手。复用开发者已有 Koa 领域知识，让新手 `3秒内` 上手开发
* 内核精简，追求性能出色和运行稳定
* 约定大于配置，提高开发效率

LIME 现已应用在 腾讯 [波动星球](https://boodo.qq.com) 等产品的线上生产环境

## 理念: 约定大于配置

我们对站点目录结构要求是:

```js
|-- config
  |-- site.js 站点配置文件
|-- mvc
  |-- router.js 路由
  |-- controller 控制器
  |-- model 模型
  |-- view 视图
|-- app.js 站点启动入口
|-- package.json
```

为了充分贯彻 `约定大于配置` 的理念，我们在配置文件 `config/site.js` 中仅仅支持配置如下选项:

```js
{
  port: 3000, // 站点启动端口
  host: '0.0.0.0', // 站点监听IP
}
```

也就是说，你无法通过配置文件来修改 LIME 所要求的目录结构。如确有必要的话，可通过 Lime 构造函数的参数来配置，如:

```js
const app = new Lime({
  root: __dirname,
  config: path.join(__dirname, './myconfig') // 修改默认配置文件的目录
})
```

但一般情况下，我们不建议修改默认目录结构。

## Get Start

使用 LIME 需要你熟悉 Node.js 基本语法，且了解 Koa 框架中的基本概念(如中间件)

通过 LIME 框架启动一个 Web 站点非常简单，只需两步:

```js
const Lime = require('@limejs/core')
const app = new Lime()
app.listen()
```

至于站点的监听地址和端口，你可以通过 3 种方式配置:

* 通过 `HOST` 和 `PORT` 环境变量来设置 [建议在生产环境使用]
* 可以在 `config/site.js` 配置 [建议在开发环境使用]
* 通过 `app.listen` 函数直接传入 [不建议]

端口和监听地址的读取优先级为: `listen函数传入 > PORT和HOST环境变量 > site.js配置文件`

## options

Lime 构造函数可以支持传入选项，以控制框架的初始化逻辑:

```js
new Lime({
  root: __dirname, // 站点的项目目录
  config: '', // 站点配置文件目录
  mvc: '', // 站点 mvc 代码放置目录
  plugin: '', // LIME 插件 的放置目录
})
```

## config

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

## plugin

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

其中的 中间件 实际上就是 Koa 的中间件，其中 `app` 对象也是一个 Koa 实例，因此他们跟 Koa 框架的所有 API 是相同的。

如 我们以 logger 插件为例:

```js
const logger = require('logger')
module.exports = {
  middleware(app) {
    // 在这里把 logger 中间件注入到 Koa 的 app 实例里
    app.use(logger)
  }
}
````

LIME 核心中内置的插件有:

* 模板引擎中间件

* logger 日志中间件

## usage

```js
const Lime = require('lime')
const app = new Lime()
// 启动服务 (使用 LIME 的默认端口)
app.listen()
````

tips: 默认情况下，LIME 使用当前的 `工作目录` (process.cwd) 作为站点的根目录，同时站点的配置、路由、控制器路径也都是基于 `root` 的位置进行解析的. 因此，如果你的工作目录不在站点根目录下，或者你需要修改默认目录的位置，可在初始化时通过 Lime 构造函数选项来修改，如:

```js
const app = new Lime({
  root: __dirname // 修改站点根目录
  config: path.resolve('./myconfig') // 修改站点配置文件放置目录
  mvc: path.resolve('./mymvc') // 修改站点 控制器、模型、视图 的放置目录
})
```

对于使用 pm2、supervisor 等工具启动的 LIME 站点，我们建议你设置 root 参数为 `__dirname` (即当前站点项目的根目录), 以减少你错误配置 pm2、supervisor 的工作目录带来的问题。

## test

## example

example 目录包含了一个简单的依赖 lime 的示例 Web 项目，以方便开发和调试 lime 的功能。

## publish

npm 发布目录

```js
"files": [
  "index.js",
  "lib",
  "mvc",
  "builtin"
]
```

## contribute

```bash
git clone https://github.com/limejs/lime
cd lime
npm install
```

start example which use lime core

```bash
npm start
```

vscode debug:

```bash
npm run debug
```

unit test

```bash
npm run test
```

## CHANGELOG

* [2019-02-23]
  - 重构代码，梳理初始化逻辑，lime 核心改为 class 方式调用
  - 增加 `example` 目录方便核心开发和贡献
  - 增加 vscode debug 脚本命令
  - 优化框架路径path的处理: 改为默认使用 cwd 工作目录，可通过 Lime 构造函数修改默认目录
  - 暴露了 app.config app.options 属性，分别用于获取站点配置、构造选项
  - 优化框架异常提示，提升用户使用体验
  - 增加一个 global.logger 函数，用于打日志

## License

[MIT](./LICENSE) License
