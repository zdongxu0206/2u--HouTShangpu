import request from '@/utils/request'
// 平台装修  查询店铺
export function getstorelist(storeid) {
  return request({
    url: '/syshomepage/getstorelist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 平台装修  查询店铺下商品
export function getgoodslist(storeid) {
  return request({
    url: '/syshomepage/getgoodslist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 平台装修  查询分类数组
export function getcatlist(storeid) {
  return request({
    url: '/sellergoods/getcatlist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 平台装修  平台首页
export function gethomepagelist(data) {
  return request({
    url: '/syshomepage/gethomepagelist',
    method: 'post',
    data
  })
}
// 跳转路径列表
export function loadlinks(data) {
  return request({
    url: '/sellerhomepage/loadlinks',
    method: 'post',
    data
  })
}

// 获取prdid
export function loadgoodslist(data) {
  return request({
    url: '/syshomepage/loadgoodslist',
    method: 'post',
    data
  })
}
