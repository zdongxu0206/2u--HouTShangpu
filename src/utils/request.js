import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 引入vue-cookie存储cookie
import VueCookie from 'vue-cookie'
// create an axios instance
const service = axios.create({
  // 请求的api地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url run + request url
  // 修改上传图片的 action 值
  // baseURL: 'http://2utest.2uchat.cn/2umallanminapi', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 超时时间
  timeout: 15000 // request timeoutss1
})

// 全局请求拦截
service.interceptors.request.use(
  config => {
    // do something before request is sent
      // console.log(config);
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 需要改变的值  请求头
      // config.headers['X-Token'] = getToken()
      config.headers['access_token'] = getToken()
    }
     // 设置多语言
     if (VueCookie.get('DefaultLanguage')) {
      config.data['language'] = VueCookie.get('DefaultLanguage')
   } else {
     config.data['language'] = 'zh'
   }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject( error )
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    // if (res.returncode != 0) {
    //   Message({
    //     message: '抱歉,您所请求的资源无法找到,请稍后重试!',
    //     type: 'error',
    //     duration: 3 * 1000
    //   })
    // }
    // 判断token失效
    if (res.returncode == 400) {
      this.$alert('登录超时请重新登录', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({name:'login'}),
          this.$message({
            type: 'info',
            message: `操作成功`
          });
        }
      });
    }
      return res
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
