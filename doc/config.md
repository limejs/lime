
## 配置

lime 要求必须在站点根目录下放置 entry.js 和 config目录，config目录下目前有3个配置文件。分别负责 持久化(存储层) store.js、路由 router.js、站点基础信息 site.js 的配置

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
