## 错误和异常处理

如果要在 controller 中抛出一个异常，可以使用 this.throw() 来抛出，函数原型为:

```js
ctx.throw([status], [msg], [properties]) // （基于http-errors进行错误包装）
```

为了避免异常逃逸，请不要在controller中再次使用其他异步函数如 setTimeout 等。
