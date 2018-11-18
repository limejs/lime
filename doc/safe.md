
## XSS

lime 中服务端模板渲染基于社区的模板引擎，你可以使用模板引擎内置的 HTML escape 来实现 html 转义，以避免 xss注入。


## safe模块

lime 默认在 controller 和 model 的基类原型上内置了一个 safe 模块，实现了一些简单的安全函数，你可以在 controller 和 model 中通过this调用。

* escapeHtml
* richText 用于转义富文本。会造成XSS攻击的script标签被直接过滤掉；同时style标签中CSS属性position:fixed;样式也被过滤了。最终输出了无害的HTML富文本。http://blog.jobbole.com/71661/
* jsEncode 对输入的String进行JavaScript 转义 对中文进行unicode转义，单引号，双引号转义
* escapeJson 不破坏JSON结构的escape函数，只对json结构中name和vaule做escapeHtml处理
* escapeJsonForJsVar 可以理解就是jsEncode+escapeJson
