# lime

lime(莱蒙) 是一个基于 Koa2 的 Node.js Web开发框架，它基于经典的 MVC 范式，致力于帮助前端开发工程师更规范地进行 Node 中间层的开发。

如果你是一名熟悉 JavaScript/Vue.js 或 Node.js 的前端工程师，你一定能立刻上手 lime 来开发 Node 层的 API 接口或 SSR(服务端渲染)；如果你曾经使用过 ASP.NET MVC 、Thinkjs、ThinkPHP 或 其他类 MVC的后端框架，相信你也一定会很快上手。

## 应用场景

* 具有完整的后端 MVC 分层的新闻站、企业站、博客站点
* 只在 Node 层提供 API 或静态资源的 SPA单页应用；甚至支持 SSR
* 只希望在 Node 层提供 Restful API 形式的接口或 API 代理

## 理念

* [开放] lime 希望尽可能地让上层 Coding 过程变得精简且规范，但又无缝衔接 Koa 和 npm 的现有生态和知识体系。除了框架所需的基本模式概念要求之外，lime 不会创造额外的概念，本质上 lime 是 Koa 之上很薄的一层，只希望能简化你使用 Koa 的流程，但不屏蔽 Koa 的生态体系。在灵活与范式之间，lime 会以最 `中庸` 的态度做出权衡，并不断面向用户体验和未来而演进。

* [灵活] lime 内核虽然采用了 MVC，但你在上层可以轻易 `使用` 或 `不使用` 其中任何一个部分，从而适应你目前开发团队的工作模式。

* [激进] lime 会时刻保持跟进 Node.js LTS 版本最新特性 以提高性能和开发体验。 如果您发现 lime 哪里使用了过时的语法或技术，请及时提出 issue 帮助 lime 改正。

## 环境要求

* 最低: Node.js@8.0+ 推荐: Node.js@latest
* 最低: npm@5.6+ 推荐: npm@latest

## 快速开始

* lime 提供了一个官方 command line 工具，首先需要安装 lime-cli

```bash
npm i -g lime-cli
```

* 初始化一个基于标准模板的项目。按照命令行提示来选择 standard 类型的模板，并输入相应的项目配置信息

```bash
lime init lime-project
```

* 进入项目目录，安装依赖

```bash
cd lime-project
npm install
```

* 以开发模式启动项目

```bash
npm run dev
```

开发模式 lime 会使用一个 `随机` 端口启动一个本地的 http server，如果顺利的话，你会看到

```bash
Congratulations! LIME is listening at http://127.0.0.1:64493
```

That's all.

## 文档

尽管你可以轻易地查看 lime 源码来解决所有问题，但 lime 认为文档对于开发效率依然非常重要。

为此， lime 提供有相对比较详细的[开发文档](./doc/home.md)，希望助你一臂之力。

建议你花费 30 分钟，依次看完 [快速开始](./doc/start.md)、[配置](./doc/config.md)、[lime-cli](./doc/lime-cli.md)、[控制器](./doc/controller.md)，就可以开始阅读 [开发一个简单的新闻站]，仿照这个实例便完全可以开发出一个功能完备的站点了，Good Luck!

## 成功案例

* [gatebe](gatebe.com) 全球智能投顾量化交易网站
* [青檬前端](limefe.com) 一个小而美的前端小圈子
* [邹平手机卡网](zpsjk.com) 邹平手机卡专业卖场
* [sheldon的博客](blog.cuiyongjian.com) sheldon的个人博客
* [limecms](limecms.limefe.com) 一个基于 lime 框架的小而美的通用 cms 建站系统
* [limelog](limelog.limefe.com) 一个基于 lime 框架的小而美的通用博客系统

## TODO

* [ ] safe模块
* [ ] 单元测试
* [ ] 官方示例项目
* [ ] doc 文档
* [ ] travis CI

## 贡献

请按照 [CONTRIBUTING](./CONTRIBUTING.md) 指南进行贡献

## License

[MIT](./LICENSE) License
