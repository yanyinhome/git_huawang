<template>
  <div>
    <ReturnHead head_name="安全中心"></ReturnHead>
    <div class="item_box">
      <div class="list_box" @click="go('/changeloadpassword')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">修改登录密码</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/setsafepassword')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">设置/修改安全密码</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SafeCenter',
    data(){
      return{}
    },
    methods:{
      go(path){
        this.$router.push({path:path})
      }
    }
  }
</script>

<style lang="scss" scoped>
.item_box{
  .list_box{
    padding: 0 15px;
    .mint-header{
      font-size: 0.95rem;
      background-color: #fff;
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .user_base{
        display: inline-block;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 1);
      }
      .right_icon{
        color: rgba(51, 51, 51, 1);
      }
    }
    .noborder{
      border-bottom: 0px;
    }
  }
}
</style>
