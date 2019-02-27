import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '@/components/Home'
import Order from '@/components/Order'
import FindFlower from '@/components/FindFlower'
import AboutUs from '@/components/AboutUs'
import PersonalCenter from '@/components/PersonalCenter'
import AskPrice from '@/components/AskPrice'
import HuaShiMessage from '@/components/HuaShiMessage'
import RenZheng from '@/components/RenZheng'
import RegRouter from '../components/admin/Reg'
import LoginRouter from '../components/admin/Login'
import CaiWu from '../components/bank/CaiWu'
import XiaDan from '../components/order/XiaDan'
import Accounts from '../components/accounts/Accounts'
import GetCash from '../components/accounts/GetCash'
import ReChange from '../components/accounts/ReChange'

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
      path: '/caiwu',
      component: CaiWu,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rechange',
      component: ReChange,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/getcash',
      component: GetCash,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/renzheng',
      component: RenZheng,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/accounts',
      component: Accounts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/xiadan',
      component: XiaDan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/aboutus',
      component: AboutUs,
    },
    {
      path: '/askprice',
      component: AskPrice,
    },
    {
      path: '/huashimessage',
      component: HuaShiMessage,
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
