import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '@/components/Home'
import Order from '@/components/Order'
import FindFlower from '@/components/FindFlower'
import AboutUs from '@/components/AboutUs'
import PersonalCenter from '@/components/PersonalCenter'
import RegRouter from '../components/admin/Reg'
import LoginRouter from '../components/admin/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HomeRouter',
      component: HomeRouter
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/personalcenter',
      component: PersonalCenter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/aboutus',
      component: AboutUs,
    },
    {
      path: '/findflower',
      component: FindFlower,
    },
    {
      path: '/reg',
      name: 'RegRouter',
      component: RegRouter
    },
    {
      path: '/login',
      name: 'LoginRouter',
      component: LoginRouter
    },
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '*',
      redirect: '/home'
    }
  ]
})
