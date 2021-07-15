// 表单验证
// 验证手机号码
export function checkPhoneNumber(rule, value, callback) {
  const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
  if (!value) {
    return callback(new Error('请填写手机号码！'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写正确的手机号码！'))
  }else{
    callback()
  }
}
// 导出
export default {
  checkPhone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
}
