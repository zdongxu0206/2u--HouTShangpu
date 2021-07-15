import request from '@/utils/request'
//  商品 商品类型
export function fetchList(data) {
  return request({
    url: '/sellercat/getcatlist',
    method: 'post',
    data: {
      limit: data.pageSize,
      start: data.pageNum - 1,
      storeid:data.storeid
    }
  })
}
// 删除
export function deleteProductCate(catid) {
  return request({
    url: '/sellercat/delcat',
    method: 'post',
    data: {
      catid
    }
  })
}
// 修改  catid 分类id 有为修改 没有为添加
export function updateProductCate(data) {
  return request({
    url: '/sellercat/submitInfoCats',
    method: 'post',
    data
  })
}
// 加载分类详情
export function getProductCate(data) {
  return request({
    url: '/sellercat/querycat',
    method: 'post',
    data
  })
}

// 添加一级二级分类
export function addcat(data) {
  return request({
    url: '/sellercat/addcat',
    method: 'post',
    data
  })
}
// 编辑一级二级分类
export function editcat(data) {
  return request({
    url: '/sellercat/editcat',
    method: 'post',
    data
  })
}
// 把对应的值复制过来
export function getcatlist(storeid) {
  return request({
    url: '/sellergoods/getcatlist',
    method: 'post',
    data:{
      storeid
    }
  })
}
// 查看下级
export function getcastlist(catid) {
  return request({
    url: '/sellercat/loadnextcat',
    method: 'post',
    data:{
      catid
    }
  })
}
