import request from '@/utils/request'
// 门店管理 店铺信息
export function shoplist(storeid) {
  return request({
    url: '/sysshopcontroller/shopdetails',
    method: 'post',
    data: {
      storeid
    }
  })
}
// 修改店铺资料
export function shopdetails(data) {
  return request({
    url: '/sysshopcontroller/updatecmsmallstore',
    method: 'post',
    data
  })
}
// 商铺类别
export function getbrandlist() {
  return request({
    url: '/sysbrand/getbrandlist',
    method: 'post',
    data:{

    }
  })
}
