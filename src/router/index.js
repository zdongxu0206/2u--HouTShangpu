import Vue from 'vue'
import Router from 'vue-router'
// 多语言
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
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

import VueCookie from 'vue-cookie'
Vue.use(VueI18n)
Vue.use(ElementUI, { zhLocale });//默认使用中文
Vue.use(VueCookie)
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
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
locale.i18n((key, value) => i18n.t(key, value));//为了之后将element-ui组件本地化 使用

export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

// 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: i18n.t("LOCALIZATION.HOME"), icon: 'el-icon-reading' }
    }]
  },
]
export const asyncRoutes = [

  // 商品 商品列表 添加商品 商品分类 商品类型 品牌管理 运费模版
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/list',
    name: 'commodity',
    meta: { title: i18n.t("LOCALIZATION.MANAGEMENT"), icon: 'el-icon-goods' },
    children: [
      {
        // 商品列表
        path: 'list',
        name: 'list',
        component: () => import('@/views/commodity/list/index'),
        meta: { title: i18n.t("LOCALIZATION.PRODUCTLIST"), icon: 'el-icon-tickets' }
      },
      {
        path: 'updateProduct',
        component: () => import('@/views/commodity/list/update'),
        name: 'updateProduct',
        meta: {title: i18n.t("LOCALIZATION.MODIFYGOODS")},
        hidden: true
      },
         // 商品分类
         {
          path: 'classify',
          name: 'classify',
          component: () => import('@/views/commodity/classify/index'),
          meta: { title: i18n.t("LOCALIZATION.GOODSCATEGORY"), icon: 'el-icon-coin' }
        },
      // 添加商品
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/commodity/list/add'),
        meta: { title: i18n.t("LOCALIZATION.ADDGOODS"), icon: 'el-icon-circle-plus-outline' }
      },
      // 查看商品
      {
        path: 'particularX',
        name: 'particularX',
        component: () => import('@/views/commodity/list/particularX'),
        meta: { title: i18n.t("LOCALIZATION.CHECKGOODS") },
        hidden: true
      },
      // 添加商品分类
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/commodity/classify/add'),
        meta: {title: i18n.t("LOCALIZATION.ADDPRODUCTCATEGORIES")},
        hidden: true
      },
      // 修改商品分类
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/commodity/classify/update'),
        meta: {title: i18n.t("LOCALIZATION.COMMODITYCLASSIFICATION")},
        hidden: true
      },
      // 商品规格
      {
        path: 'type',
        name: 'type',
        component: () => import('@/views/commodity/type/index'),
        meta: { title: i18n.t("PRODUCTLIST.SPECIFICATION"), icon: 'el-icon-guide' }
      },
      //  商品规格/编辑
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/commodity/type/productAttrList'),
        meta: {title: i18n.t("FORM.IFICAGOODS")},
        hidden: true
      },
      // 添加商品规格
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/commodity/type/addProductAttr'),
        meta: {title: i18n.t("LOCALIZATION.ADDPRODUCT")},
        hidden: true
      },
      // 修改商品属性
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/commodity/type/updateProductAttr'),
        meta: {title: i18n.t("LOCALIZATION.PRODUCTATTRIBUTES")},
        hidden: true
      },
      // 运费模版
      {
        path: 'freight',
        name: 'freight',
        component: () => import('@/views/commodity/freight/index'),
        meta: { title: i18n.t("LOCALIZATION.FREIGHTTEMPLATE"), icon: 'el-icon-truck' }
      },
      // 添加运费
      {
        path: 'addFreight',
        name: 'addFreight',
        component: () => import('@/views/commodity/freight/addFreight'),
        meta: { title:i18n.t("LOCALIZATION.ADDSHIPPING")},
        hidden:true,
      },
      // 修改运费
      {
        path: 'compileFreight',
        name: 'compileFreight',
        component: () => import('@/views/commodity/freight/compileFreight'),
        meta: { title:i18n.t("LOCALIZATION.HIPPINGTEMPLATE") },
        hidden:true,
      },
    ]
  },
  // 订单  订单列表 订单设置 退货申请处理 退货原因设置
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: {title: i18n.t("LOCALIZATION.ORDERMANAGEMENT") ,icon: 'el-icon-office-building'},
    children: [
      // 订单列表
      {
        path: 'list',
        component: () => import('@/views/order/list/index'),
        name: 'list',
        meta: { title: i18n.t("LOCALIZATION.ORDERLIST") , icon: 'el-icon-tickets'},
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/order/list/orderDetail'),
        name: 'orderDetail',
        meta: { title: i18n.t("LOCALIZATION.ORDERDETAILS"), icon: 'table' },
        hidden:true
      },
      {
        path: 'bookPick',
        component: () => import('@/views/order/list/bookPick'),
        name: 'bookPick',
        meta: { title: i18n.t("LOCALIZATION.PICKUP"), icon: 'table' },
        hidden:true
      },
      {
        path: 'deliverOrderList',
        component: () => import('@/views/order/list/deliverOrderList'),
        name: 'deliverOrderList',
        meta: { title: i18n.t("LOCALIZATION.SHIPMENT"), icon: 'table' },
        hidden:true
      },
      // 退货申请处理
      {
        path: 'apply',
        component: () => import('@/views/order/apply/index'),
        name: 'apply',
        meta: { title: i18n.t("LOCALIZATION.RETURNAPPLICATION"), icon: 'el-icon-school' }
      },
      // 退货原因设置
      {
        path: 'cause',
        component: () => import('@/views/order/apply/reason'),
        name: 'cause',
        meta: { title: i18n.t("LOCALIZATION.FORRETURNING"), icon: 'el-icon-connection' }
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/order/apply/applyDetail'),
        meta: {title: i18n.t("LOCALIZATION.REASONSFOR")},
        hidden:true
      }
    ]
  },

  // 门店  店铺信息 门店装修
  {
    path: '/storemanager',
    component: Layout,
    redirect: '/storemanager/storeinfo',
    name: 'storemanager',
    meta: { title:i18n.t("LOCALIZATION.STOREMANAGEMENT"),icon: 'el-icon-s-home'},
    children: [
      // 店铺信息
      {
        path: 'storeinfo',
        component: () => import('@/views/storemaneger/storeinfo/index'), // Parent router-view
        name: 'storeinfo',
        meta: { title: i18n.t("LOCALIZATION.QWSTOREINFORMATIONEQW") , icon: 'el-icon-table-lamp'},
      },
      // 门店装修
      {
        path: 'storefitup',
        component: () => import('@/views/storemaneger/storefitup/index'),
        name: 'storefitup',
        meta: { title: i18n.t("LOCALIZATION.STOREDECORATION") , icon: 'el-icon-d-arrow-right'}
      },

    ]
  },
  // 财务  提现订单 申请提现
  {
    path: '/financemanager',
    component: Layout,
    redirect: '/financemanager/list',
    name: 'financemanager',
    meta: {title: i18n.t("LOCALIZATION.FINANCIALMANAGEMENT"),icon: 'el-icon-s-data'},
    children: [
      // 提现订单
      {
        path: 'list',
        component: () => import('@/views/financemanager/list/index'),
        name: 'list',
        meta: { title: i18n.t("LOCALIZATION.WITHDRAWALORDER") , icon: 'el-icon-refresh-right'},
      },
      // 申请提现
      {
        path: 'walletwithdrawal',
        component: () => import('@/views/financemanager/list/walletwithdrawal'),
        name: 'walletwithdrawal',
        meta: { title: i18n.t("LOCALIZATION.WITHDRAWALFOR") , icon: 'el-icon-bank-card'},
      },
      // 钱包流水
      {
        path: 'thewater',
        component: () => import('@/views/financemanager/list/thewater'),
        name: 'thewater',
        meta: { title: i18n.t("LOCALIZATION.THEWATER") },
        hidden: true,
      },
    ]
  },

  // 404页面
  { path: '*', redirect: '/404', hidden: true }
]


// let luyou = constantRoutes.concat(asyncRoutes);

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
