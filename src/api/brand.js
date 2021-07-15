import request from '@/utils/request'
//  商品 品牌管理
export function fetchList(prdbrandname) {
  return request({
    url: '/sysbrand/getbrandlist',
    method: 'post',
    data:{
      prdbrandname
    }
  })
}
// 删除
export function handleDelete(id,userid) {
  return request({
    url: '/sysbrand/delbrand',
    method: 'post',
    data:{
      id,
      userid
    }
  })
}
// 添加,修改
export function updateShowStatus(data) {
  return request({
    url: '/sysbrand/submitInfoBrands',
    method: 'post',
    data
  })
}

// 查看品牌详情
export function particulars(id,userid) {
  return request({
    url: '/sysbrand/updatebrand',
    method: 'post',
    data:{
      id,
      userid
    }
  })
}
// 批量显示隐藏品牌
export function handleBatchOperates(ids,status) {
  return request({
    url: '/sysbrand/displaybrand',
    method: 'post',
    data: {
      ids,
      status
    }
  })
}
