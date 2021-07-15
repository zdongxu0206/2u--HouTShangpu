import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { MessageBox, Message } from 'element-ui'
const getDefaultState = () => {
  return {
    token: getToken(),
    cms_accname: '',
    phone: '',
    // 列表接口
    menus: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 名字
  SET_NAME: (state, cms_accname) => {
    state.cms_accname = cms_accname
  },
  // 电话,后期换icon
  SET_AVATAR: (state, phone) => {
    state.phone = phone
  },
  // 侧边栏
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // 掉登录接口
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        console.log(response);
        if (response.returncode == 0) {
          const token = response.token
          // 存储token
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }
        if (response.returncode == -1) {
             Message({
              message: '用户不存在，请输入正确的账号密码!',
              type: 'error',
              duration: 3 * 1000
            })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 调验证token的接口
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // console.log(response);
        const { userinfo } = response
        const { menus } = response
        // console.log(userinfo,menus,'user.js');
        // 验证返回的用户信息是否为空
        if (!userinfo) {
          return reject('验证失败，请重新登录')
        }
        const { cms_accname, phone, userid, storeid } = userinfo
        // 把列表存到vuex里面
        // console.log(menus);
        // 存在
         commit('SET_MENUS', menus)
        // 把名字id存到localStorage里面
        localStorage.setItem('storeid',storeid)
        localStorage.setItem('cms_accname',cms_accname)
        localStorage.setItem('userid', userid)
        localStorage.setItem('phone',phone)
        commit('SET_NAME', cms_accname)
        commit('SET_AVATAR', phone)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

