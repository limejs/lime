module.exports = function (app, options) {
  // 如何加载模型 schema是基于model定义的对象；函数需要 return 一个支持正删改查的ORM对象，从而让框架内核不用关心ORM具体实现。
  app.model((schema) => {
    console.log('根据schema加载模型', schema)
    return {
      // return 一个支持增删改查的ORM对象
    }
  })
}
