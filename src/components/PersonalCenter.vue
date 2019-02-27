<template>
  <div class="hello">
    <div class="info_box">
      <span class="info_user_name">{{userInfo.username}}</span>
      <img :src="userInfo.src" alt="">
      <div class="account_box">
        <span class="account_number">余额：<span class="number">{{userInfo.account}}</span></span>
        <mt-button>充值</mt-button>
        <mt-button>提现</mt-button>
      </div>
    </div>
    <div class="my_order_box">
      <div @click="go('/order')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_order"><i class="fa fa-list-ul"></i>&nbsp;&nbsp;我的订单</span>
        </span>
        <span slot="right"><i class="fa fa-angle-right"></i></span>
        </mt-header>
      </div>
    </div>
    <mt-header title="多个按钮">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
        <mt-button >关闭</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
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
        margin-top: 0.37rem;
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
    .mint-header{
      font-size: 1rem;
      background-color: #fff;
      padding: 0 10px 0;
      color: #000;
    }
    .user_base{
      display: inline-block;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 1);
      padding-left: 0.8rem;
    }
    .user_order{

    }
    .go{

    }
  }
</style>
