import request from '@/utils/request'
//  商品，商品列表
export function fetchList(data) {
  return request({
    url: '/sellergoods/getgoodslist',
    method: 'post',
    data
  })
}
// 删除
export function handleDelete(id) {
  return request({
    url: '/sellergoods/delproduct',
    method: 'post',
    data: {
      id
    }
  })
}
// 查询商品sku库存
export function updateSkuStockList(prdid) {
  return request({
    url: '/sellergoods/loadSkunum',
    method: 'post',
    data: {
      prdid
    }
  })
}
// 修改sku库存
export function updateSkunum(stocklist) {
  return request({
    url: '/sellergoods/updateSkunum',
    method: 'post',
    data: {
      stocklist
    }
  })
}

// 获取商品品牌
export function fetchBrandList() {
  return request({
    url: '/sysbrand/getbrandlist',
    method: 'post',
    data: {}
  })
}
// 获取商品分类
export function fetchListWithChildren(storeid) {
  return request({
    url: '/sellergoods/getcatlist',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 根据一级分类查询二级分类
export function loadcatlist(data) {
  return request({
    url: '/sellergoods/loadcatlist',
    method: 'post',
    data
  })
}
// 商品列表-批量操作
export function displayGoods(data) {
  return request({
    url: '/sellergoods/displayGoods',
    method: 'post',
    data
  })
}
// 获取商品详情
export function getgoodsinfo(prdid) {
  return request({
    url: '/sellergoods/getgoodsinfo',
    method: 'post',
    data: {
      prdid
    }
  })
}
