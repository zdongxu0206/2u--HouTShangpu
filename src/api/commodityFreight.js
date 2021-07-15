import request from '@/utils/request'
//  运费模版
export function fetchList(data) {
  return request({
    url: '/sellerfreight/loadstorefreight',
    method: 'post',
    data: {
      start: data.pageNum - 1,
      limit: data.pageSize,
      storeid: data.storeid
    }
  })
}
// 获取运费模板
export function getstorefreight(storeid) {
  return request({
    url: '/sellergoods/getstorefreight',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 获取商品品牌
export function getbrandlist() {
  return request({
    url: '/sellergoods/getbrandlist',
    method: 'post',
    data: {

    }
  })
}
export function getprovincelist() {
  return request({
    url: '/sellerfreight/getprovincelist',
    method: 'post',
    data: {

    }
  })
}
// 编辑运费模板
export function UPgetprovincelist(storeid,tplid) {
  return request({
    url: '/sellerfreight/getfreight',
    method: 'post',
    data: {
      storeid,tplid
    }
  })
}
// 编辑运费
export function editamtfreight(data) {
  return request({
    url: '/sellerfreight/editamtfreight',
    method: 'post',
    data
  })
}
// 添加编辑模板
export function submitfreight(data) {
  return request({
    url: '/sellerfreight/submitfreight',
    method: 'post',
    data
  })
}
