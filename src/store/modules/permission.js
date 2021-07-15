import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import { getInfo }from '@/api/user'

/**
 * Use meta.role to determine if the current user has permission
 * @param menus
 * @param route
 */

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  phone: state => state.user.phone,
  cms_accname: state => state.user.cms_accname,
  //添加menus
  menus: state => state.user.menus,
  //动态路由
  permission_routes: state => state.permission.routes,
}

function hasPermission(menus, route) {
  // console.log(menus, route);
  if (route.meta && route.meta.menus) {
    return menus.some(role => route.meta.menus.includes(role))
  } else {
    return true
  }
}

const add = [

]
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    console.log(item);
  //   const menu = {
  //     path: item.path == '' ? item.menu_id + '_key' : item.path,
  //     component: item.path == '' ? Layout : () => import(`@/views${item.path}/index`),
  //     // hidden: true,
  //     child: [],
  //     name: item.tranname,
  //     meta: { title: item.tranname, icon:item.icon, id: item.ptrancode }
  //   }
  //   if (item.child) {
  //     generaMenu(menu.child, item.child)
  //   }
  //   routes.push(menu)
     // let menu = [
    //   {
    //     name: "newcat",
    //     path: "/newcat",
    //     redirect: "/newcat/list",
    //     component: {
    //       name: "Layout"
    //     },
    //     children: [
    //       {
    //         meta: {
    //           icon: "el-icon-table-lamp",
    //           title: "分类列表"
    //         },
    //         component: {
    //           name: "component"
    //         },
    //         name: "list",
    //         path: "catlist",
    //       }
    //     ]
    //   }
    // ];
    // routes.push(menu)
    // console.log(routes);
    // routes = menu;
  })
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit }, menus) {
    // console.log(menus);
    return new Promise(resolve => {
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getInfo().then(response => {
        // console.log(response);
        let { menus } = response
        // console.log(menus);
        // 如果返回的retrncode不等于0的话抛出异常
        if (response.returncode!=0) {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          // 把menues赋值给loadMenuData
          Object.assign(loadMenuData, menus)
          // 传参给上面赋值的函数
          generaMenu(asyncRoutes, loadMenuData)
          let accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

