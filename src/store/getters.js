const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  phone: state => state.user.phone,
  cms_accname: state => state.user.cms_accname,
  // 添加 menus
  menus: state => state.user.menus,
 //动态路由
 permission_routes: state => state.permission.routes,
}
export default getters
