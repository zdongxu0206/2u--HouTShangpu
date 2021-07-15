import request from '@/utils/request'
// 订单 退货原因  获取列表
export function fetchList(data) {
  return request({
    url: '/return/getReturnReason',
    method: 'post',
    data: {
      limit: data.pageSize,
      start: data.pageNum - 1,
      storeid:data.storeid
    }
  })
}
// 添加退货原因
export function addReason(data) {
  return request({
    url: '/return/addReturnReason',
    method: 'post',
    data
  })
}
// 删除退货原因
export function deleteReason(storeid,id) {
  return request({
    url: '/return/deReturnReason',
    method: 'post',
    data: {
      storeid,
      id
    }
  })
}
// 修改，编辑
export function updateReason(data) {
  return request({
    url: '/return/upReturnReason',
    method: 'post',
    data
  })
}
// 查询对应的数据
export function getReturninfo(id) {
  return request({
    url: '/return/getReturninfo',
    method: 'post',
    data:{
      id
    }
  })
}

