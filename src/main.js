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
import ReturnHead from './components/publicComponents/ReturnHead'
Vue.use(Mint)
Vue.component('BottomNav',BottomNav)
Vue.component('ReturnHead',ReturnHead)
Vue.use(BottomNav)
Vue.use(ReturnHead)
Vue.config.productionTip = false
Vue.prototype.$http = xhr
/* eslint-disable no-new */
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
  console.log(window.sessionStorage.userInfo)
  console.log(JSON.parse(window.sessionStorage.userInfo))
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo))
}
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo) {
      console.log(1)
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    console.log('ok')
  } else {
    console.log('error')
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
