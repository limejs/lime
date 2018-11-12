# lime

lime 是一个基于 Koa2 开发的 MVC 架构的小型 Web 开发框架，他致力于提供最简洁和最快速的开发体验。它的目标有2个: 一个是运行上的快、一个是开发人员的爽。

它的理念是尽可能地让上层 Coding 变得精简，但又能无缝地直接衔接 Koa 和 npm 的现有生态；在灵活与标准之间，lime 会以最 `中庸` 的态度做出权衡，并不断面向用户体验和未来而演进。

## 用法

首先初始化项目:

```bash
npm i -g lime-cli
```

接下来只需用 Node 执行站点目录下的 entry.js，则会在本地启动一个 HTTP 服务器，监听默认的 3000 端口

```bash
node ./entry.js
或
npm start
```

如果希望改变端口，可以通过修改PORT环境变量的方式:

```bash
PORT=8080 node ./entry.js
或
PORT=8080 npm start
```

如果你有自己的 Web Server, 则可以直接引用 entry.js, 我们已经导出了一个基本的 http handler 处理器. 示例用法:

```js
// your server code
const http = require('http')
const app = require('./yoursite/entry.js')
http.createServer(app).listen(8080)
```

## 架构说明

基于lime之上，我们有官方的站点开发套件来提升开发体验，如:

* lime-cli 一个使用lime框架进行web开发的配套命令行工具

* lime-cms 一个底层基于lime的CMS内容管理系统。用于快速开发企业站、新闻站等内容站点；内置了基本的内容管理能力和丰富的插件

* lime-tick 一个配合前端SPA框架tick的前后端分离的SSR同构项目框架

## 目录结构说明

```js
config 站点配置
core lime内核(后续会独立为npm包)
src 站点业务逻辑
    |- controller 控制器
    |- model 模型
    |- view 视图
entry.js 站点主入口，可使用 node entry.js 启动站点
```

就这么多文件，是不是感到 so easy. 已经想跃跃欲试了?

## 配置

lime 要求必须在站点根目录下放置 entry.js 和 config目录，config目录下目前有3个配置文件。分别负责 持久化(存储层) store.js、路由 router.js、站点基础信息 site.js 的配置。

### 站点基本信息配置

`config/site.js`

### 路由配置

`config/router.js`

### 数据库配置

`config/store.js`

## 环境变量说明

* DEBUG=lime:* 打开lime框架内核的调试日志；你也可以选择性地打开 lime:store, lime:controller, lime:router 等模块的调试日志
* NODE_ENV: 可选 development 或 production
* PORT: node http server 监听的端口号

## 视图支持

默认支持 handlebars 模板引擎，可支持在 config/site.js 中配置所有被 [consolidate](https://github.com/tj/consolidate.js/) 所支持的模板引擎

## 内置的能力

### JWT支持

### 缓存会话支持

## 成功案例

* gatebe 全球智能投顾量化交易网站

## 贡献

* Fork 本仓库
* 克隆你 fork 的仓库到本地
* 在本地 lime 框架目录的同级使用 lime-cli 创建一个 demo 项目
* 在 lime 框架目录中创建一个 feature 或 bugfix 分支
* 在 demo 项目中执行 `npm link ../lime` 从而将本地的 lime 作为demo项目的软链依赖
* 努力在 lime 框架项目中添加你的代码，并在 demo 项目中进行测试
* 确保你的代码已经经过完整的单元测试
* 发起 pull request，与官方讨论合并

## License

MIT License