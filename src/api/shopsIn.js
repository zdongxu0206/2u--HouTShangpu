import request from '@/utils/request'
//商铺入驻   获取国家区号
export function countryCodes() {
  return request({
    url: '/seller/getarea',
    method: 'post',
    data:{}
  })
}
// 获取验证码
export function getcode(phone,area) {
  return request({
    url: '/seller/getcode',
    method: 'post',
    data:{phone,area}
  })
}
// 添加商铺
export function submit(data) {
  return request({
    url: '/seller/submit',
    method: 'post',
    data
  })
}
// 验证验证码
export function checkRandcode(phone,randcode) {
  return request({
    url: '/seller/checkRandcode',
    method: 'post',
    data: {
      phone,
      randcode
    }
  })
}
// 校验2u号 有2u号的情况下
export function checkout2u(data) {
  return request({
    url: '/seller/checkout2u',
    method: 'post',
    data
  })
}
// 注册2u号 没有有2u号的情况下
export function create2uaccount(data) {
  return request({
    url: '/seller/create2uaccount',
    method: 'post',
    data
  })
}
