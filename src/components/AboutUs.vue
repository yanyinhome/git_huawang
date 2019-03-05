<template>
  <div>
    <ReturnHead head_name="关于我们"></ReturnHead>
    <div class="icon_box">
      <h1 :style="{color:'red'}">花团帮</h1>
    </div>
    <mt-header title="">
        <span slot="left">
          <span class="user_base">当前版本</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.version}}&nbsp;&nbsp;<i class="fa fa-angle-right fa-lg"></i></span>
    </mt-header>
    <mt-header title="">
        <span slot="left">
          <span class="user_base">官方网址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.netAddress}}&nbsp;&nbsp;<i class="fa fa-angle-right fa-lg"></i></span>
    </mt-header>
    <mt-header title="">
        <span slot="left">
          <span class="user_base">邮箱地址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.email}}&nbsp;&nbsp;<i class="fa fa-angle-right fa-lg"></i></span>
    </mt-header>
    <mt-header title="">
        <span slot="left">
          <span class="user_base">联系地址</span>
        </span>
      <span class="right_icon" slot="right">{{MessageInfo.phone}}&nbsp;&nbsp;<i class="fa fa-angle-right fa-lg"></i></span>
    </mt-header>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
  export default {
    name: 'AboutUs',
    data(){
      return{
        MessageInfo:{
          version:'1.0.0',
          netAddress:'www.huatuanbang.com',
          email:'huatuanbang@163.com',
          phone:'400-4000-4000'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mint-header {
    font-size: 0.95rem;
    font-weight: bold;
    background-color: #fff;
    padding: 0 0 5px;
    color: #333;
    border-bottom: 1px solid rgba(223, 223, 229, 1);
    margin: 1rem 0;
    .user_base {
      display: inline-block;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 1);
      padding-left: 2.3rem;
    }
  }
</style>
