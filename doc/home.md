# Home

## introduction

### 架构说明

基于lime之上，我们有官方的站点开发套件来提升开发体验，如:

* lime-cli 一个使用lime框架进行web开发的配套命令行工具

* lime-cms 一个底层基于lime的CMS内容管理系统。用于快速开发企业站、新闻站等内容站点；内置了基本的内容管理能力和丰富的插件

* lime-tick 一个配合前端SPA框架tick的前后端分离的SSR同构项目框架

### 目录结构说明

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

## link

* [快速开始](./start.md)
* [配置](./config.md)
* [lime-cli](./lime-cli.md)
* [控制器](./controller.md)
* [模型](./model.md)
* [视图](./view.md)
* [插件](./plugin.md)
* [错误和异常处理](./error.md)
* [Web安全](./safe.md)
* [开发一个简单的新闻站](./demo.md)
* [测试](./test.md)
