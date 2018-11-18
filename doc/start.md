
### 运行

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



## quick start

在 MVC 应用中，有几个比较基本的概念: router、controller、action、view、model

其基本关系如下图所示:


一个请求的生命周期为: router->controller->action

在action中你可以获取 model 中定义的数据，并把要展示的数据交给view视图渲染出来 发送给前端。
