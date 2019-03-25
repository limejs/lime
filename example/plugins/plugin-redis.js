module.exports = function (options) {
  return {
    service(proto) {
      proto.redis = function () {}
    }
  }
}
