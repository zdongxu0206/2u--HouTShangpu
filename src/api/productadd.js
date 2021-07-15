import request from '@/utils/request'
//添加商品
//通过storeid获取商品分类信息
export function getPrdCatListWithStore(storeid) {
  return request({
    url: '/sellergoods/getcatlist',
    method: 'post',
    data: {
      storeid
    }
  })
}

//获取商品品牌信息
export function getPrdBrandListWithSys() {
  return request({
    url: '/sysbrand/getbrandlist',
    method: 'post',
    data: {
    }
  })
}

// 价格币种
export function loadCurrencyList() {
  return request({
    url: '/sellergoods/loadCurrencyList',
    method: 'post',
    data: {
    }
  })
}

// 查看商品详情
export function getProduct(prdid) {
  return request({
    url: '/sellergoods/getgoodsinfo',
    method: 'post',
    data: {
      prdid
    }
  })
}

// 发货地区号
export function loadfhd() {
  return request({
    url: '/sellergoods/loadfhd',
    method: 'post',
    data: {

    }
  })
}

// 获取属性参数列表
export function getAttrCatList(storeid) {
  return request({
    url: '/sellergoods/getattrcatlist',
    method: 'post',
    data: {
      storeid
    }
  })
}


// 添加商品
export function createProduct(data) {
  return request({
    url: '/sellergoods/submitInfoGoods',
    method: 'post',
    data
  })
}
