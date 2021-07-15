import request from '@/utils/request'
// 订单 订单设置  获取事件
export function getOrderSetting(storeid) {
  return request({
    url: '/return/getReturnReason',
    method: 'post',
    data: {
      storeid
    }
  })
}
//
export function updateOrderSetting(storeid) {
  return request({
    url: '/return/getReturnReason',
    method: 'post',
    data: {
      storeid
    }
  })
}
