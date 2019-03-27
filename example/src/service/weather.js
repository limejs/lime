// 获取天气信息

module.exports = {
  // this.ctx this.config 可用
  async beijing(data) {
    return {
      city: 'beijing',
      data: '晴'
    }
  },
  async shanghai(data) {
    return {
      city: '上海',
      data: '下雨'
    }
  }
}
