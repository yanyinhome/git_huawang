<template>
  <div>
    <ReturnHead head_name="银行卡信息"></ReturnHead>
    <div class="item_box">
      <div class="item">
        <div class="left">开户行名称</div>
        <div class="right">
          <input type="text" v-model="BankMessage.openbank" placeholder="输入开户行名称">
        </div>
      </div>
      <div class="item">
        <div class="left">开户行支行名称</div>
        <div class="right">
          <input type="text" v-model="BankMessage.bankother" placeholder="输入开户行支行名称">
        </div>
      </div>
      <div class="item">
        <div class="left">真实姓名</div>
        <div class="right">
          <input type="text" v-model="BankMessage.bankuser" placeholder="输入您的真实姓名">
        </div>
      </div>
      <div class="item noborder">
        <div class="left">银行卡</div>
        <div class="right">
          <input type="text" v-model="BankMessage.banknum" placeholder="输入银行卡号">
        </div>
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="save" @click="submit">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'ChangeBankCard',
    data(){
      return{
       BankMessage: {
         openbank:"",
         bankother:"",
         banknum:"",
         bankuser:""
       },
        btnState:true
      }
    },
    watch:{
      BankMessage:{
        handler(value){
          window.sessionStorage.BankMessage=JSON.stringify(value);
        },
        deep:true
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['setUserInfo']),
      //防止重复提交
      changeBtn(key){
        this[key]=!this[key];
        const _this=this;
        setTimeout(function () {
          _this.changeBtn(key)
        },3000)
      },
      //提交
      submit(){
        if(!this.BankMessage.openbank){
          this.$toast("开户银行不能为空")
          return;
        }
        if(!this.BankMessage.bankother){
          this.$toast("开户支行不能为空")
          return;
        }
        if(!this.BankMessage.banknum){
          this.$toast("银行卡号不能为空")
          return;
        }
        if(!this.BankMessage.bankuser){
          this.$toast("姓名不能为空")
          return;
        }
        if(!this.btnState){
          this.$toast('请勿重复提交')
        }
        this.changeBtn('btnState');
        console.log(Object.assign({},this.BankMessage,{token:this.userInfo.token,flag:1},5522))
        this.$http({method:"post",url:"/api/user/editother",data:Object.assign({},this.BankMessage,{token:this.userInfo.token,flag:1})})
          .then(
            res=>{
              console.log(res)
              if(!this.btnState){
                this.changeBtn('btnState');
              }
              if(res.data.code==200){
                this.$toast(res.data.msg);
              }else {
                this.$toast(res.data.msg)
              }
            }
          ).then(
          this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
            .then(
              res=>{
                if(res.data.code==200){
                  this.setUserInfo(Object.assign({},this.userInfo,res.data.data))
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
        )
      },
      //结构对象
      getData(){
         const {openbank,bankother,banknum,bankuser}=this.userInfo.other
      }
    },
    created () {
      console.log(this.userInfo)
      if(window.sessionStorage.BankMessage){
        this.BankMessage=JSON.parse(window.sessionStorage.BankMessage)
      }
      this.BankMessage=this.userInfo.other;
    }
  }
</script>

<style lang="scss" scoped>
  .item_box{
    border-top: 10px solid rgba(242, 243, 245, 1);
    .item{
      overflow: hidden;
      margin: 0 1rem;
      font-size: 0.95rem;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .left{
        font-size: 0.95rem;
        float: left;
        width: 45%;
        text-align: left;
        height: 2.6rem;
        line-height: 2.6rem;
      }
      .right{
        width: 55%;
        float:right;
        height: 2.6rem;
        line-height: 2.6rem;
        input{
          outline: none;
          border: none;
          text-align: right;
          font-size: 0.95rem;
          width: 100%;
        }
        input::-webkit-input-placeholder{
          color:rgba(181, 181, 191, 1);
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:rgba(181, 181, 191, 1);
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:rgba(181, 181, 191, 1);
        }
      }
    }
    .noborder{
      border-bottom: none;
    }
  }
  .btn_box{
    background: rgba(242, 243, 245, 1);
    height: 30rem;
    .save{
      background: rgba(250, 103, 52, 1);
      color: #fff;
      width: 90%;
      height: 2.6rem;
      line-height: 2.6rem;
      border-radius: 1.3rem;
      margin-top: 4rem;
    }
  }
</style>
