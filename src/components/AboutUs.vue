<template>
  <div>
    <ReturnHead head_name="关于我们"></ReturnHead>
    <div class="icon_box">
      <h1 :style="{color:'#FA6734',fontFamily:'FZ'}">{{MessageInfo.ptname}}</h1>
    </div>
    <mt-header title="" class="margin">
        <span slot="left">
          <span class="user_base">当前版本</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.edition}}&nbsp;&nbsp;<i class="lnr lnr-chevron-right"></i></span>
    </mt-header>
    <mt-header title="" class="margin">
        <span slot="left">
          <span class="user_base">官方网址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.wangzhan}}&nbsp;&nbsp;<i class="lnr lnr-chevron-right"></i></span>
    </mt-header>
    <mt-header title="" class="margin">
        <span slot="left">
          <span class="user_base">邮箱地址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.email}}&nbsp;&nbsp;<i class="lnr lnr-chevron-right"></i></span>
    </mt-header>
    <mt-header title="" class="margin">
        <span slot="left">
          <span class="user_base">联系地址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.pphone}}&nbsp;&nbsp;<i class="lnr lnr-chevron-right"></i></span>
    </mt-header>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'AboutUs',
    data(){
      return{
        MessageInfo:{
          ptname:"花团帮",
          edition:'1.0.0',
          wangzhan:'www.huatuanbang.com',
          email:'huatuanbang@163.com',
          pphone:'400-4000-4000'
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    created () {
      this.$http({method:"post",url:"/api/flower/about_us",data:{token:this.userInfo.token}})
        .then(
          res=>{
           if(res.data.code==200){
             console.log(res)
             this.MessageInfo=res.data.data
           }else {
             this.$toast(res.data.msg)
           }
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
  .icon_box{
    padding-top: 60px;
    padding-bottom: 80px;
    h1{
      font-size: 2rem;
      letter-spacing: 5px;
    }
  }
  .margin{
    margin: 0 1rem;
  }
  .mint-header {
    font-size: 0.95rem;
    font-weight: bold;
    background-color: #fff;
    padding: 0 0 5px;
    color: #333;
    border-bottom: 1px solid rgba(223, 223, 229, 1);
    margin: 1rem 1rem;
    .user_base {
      display: inline-block;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 1);
      padding-left: 1rem;
    }
    .user_base{
      padding-left: 0;
    }
  }
</style>
