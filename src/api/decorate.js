import request from '@/utils/request'
//  商铺装修
export function getgoodslist(storeid) {
  return request({
    url: '/sellerhomepage/getgoodslist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 店铺首页
export function gethomepagelist(storeid) {
  return request({
    url: '/sellerhomepage/gethomepagelist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 获取头部信息
export function loadshopdetail(storeid) {
  return request({
    url: '/sellerhomepage/loadshopdetail',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 商铺橱窗类型
export function getshowcaselist(storeid) {
  return request({
    url: '/sellerhomepage/getshowcaselist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 跳转路径列表
export function loadlinks() {
  return request({
    url: '/sellerhomepage/loadlinks',
    method: 'post',
    data:{}
  })
}
// 修改banner图
export function getbanner(data) {
  return request({
    url: '/sellerhomepage/getbanner',
    method: 'post',
    data
  })
}
// 添加/编辑店铺配置
export function submitInfoHomes(data) {
  return request({
    url: '/sellerhomepage/submitInfoHomes',
    method: 'post',
    data
  })
}
