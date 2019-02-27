<template>
  <div>
    <ReturnHead head_name="账户充值"></ReturnHead>
    <div class="account_box">
      <p class="account_title">账户余额</p>
      <p class="account_number">{{userInfo.account}}</p>
    </div>
    <div class="rechange_box">
      <p>充值金额</p>
      <div class="input_box">
        <span>￥</span><input type="text" v-model="ReChange.number" placeholder="请输入充值金额">
      </div>
    </div>
    <div class="zf_box">
      <label :class="{active:ReChange.type==1}" for="type1"><span class="ZFB">支付宝钱包支付</span></label><input @change="show" v-show="false" type="radio" id="type1" value="1" name="ZhiFU" v-model="ReChange.type">
      <label :class="{active:ReChange.type==2}" for="type2"><span class="WX">微信钱包支付</span></label><input @change="show" v-show="false" type="radio" id="type2" value="2" name="ZhiFU" v-model="ReChange.type">
    </div>
    <mt-button>
      立即充值
    </mt-button>
  </div>
</template>

<script>
  import {mapState} from  'vuex'
  export default {
    name: 'ReChange',
    data(){
      return{
        ReChange:{
          type:"1",
          number:""
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      show(){
        console.log(this.ReChange)
      }
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
      input::-webkit-input-placeholder{
        color:rgba(181, 181, 191, 1);
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:rgba(181, 181, 191, 1);
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:rgba(181, 181, 191, 1);
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:rgba(181, 181, 191, 1);
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
  .zf_box{
    padding: 0 15px;
    label{
      display: inline-block;
      width: 48%;
      height: 3rem;
      box-sizing: border-box;
      border: 2px solid rgba(223, 223, 229, 1);
      border-radius: 8px;
      line-height: calc(3rem - 4px);
      span{
        padding-left: 1rem;
        display: block;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        font-size: 0.91rem;
        font-weight: 600;
      }
      margin-bottom: 4rem;
    }
    .ZFB{
      background: url("../../assets/img/zfb.png") no-repeat 0.7rem center/auto 40%;
      margin-right: 0.2rem;
    }
    .WX{
      background: url("../../assets/img/wx.png") no-repeat 0.7rem center/auto 40%;
    }
    .active{
      border-color: rgba(250, 103, 52, 1);
      background: url("../../assets/img/zf_checked.png") no-repeat top right/auto 40%;
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
