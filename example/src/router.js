/* 
* @file 路由配置
*/

module.exports = (router) => {
  router.get('/user', 'home@user')
  router.get('/', 'home@weather')
}
