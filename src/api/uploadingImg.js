import request from '@/utils/request'
//  上传图片
export function inputfile(file) {
  return request({
    url: '/file/inputfile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: file
  })
}
