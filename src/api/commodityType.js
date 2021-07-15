import request from '@/utils/request'
//  商品 商品类型
export function fetchList(listquery) {
  return request({
    url: '/sellerattr/getcatgoods',
    method: 'post',
    data: {
      start: listquery.pageNum - 1,
      limit: listquery.pageSize,
      storeid: listquery.storeid
    }
  })
}
// 删除
export function deleteProductAttrCate(catid) {
  return request({
    url: '/sellerattr/delcatgoods',
    method: 'post',
    data: {
      catid
    }
  })
}

// 添加规格
export function addattr(data) {
  return request({
    url: '/sellerattr/addattr',
    method: 'post',
    data
  })
}

// 获取列表

export function updateattrs(catid) {
  return request({
    url: '/sellerattr/editattr',
    method: 'post',
    data: {
      catid
    }
  })
}

// 获取列表
export function updateparams(data) {
  return request({
    url: '/sellerattr/updateparams',
    method: 'post',
    data
  })
}
// 编辑 添加类型名称
export function createProductAttrCate(storeid,userid,catname,status) {
  return request({
    url: '/sellerattr/submitCatGoods',
    method: 'post',
    data: {
      storeid,
      userid,
      catname,
      status
    }
  })
}
// 修改商品类型名称
export function updateProductAttrCate(storeid,userid,catname,status,catid) {
  return request({
    url: '/sellerattr/submitCatGoods',
    method: 'post',
    data: {
      storeid,
      userid,
      catname,
      status,
      catid
    }
  })
}

// 加载属性 属性类型列表
export function fetchLists(data) {
  return request({
    url: '/sellerattr/loadattrlist',
    method: 'post',
    data: {
      start: data.start - 1,
      limit: data.limit,
      catid: data.catid,
      paramstatus:data.paramstatus
    }
  })
}
// 添加商品属性 下拉菜单 cuo
export function fetchListt() {
  return request({
    url: '/sellerattr/getattrlist',
    method: 'post',
  })
}

// 添加商品属性 修改
// storeid,userid,name,status,inputlist,attrpatamid,sort,attrcatid,paramstatus
export function fetchListss(data) {
  return request({
    url: '/sellerattr/submitAttrList',
    method: 'post',
    data
  })
}

// 跳转页面后 把数据还原上去
export function getProductAttr(attrpatamid) {
  return request({
    url: '/sellerattr/updateattr',
    method: 'post',
    data: {
      attrpatamid
    }
  })
}

// 删除属性列表 多选
export function deleteProductAttr(attrpatamid) {
  return request({
    url: '/sellerattr/delattr',
    method: 'post',
    data: {
      attrpatamid
    }
  })
}
