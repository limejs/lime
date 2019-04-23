/* 
* @file 路由配置
*/

module.exports = (router) => {
  router.get('/', 'home@index')
  router.get('/service', 'home@service')
  router.get('/api', 'api@test')
}
