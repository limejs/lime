
# CHANGELOG

* `release v0.1.5` [2019-03-05]
  * fix: 修复了 await app.listen 不合理的问题
  * opt: 优化了 Lime 初始化过程的日志显示，避免用户编写插件时无法定位到问题

* `release v0.1.1` [2019-02-25]
  * fix: 新增 Lime 的 listen 方法返回 server 对象

* `release v0.1.0` [2019-02-25]
  * 由于 0.0.4 发生不少变更(甚至是 break change)，因此暂时增加 npm minor 版本号
  * 目前先不更改大版本号，继续保持优化，等完成单元测试后再发布 v1.0，以真正支持线上生产环境使用。

* `release v0.0.5` [2019-02-24]
  * 去掉兜底 200 status 的中间件，改成返回 404 错误码; 以免产生误解
  * add yarn support

* `release v0.0.4` [2019-02-23]
  * **break change** 重构代码，梳理初始化逻辑，lime 核心改为 class 方式调用. 
  * 增加 `example` 目录方便核心开发和贡献
  * 增加 vscode debug 脚本命令
  * 优化框架路径path的处理: 改为默认使用 cwd 工作目录，可通过 Lime 构造函数修改默认目录
  * 暴露了 app.config app.options 属性，分别用于获取站点配置、构造选项
  * 优化框架异常提示，提升用户使用体验
  * 增加一个 global.logger 函数，用于打日志

* `realease v0.0.3` [2019-01-10]
  * 增加内核 plugin、router 模块的报错日志

* `realease v0.0.2` [2019-01-07]
  * 修改包名为 @limejs/core

* `release v0.0.1` [2018-01-02]
  * 增加 cors 内置中间件
  * 增加 csrf 内置中间件
  * 发布 npm

* `beta` [2018-11-12]
  * 增加 plugin 机制

* `beta` [2018-11-07]
  * first blood
  * add .gitignore
  * add .editorconfig
