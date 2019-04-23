<template>
  <div class="hello">
    <div class="info_box" :class="{unload:!userInfo.token}">
      <template v-if="userInfo.token">
        <span class="info_user_name">{{userInfo.username}}</span>
        <img :src="userInfo.headimg?userInfo.headimg:defaultimg" alt="">
      </template>
      <template v-if="!userInfo.token">
        <p class="info_p">欢迎来到花团帮~</p>
        <div class="load_box"><p @click="run('/login')"><span>登录</span>/<span>注册</span></p></div>
      </template>
      <div class="account_box">
        <span class="account_number">余额：<span class="number">{{userInfo.money?userInfo.money:'0.00'}}</span></span>
        <mt-button @click="go('/rechange')">充值</mt-button>
        <mt-button @click="go('/getcash')">提现</mt-button>
      </div>
    </div>
    <div class="my_order_box" :class="{showmargin:showState}">
      <div class="list_box" @click="showList()">
        <div @click="goOrder()" >
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_order">我的订单</span>
        </span>
            <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
          </mt-header>
        </div>
        <div class="order_nav_box"  v-show="showState">
          <div class="item recive" @click="go('/orderwaitsend')">接单管理</div>
          <div class="item send" @click="go('/XiaWaitSend')">下单管理</div>
        </div>
      </div>
    </div>
    <div class="list_bg">
      <div class="list_box" @click="go('/addorders')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">我要下单</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/renzheng')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_renzheng">认证花店</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/accounts')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_account">账户设置</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/caiwu')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_caiwu">财务管理</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/black')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_black">黑名单管理</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <!--<div class="list_box" @click="go('/huashimessage')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_zixun">花市咨询</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>-->
      <div class="list_box" @click="go('/askprice')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_wenjia">匿名问价</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box no_line" @click="go('/aboutus')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_aboutus">关于我们</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
    </div>
    <div class="margin"></div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import {mapState,mapActions} from  'vuex'
export default {
  name: 'PersonalCenter',
  data () {
    return {
      showState:true,
      defaultimg:require('../assets/img/shop_card.png')
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    ...mapActions(['setUserInfo','setOrderType','setActiveIndex','setOrderActiveIndex']),
    //我的订单点击
    goOrder(){
      this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
        .then(
          res=>{
            if(res.data.code==200){
              if(res.data.data.is_fl==1){
                this.setOrderActiveIndex(0)
                this.setOrderType(1)
                this.$router.push({path:'/orderwaitsend'});
                this.setActiveIndex(1)
              }else {
                this.setOrderActiveIndex(0)
                this.setOrderType(2)
                this.$router.push({path:'/XiaWaitSend'});
                this.setActiveIndex(1)
              }
            }else {
              this.$toast(res.data.msg)
              this.setOrderType(2)
              this.setActiveIndex(0)
            }
          }
        )
    },
    run(path){
      this.$router.push({path:path})
    },
    go(path="/"){
      if(this.userInfo.token){
        if(path=='/XiaWaitSend'){
          this.setOrderType(2)
          this.setActiveIndex(1)
        }
        if(path=='/orderwaitsend'){
          this.setOrderType(1)
          this.setActiveIndex(1)
        }
        this.$router.push({path:path})
      }else {
        // this.$toast("您还没有登录，请先登录")
      }
    },
    showList(){
      //this.showState=!this.showState
    }
  },
  created () {
    if(this.userInfo.token){
      this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
        .then(
          res=>{
            console.log(res)
            if(res.data.code==200){
              console.log(res)
              this.setUserInfo(Object.assign({},this.userInfo,res.data.data))
            }else {
              this.setUserInfo({})
              this.$toast(res.data.msg)
            }
          }
        ).catch(
          err=>{
            this.$toast({message:"登录已过期，请重新登录",duration:1000})
            this.setUserInfo({})
          }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    background: rgba(242, 243, 245, 1);
    .my_order_box{
      background: #ffffff;
      margin: 0 1rem;
      border-radius: 8px;
      .list_box{
        padding: 5px 15px 0;
        .order_nav_box{
          overflow: hidden;
          padding: 1rem ;
          box-sizing: border-box;
          .item{
            text-align: center;
            box-sizing: border-box;
            padding-top: 2.5rem;
            height: 4rem;
            float: left;
            width: 50%;
          }
          .recive{
            background: url("../assets/img/personal_center_recive.png") no-repeat center top/2rem 2rem;
          }
          .send{
            background: url("../assets/img/personal_center_send.png") no-repeat center top/2rem 2rem;
          }
          .item:first-child{
            border-right: 1px solid rgba(223, 223, 229, 1);
          }
        }
      }
    }
    .showmargin{
      margin-bottom: 10px;
    }
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
      .info_p{
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      .load_box{
        margin-top: 0.5rem;
        p{
          color: rgba(53, 66, 54, 1);
          width: 30%;
          background: #ffffff;
          height: 2rem;
          line-height: 2rem;
          border-radius: 1rem;
          margin: 0 auto;
          text-align: center;
          font-size: 0.9rem;
        }
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
        padding: 15px;
        font-size: 0.9rem;
        .account_number{
          padding-left: 2rem;
          background: url("../assets/img/personalcenter_account_logo.png") no-repeat left/1.1rem 1.1rem;
          margin-right: 1rem;
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
    .unload{
      padding: 2.8rem 0.8rem 0rem;
    }
    .list_bg{
      background: #fff;
      border-radius: 8px;
      margin: 0 1rem;
    }
    .list_box{
      padding: 5px 15px 0;
      .order_nav_box{
        overflow: hidden;
        padding: 1rem ;
        box-sizing: border-box;
        .item{
          box-sizing: border-box;
          height: 3rem;
          float: left;
          width: 50%;
        }
        .item:first-child{
          border-right: 1px solid rgba(223, 223, 229, 1);
        }
      }
    }
    .mint-header{
      font-size: 0.95rem;
      background-color: #fff;
      padding: 0 0 5px;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .mint-header-button{
        span{
          height: 1.3rem;
          line-height: 1.3rem;
        }
      }
      .user_base{
        display: inline-block;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 1);
        padding-left: 2.3rem;
      }
      .user_order{
        background: url("../assets/img/personal_order.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_setorder{
        background: url("../assets/img/personal_xiadan.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_renzheng{
        background: url("../assets/img/personal_renzheng.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_account{
        background: url("../assets/img/personal_account.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_caiwu{
        background: url("../assets/img/personal_caiwu.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_black{
        background: url("../assets/img/personal_black.png") no-repeat 3px/1.3rem 1.3rem;
      }
      .user_zixun{
        background: url("../assets/img/personal_message.png") no-repeat 3px/1.3rem 1.3rem;
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
      height: 8rem;
    }
  }
</style>
