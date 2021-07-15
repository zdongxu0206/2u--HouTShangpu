import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/seller/login',
    method: 'post',
    data
  })
}

// 验证token 获取用户信息
export function getInfo(access_token) {
  return request({
    url: '/seller/getUserinfo',
    method: 'post',
    data: {
      access_token
    }
  })
}
// // 退出登录
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
