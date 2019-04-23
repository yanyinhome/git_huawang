import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '@/components/Home'
import Order from '@/components/Order'
import FindFlower from '@/components/FindFlower'
import AboutUs from '@/components/AboutUs'
import black from '@/components/black'
import PersonalCenter from '@/components/PersonalCenter'
import AskPrice from '@/components/AskPrice'
import HuaShiMessage from '@/components/HuaShiMessage'
import RenZheng from '@/components/RenZheng'
import flowerShopDetail from '@/components/flowerShopDetail'
import AskPriceDetail from '@/components/AskPriceDetail'
import AskPriceAddQuesion from '@/components/AskPriceAddQuesion'
import RegRouter from '../components/admin/Reg'
import LoginRouter from '../components/admin/Login'
import LostPass from '../components/admin/LostPass'
import RegSuc from '../components/admin/RegSuc'
import CaiWu from '../components/bank/CaiWu'
import WriteOrders from '../components/order/WriteOrders'
import WattingOders from '../components/order/WattingOders'
import OrderDetail from '../components/order/OrderDetail'
import AddPrice from '../components/order/AddPrice'
import XiaDan from '../components/order/XiaDan'
import OrderWaitSend from '../components/order/OrderWaitSend'
import OrderComplete from '../components/order/OrderComplete'
import AfterSale from '../components/order/AfterSale'
import OrderSending from '../components/order/OrderSending'
import OrderCancel from '../components/order/OrderCancel'
import XiaWaitSend from '../components/order/XiaWaitSend'
import XiaSending from '../components/order/XiaSending'
import XiaCancel from '../components/order/XiaCancel'
import XiaComplete from '../components/order/XiaComplete'
import ApplyRefund from '../components/order/ApplyRefund'
import RefuseRefund from '../components/order/RefuseRefund'
import RefundDetail from '../components/order/RefundDetail'
import Detail from '../components/order/Detail'
import XiaAfterSale from '../components/order/XiaAfterSale'
import Accounts from '../components/accounts/Accounts'
import GetCash from '../components/accounts/GetCash'
import SetSafePassword from '../components/accounts/SetSafePassword'
import ChangeLoadPassword from '../components/accounts/ChangeLoadPassword'
import SafeCenter from '../components/accounts/SafeCenter'
import ChangeWX from '../components/accounts/ChangeWX'
import ChangeZFB from '../components/accounts/ChangeZFB'
import ChangeBankCard from '../components/accounts/ChangeBankCard'
import ChangePersonalMessage from '../components/accounts/ChangePersonalMessage'
import ChangeUserName from '../components/accounts/ChangeUserName'
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
      component: Order,
      children:[
        {
          path:"/",
          component:OrderWaitSend
        },
        {
          path:"/orderwaitsend",
          name:'OrderWaitSend',
          component:OrderWaitSend
        },
        {
          path:"/OrderCancel",
          name:'OrderCancel',
          component:OrderCancel
        },
        {
          path:"/ordersending",
          name:'OrderSending',
          component:OrderSending
        },
        {
          path:"/OrderComplete",
          name:'OrderComplete',
          component:OrderComplete
        },
        {
          path:"/aftersale",
          name:'AfterSale',
          component:AfterSale
        },
        {
          path:"/XiaWaitSend",
          name:'XiaWaitSend',
          component:XiaWaitSend
        },
        {
          path:"/XiaCancel",
          name:'XiaCancel',
          component:XiaCancel
        },
        {
          path:"/XiaSending",
          name:'XiaSending',
          component:XiaSending
        },
        {
          path:"/XiaComplete",
          name:'XiaComplete',
          component:XiaComplete
        },
        {
          path:"/XiaAfterSale",
          name:'XiaAfterSale',
          component:XiaAfterSale
        },
      ]
    },
    {
      path: '/getorders',
      name: 'WattingOders',
      component: WattingOders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/flowershopdetail',
      name: 'flowerShopDetail',
      component: flowerShopDetail
    },
    {
      path: '/addorders',
      name: 'WriteOrders',
      component: WriteOrders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/refuserefund',
      name: 'RefuseRefund',
      component: RefuseRefund
    },
    {
      path: '/addprice',
      name: 'AddPrice',
      component: AddPrice
    },
    {
      path: '/applyrefund',
      name: 'ApplyRefund',
      component: ApplyRefund
    },
    {
      path: '/refunddetail',
      name: 'RefundDetail',
      component: RefundDetail
    },
    {
      path: '/personalcenter',
      component: PersonalCenter,
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
      path: '/setsafepassword',
      component: SetSafePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changeloadpassword',
      component: ChangeLoadPassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changeusername',
      component: ChangeUserName,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changewx',
      component: ChangeWX,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/safecenter',
      component: SafeCenter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changezfb',
      component: ChangeZFB,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changebankcard',
      component: ChangeBankCard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changepersonalmessage',
      component: ChangePersonalMessage,
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
<<<<<<< HEAD
      path: '/black',
      component: black,
    },
    {
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
      path: '/askprice',
      component: AskPrice,
    },
    {
<<<<<<< HEAD
      path: '/askpricedetail',
      component: AskPriceDetail,
    },
    {
      path: '/askpriceaddquesion',
      component: AskPriceAddQuesion,
    },
    {
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
      path: '/huashimessage',
      component: HuaShiMessage,
    },
    {
      path: '/findflower',
      component: FindFlower,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reg',
      name: 'RegRouter',
      component: RegRouter
    },
    {
      path: '/regsuc',
      name: 'RegSuc',
      component: RegSuc
    },
    {
      path: '/lost',
      name: 'LostPass',
      component: LostPass
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
