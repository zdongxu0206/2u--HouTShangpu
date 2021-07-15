import request from '@/utils/request'

// 提现列表
export function fetchList(data) {
  return request({
    url: '/sellerwallet/loadWalletOrder',
    method: 'post',
    data: {
      limit: data.limit ,
      start: data.start- 1,
      storeid: data.storeid,
      accounttype: data.accounttype,
      amtcurrency: data.amtcurrency,
      orderstatus: data.orderstatus,
      accountname: data.accountname,
      account: data.account,
    }
  })
}
// 查询币种的余额
export function getWalletList(storeid) {
  return request({
    url: '/sellerwallet/getWalletList',
    method: 'post',
    data:{
      storeid,
    }
  })
}
// 查询币种的余额
export function getStoreidAccount(accounttype,storeid) {
  return request({
    url: '/sellerwallet/getStoreidAccount',
    method: 'post',
    data: {
      accounttype,
      storeid,
    }
  })
}
// 提交提现订单
export function submitCash(data) {
  return request({
    url: '/sellerwallet/submitCash',
    method: 'post',
    data
  })
}
// 取消提现订单
export function cancelOrder(orderid,storeid) {
  return request({
    url: '/sellerwallet/cancelOrder',
    method: 'post',
    data: {
      orderid,
      storeid
    }
  })
}
// 查询体现过的每一条历史列表
export function walletRecord(data) {
  return request({
    url: '/sellerwallet/walletRecord',
    method: 'post',
    data
  })
}

