<template>
  <div>
    <ReturnHead head_name="账户充值"></ReturnHead>
    <div class="account_box">
      <p class="account_title">账户余额</p>
      <p class="account_number">{{userInfo.money}}</p>
    </div>
    <div class="rechange_box">
      <p class="title">充值金额</p>
      <div class="input_box">
        <span>￥</span><input type="text" v-model="ReChange.money" placeholder="请输入充值金额">
      </div>
    </div>
    <div class="zf_box">
      <label :class="{active:ReChange.pay_type==1}" for="type1"><span class="ZFB">支付宝支付</span></label><input @change="show" v-show="false" type="radio" id="type1" value="1" name="ZhiFU" v-model="ReChange.pay_type">
      <label :class="{active:ReChange.pay_type==2}" for="type2"><span class="WX">微信支付</span></label><input @change="show" v-show="false" type="radio" id="type2" value="2" name="ZhiFU" v-model="ReChange.pay_type">
    </div>
    <!--<div id="result"></div>-->
    <div class="btn_box">
      <mt-button @click="rechange()">
        立即充值
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from  'vuex'
  export default {
    name: 'ReChange',
    data(){
      return{
        Result:"",
        ReChange:{
          pay_type:"1",
          money:"",
          type:2
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['setUserInfo','setOrderType']),
      //充值
      rechange(){
        if(!this.ReChange.money||this.ReChange.money=="0"){
          this.$toast('请输入金额')
          return
        }
        this.$http({method:"post",url:"/api/pay/chongzhi",data:Object.assign({},{token:this.userInfo.token},this.ReChange)})
          .then(
            res=>{
              console.log(res)
             if(this.ReChange.pay_type==1){
              /* const div=document.querySelector("#result");
               div.innerHTML = res.data;
               document.forms[0].submit();*/
               // 支付宝支付表单
               const div = document.createElement("div"); // 创建div
               div.innerHTML = res.data; // 将返回的form 放入div
               document.body.appendChild(div);
               document.forms[0].submit();
             }
             if(this.ReChange.pay_type==2){
               const  url=res.data.data.mweb_url;
               window.location.assign(url);
             }
            }
          )
      },
      show(){
        // console.log(this.ReChange)
      }
    },
    created () {
      let token=JSON.parse(window.localStorage.userInfo).token
      console.log(token)
        this.$http({method:"post",url:"/api/user/usermessage",data:{token:token}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                console.log(res)
                this.setUserInfo(Object.assign({},this.userInfo,res.data.data))
              }else {
                this.$toast(res.data.msg)
              }
            }
          )

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
    border-bottom: 8px solid #F2F3F5;
    border-top: 8px solid #F2F3F5;
    .account_title{
      margin: 0.5rem 0;
      color: #6F7176;
    }
    .account_number{
      font-size: 2rem;
      color: rgba(250, 103, 52, 1);
      margin-top: 0;
      margin-bottom: 0.6rem;
    }
  }
  .rechange_box{
    padding: 0 15px;
    .title{
      margin: 0.5rem 0;
    }
    .input_box{
      height: 3rem;
      line-height: 3rem;
      text-align: left;
      margin-bottom: 2rem;
      border-bottom: 1px solid #DFDFE5;
      padding-bottom: 2px;
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
    padding: 1.5rem 15px 0;
    border-top: 8px solid #F2F3F5;
    label{
      display: inline-block;
      width: 45%;
      height: 3rem;
      box-sizing: border-box;
      border: 2px solid rgba(223, 223, 229, 1);
      border-radius: 8px;
      line-height: calc(3rem - 4px);
      margin-right:0.3rem;
      span{
        padding-left: 1rem;
        display: block;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        font-size: 0.91rem;
        font-weight: 600;
      }
      margin-bottom: 1.5rem;
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
  .btn_box{
    background: #F2F3F5;
    padding:2rem 0 16rem;
    .mint-button{
      background:rgba(250, 103, 52, 1);
      color: #fff;
      font-size: 1rem;
      width: 95%;
      border-radius:1.3rem ;
      height: 2.6rem;
    }
  }

</style>
