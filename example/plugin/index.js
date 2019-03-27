module.exports = function(config) {
  return [
    'plugin-global-logger',
    {
      name: 'plugin-req-logger',
      options: {
        proxy: true // 是否信任代理，信任的话则打印请求时会 X-Forwarded-Host 获取主机名，否则使用 host
      }
    },
    'plugin-static',
    'plugin-render',
    'plugin-service',
    'plugin-model',
    {
      name: 'plugin-redis',
      options: {
        
      }
    }
  ];
};
