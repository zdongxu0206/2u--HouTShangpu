import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import VueCookie from 'vue-cookie'
// 引入element ui组件
import ElementUI from 'element-ui'
// element UI css文件
import 'element-ui/lib/theme-chalk/index.css'
// 使用 地区插件 v-distpicker
import VDistpicker from 'v-distpicker'

// 多语言
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
// 英文
import enLocale from 'element-ui/lib/locale/lang/en'
// 中文
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 土耳其语
import twLocale from 'element-ui/lib/locale/lang/tr-TR'
// 日语
import jaLocale from 'element-ui/lib/locale/lang/ja'
// 韩语
import koLocale from 'element-ui/lib/locale/lang/ko'

import '@/styles/index.scss' // global css

// 引入charts图表
import VCharts from 'v-charts'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(VueI18n)
Vue.use(ElementUI, { zhLocale });//默认使用中文
Vue.use(VueCookie)

// 使用echarts图表
Vue.use(VCharts)

// Vue.use(ElementUI)
// 注册使用 省市区选择器
Vue.component('v-distpicker', VDistpicker)

// InitLanguage  这里引入了vue-cookie,是为了将用户选择的语言存储到Cookie里，在以后访问站点不需要重新选择语言
function InitLanguage() {
  return Vue.cookie.get('DefaultLanguage') == null ? 'zh' : Vue.cookie.get('DefaultLanguage');
 }
 const i18n = new VueI18n({
   locale:  InitLanguage(), // 语言标识,默认汉语,先去cookie查找，如果存在并有效，cookie值即为默认语言类型；否则默认为中文简体
   messages: {
     'en': Object.assign(require("@/static/lang/en"),enLocale),
     'zh': Object.assign(require("@/static/lang/zh-CN"),zhLocale),
     'tr': Object.assign(require("@/static/lang/tr"),twLocale)
   }
 });
 locale.i18n((key, value) => i18n.t(key, value));
Vue.config.productionTip = false
//  禁止控制台打印和报错
//  console.log = function () {}
//  console.error = function () {}
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
