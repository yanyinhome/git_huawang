<template>
  <div>
    <ReturnHead :head_name="head_name"></ReturnHead>
    <div class="account_box">
      <p class="account_title">账户余额</p>
      <p class="account_number">{{userInfo.account}}</p>
    </div>
    <div class="rechange_box">
      <p>提现金额</p>
      <div class="input_box">
        <span>￥</span><input type="text" v-model="GetCash.number" placeholder="可转出到卡500.00">
      </div>
    </div>
    <div class="bank_change_box">
      <img slot="icon" src="" width="auto" height="100%">
      <span class="title">{{BankMessage.name}}</span>
      <span class="go"><i class="fa fa-angle-right fa-lg"></i></span>
    </div>
    <div class="password_box">
      <span>安全密码</span><input type="password" placeholder="请输入安全密码">
    </div>
    <mt-button>
      确定提现
    </mt-button>
  </div>
</template>

<script>
  import {mapState} from  'vuex'
  export default {
    name: 'GetCash',
    data(){
      return{
        head_name:'提现到卡',
        GetCash:{
          type:"1",
          number:""
        },
        BankMessage:{
          name:'工商银行',
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style lang="scss" scoped>
  p{
    font-size: 0.91rem;
    text-align: left;
    font-weight: 600;
  }
  .account_box{
    padding: 0 15px;
    .account_number{
      font-size: 2rem;
      color: rgba(250, 103, 52, 1);
      margin-top: 0;
    }
  }
  .rechange_box{
    padding: 0 15px;
    .input_box{
      height: 3rem;
      line-height: 3rem;
      text-align: left;
      margin-bottom: 3rem;
      span{
        height: 3rem;
        line-height: 3rem;
        font-size: 2rem;
        vertical-align: middle;
        display: inline-block;
      }
      input{
        vertical-align: middle;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
        border: none;
        outline: none;
        box-sizing: border-box;
      }
    }
  }
  .bank_change_box{
    padding: 0 15px;
    text-align: left;
    margin: 1.4rem 0;
    height: 2rem;
    line-height: 2rem;
    box-sizing: border-box;
    .title{
      font-weight: bold;
      display: inline-block;
      vertical-align: middle;
    }
    .go{
      display: block;
      float: right;
      margin-right: 15px;
    }
  }
  .password_box{
    margin-bottom: 4rem;
    height: 3rem;
    line-height: 3rem;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    font-size: 1rem;
    span{
      font-weight: 600;
      padding: 0 15px;
    }
    input{
      font-size: 1.1rem;
      outline: none;
      border: none;
    }
  }
  .mint-button{
    background:rgba(250, 103, 52, 1);
    color: #fff;
    font-size: 1rem;
    width: 100%;
    border-radius:1.3rem ;
    height: 2.6rem;
  }
</style>
