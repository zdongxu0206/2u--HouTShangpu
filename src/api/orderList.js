import request from '@/utils/request'
//  订单 订单列表
export function fetchList(data) {
  return request({
    url: '/sellerorder/selectOrderList',
    method: 'post',
    data
  })
}
// 删除订单
export function deleteOrder(storeid,orderidlist) {
  return request({
    url: '/sellerorder/deleteOrder',
    method: 'post',
    data: {
      storeid,
      orderidlist
    }
  })
}
//  关闭订单
export function downOrder(data) {
  return request({
    url: '/sellerorder/downOrder',
    method: 'post',
    data
  })
}
// 取消订单
export function cancelOrder(data) {
  return request({
    url: '/sellerorder/cancelOrder',
    method: 'post',
    data
  })
}
// 获取订单详情
export function getOrderDetail(orderid) {
  return request({
    url: '/sellerorder/orderInfo',
    method: 'post',
    data: {
      orderid
    }
  })
}
// 获取订单总额
export function ordersum(data) {
  return request({
    url: '/sellerorder/ordersum',
    method: 'post',
    data
  })
}
// 获取订单总收入
export function ordercount(data) {
  return request({
    url: '/sellerorder/ordercount',
    method: 'post',
    data
  })
}
//修改收货地址 修改收货人信息
export function updateReceiverInfo(data) {
  return request({
    url: '/sellerorder/updatervcInfo',
    method: 'post',
    data
  })
}
// 添加订单备注
export function updateOrderRemark(data) {
  return request({
    url: '/sellerorder/updateOrderRemark',
    method: 'post',
    data
  })
}
// 加载快递公司
export function loadshipcompanylist() {
  return request({
    url: '/sellerorder/loadshipcompanylist',
    method: 'post',
    data:{}
  })
}
// 获取物流类型配置  点击支持的快递公司时出来业务类型的东西
export function loadlogisticsexptype(shipper_code) {
  return request({
    url: '/sellerorder/loadlogisticsexptype',
    method: 'post',
    data: {
      shipper_code
    }
  })
}
// 获取预约取件支持的快递公司
export function loadshipdata(loadshipdata) {
  return request({
    url: '/sellerorder/loadshipdata',
    method: 'post',
    data:{
      loadshipdata
    }
  })
}
// 获取预约取件 传送数据预约取件  后面三个是对象
export function pickupapporintment(storeid,orderid,pickupbean,receiver,sender) {
  return request({
    url: '/sellerorder/pickupapporintment',
    method: 'post',
    data: {
      storeid,
      orderid,
      pickupbean,
      receiver,
      sender
    }
  })
}
// 取消预约  获取预约取件之后返回的id
export function cancelpickupappointement(orderid) {
  return request({
    url: '/sellerorder/cancelpickupappointement',
    method: 'post',
    data: {
      orderid
    }
  })
}
//订单物流状态查询
export function ordership(orderid) {
  return request({
    url: '/sellerorder/ordership',
    method: 'post',
    data: {
      orderid
    }
  })
}
//订单发货
export function deliveryOrder(data) {
  return request({
    url: '/sellerorder/orderdeliver',
    method: 'post',
    data
  })
}
//发货列表
export function deliverList(orderid) {
  return request({
    url: '/sellerorder/deliverList',
    method: 'post',
    data: {
      orderid
    }
  })
}
// 初始化获取收件人，寄件,收件人信息
export function initializeList(storeid,orderid) {
  return request({
    url: '/sellerorder/initpickdata',
    method: 'post',
    data: {
      storeid,
      orderid
    }
  })
}
