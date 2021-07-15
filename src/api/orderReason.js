import request from '@/utils/request'
// 订单 退货申请处理  获取列表
export function fetchList(data) {
  return request({
    url: '/return/getReturnOrder',
    method: 'post',
    data: {
      limit: data.pageSize,
      start: data.pageNum - 1,
      storeid: data.storeid,
      returnid: data.returnid,
      status: data.status,
      createtime: data.createtime,
      handleuser: data.handleuser,
      handletime:data.handletime
    }
  })
}
// 退货原因详情 列表
export function returnOrderInfo(returnid) {
  return request({
    url: '/return/returnOrderInfo',
    method: 'post',
    data: {
      returnid
    }
  })
}
// 确认 退货
export function updateApplyStatu(returnid) {
  return request({
    url: '/return/returnOrder',
    method: 'post',
    data: {
      returnid
    }
  })
}
// 修改收地址
export function updadeReturnOrder(data) {
  return request({
    url: '/return/updadeReturnOrder',
    method: 'post',
    data
  })
}
// 拒绝收获
export function refuseOrder(returnid) {
  return request({
    url: '/return/refuseOrder',
    method: 'post',
    data:{
      returnid
    }
  })
}
