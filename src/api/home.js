import request from '@/utils/request'
//  运费模版
export function fetchList(storeid) {
  return request({
    url: '/sellerhome/gethomecount',
    method: 'post',
    data: {
      storeid
    }
  })
}
// echars图表
export function loadordercount(data) {
  return request({
    url: '/sellerhome/loadordercount',
    method: 'post',
    data
  })
}
// a2u总金额
export function usera2ubalance(storeid,userid) {
  return request({
    url: '/sellerhome/usera2ubalance',
    method: 'post',
    data: {
      storeid,
      userid
    }
  })
}
