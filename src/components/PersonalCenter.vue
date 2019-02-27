<template>
  <div class="hello">
    <div class="info_box">
      <span class="info_user_name">{{userInfo.username}}</span>
      <img :src="userInfo.src" alt="">
      <div class="account_box">
        <span class="account_number">余额：<span class="number">{{userInfo.account}}</span></span>
        <mt-button @click="go('/rechange')">充值</mt-button>
        <mt-button @click="go('/getcash')">提现</mt-button>
      </div>
    </div>
    <div class="my_order_box">
      <div class="list_box" @click="go('/order')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_order">我的订单</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
        </mt-header>
      </div>
    </div>
    <div class="list_box" @click="go('/xiadan')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">我要下单</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box" @click="go('/renzheng')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_renzheng">认证花店</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box" @click="go('/accounts')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_account">账户设置</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box" @click="go('/caiwu')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_caiwu">财务管理</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box" @click="go('/huashimessage')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_zixun">花市咨询</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box" @click="go('/askprice')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_wenjia">匿名问价</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="list_box no_line" @click="go('/aboutus')">
      <mt-header title="">
        <span slot="left">
          <span class="user_base user_aboutus">关于我们</span>
        </span>
        <span class="right_icon" slot="right"><i class="fa fa-angle-right fa-lg"></i></span>
      </mt-header>
    </div>
    <div class="margin"></div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>import {mapState,mapActions} from  'vuex'
export default {
  name: 'PersonalCenter',
  data () {
    return {
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    ...mapActions(['setUserInfo']),
    go(path="/"){
      this.$router.push({path:path})
    }
  },
  created () {
    console.log(this.userInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    .info_box{
      position: relative;
      height: 10rem;
      padding: 4rem 0.8rem 0rem;
      margin-bottom: 2rem;
      box-sizing: border-box;
      text-align: left;
      background: url("../assets/img/personal_center_bg.png") no-repeat center/100% 100%;
      .info_user_name{
        font-size: 1.4rem;
        color: #fff;
        height: 2.35rem;
        line-height: 2.35rem;
      }
      img{
        position: absolute;
        right: 2rem;
        width: 2.35rem;
        height: 2.35rem;
        border-radius: 50%;
        border: 2px solid #fff;
      }
      .account_box{
        border-radius: 8px;
        background: #fff;
        height: 3.5rem;
        position: absolute;
        top:7.5rem;
        width: calc(100% - 1.6rem);
        box-sizing: border-box;
        padding: 1rem;
        font-size: 0.9rem;
        .account_number{
          padding-left: 2rem;
          background: url("../assets/img/personalcenter_account_logo.png") no-repeat left/1.1rem 1.1rem;
          margin-right: 2rem;
          .number{
            color: rgba(250, 103, 52, 1);
          }
        }
        .mint-button{
          height: 1.7rem;
          font-size: 0.82rem;
          color: #fff;
          background-color: rgba(250, 103, 52, 1);
          margin-right: 1rem;
          border-radius: 0.85rem;
        }
      }
    }
    .list_box{
      padding: 0 1.5rem;
      margin: 10px 0;
    }
    .mint-header{
      font-size: 0.95rem;
      background-color: #fff;
      padding: 0 0 5px;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .user_base{
        display: inline-block;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 1);
        padding-left: 2.3rem;
      }
      .user_order{
        background: url("../assets/img/personal_order.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_setorder{
        background: url("../assets/img/personal_xiadan.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_renzheng{
        background: url("../assets/img/personal_renzheng.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_account{
        background: url("../assets/img/personal_account.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_caiwu{
        background: url("../assets/img/personal_caiwu.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_zixun{
        background: url("../assets/img/personal_message.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_wenjia{
        background: url("../assets/img/personal_wenjia.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .user_aboutus{
        background: url("../assets/img/personal_aboutus.png") no-repeat 5px/1.3rem 1.3rem;
      }
      .right_icon{
        color: rgba(51, 51, 51, 1);
      }
    }
    .no_line{
      .mint-header{
        border-bottom: none;
      }
    }
    .margin{
      height: 4rem;
    }
  }
</style>
