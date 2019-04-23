// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import xhr from './fun/RqAxios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/fonts/fontimport.css'
import BottomNav from './components/publicComponents/BottomNav'
import OrderTitle from './components/publicComponents/OrderTitle'
import ReturnHead from './components/publicComponents/ReturnHead'
import AddressChoice from './components/publicComponents/AddressChoice'
import OrderSearch from './components/publicComponents/orderSearch'
Vue.use(Mint)
Vue.component('BottomNav',BottomNav)
Vue.component('ReturnHead',ReturnHead)
Vue.component('OrderTitle',OrderTitle)
Vue.component('AddressChoice',AddressChoice)
Vue.component('OrderSearch',OrderSearch)
Vue.use(BottomNav)
Vue.use(ReturnHead)
Vue.use(OrderTitle)
Vue.use(AddressChoice)
Vue.use(OrderSearch)
Vue.config.productionTip = false
Vue.prototype.$http = xhr
/* eslint-disable no-new */
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.localStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.userInfo))
}
if (window.sessionStorage.activeIndex) {
  store.dispatch('setActiveIndex', window.sessionStorage.activeIndex)
}
if (window.sessionStorage.orderActiveIndex) {
  store.dispatch('setOrderActiveIndex', window.sessionStorage.orderActiveIndex)
}
if (window.sessionStorage.orderType) {
  store.dispatch('setOrderType', window.sessionStorage.orderType)
}
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo) {
      console.log(1)
      next()
    } else {
      Vue.$toast("您还未登录，请先登录")
  }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
