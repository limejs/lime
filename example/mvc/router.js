/* 
* @file 路由配置
*/

module.exports = (router) => {
  router.get('/api/test', 'api@test')
  router.get('/', 'home@index')
}
