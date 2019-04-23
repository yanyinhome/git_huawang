<template>
  <div>
    <ReturnHead :head_name="head_name"></ReturnHead>
    <div class="account_box">
      <p class="account_title">账户余额</p>
<<<<<<< HEAD
      <p class="account_number">{{BankDate.money}}</p>
=======
      <p class="account_number">{{userInfo.account}}</p>
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    </div>
    <div class="rechange_box">
      <p>提现金额</p>
      <div class="input_box">
<<<<<<< HEAD
        <span>￥</span><input type="text" v-model="submitDate.money" :placeholder="'可转出到卡'+BankDate.kanmoney">
      </div>
    </div>
    <div class="bank_change_box" @click="show_radio">
      <span class="title">{{bankmessage}}</span>
      <span class="go"><i class="lnr lnr-chevron-right"></i></span>
    </div>
    <div class="password_box">
      <span>安全密码</span><input type="password" placeholder="请输入安全密码" v-model="submitDate.saltword">
    </div>
    <div class="btn_box">
      <mt-button class="bt" @click="submit">
        确定提现
      </mt-button>
    </div>
    <div class="radio_box" v-show="radio_box_state">
      <div class="box">
        <p>选择提现方式 <span class="close_icon" @click="close_radio">&nbsp;</span></p>
        <div class="item" v-for="(val,key) in typeDate">
          <label :for="key"><span class="wai" :class="{active:submitDate.type==key}"><span class="nei">&nbsp;</span></span>{{val}}</label><input type="radio" v-show="false" :id="key" :value="key" v-model="submitDate.type" name="type" @change="change()">
        </div>
      </div>
    </div>
=======
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
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
  </div>
</template>

<script>
  import {mapState} from  'vuex'
  export default {
    name: 'GetCash',
    data(){
      return{
<<<<<<< HEAD
        radio_box_state:false,
        head_name:'提现',
        typeDate:{},
        BankDate:{},
        submitDate:{
          money:"",
          type:"2",
          saltword:""
=======
        head_name:'提现到卡',
        GetCash:{
          type:"1",
          number:""
        },
        BankMessage:{
          name:'工商银行',
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
        }
      }
    },
    computed:{
<<<<<<< HEAD
      ...mapState(['userInfo']),
      bankmessage(){
        let key=this.submitDate.type;
        return this.typeDate[key]
      }
    },
    methods:{
      change(){
        this.close_radio()
      },
      close_radio(){
        this.radio_box_state=false
      },
      show_radio(){
        this.radio_box_state=true
      },
      //提交
      submit(){
        console.log(this.submitDate)
        this.getCash();
      },
    //  提现
      getCash(){
        if(!this.submitDate.money){
          this.$toast('请输入提现金额')
          return
        }
        if(!this.submitDate.saltword){
          this.$toast('请输入安全密码')
          return
        }
        this.$http({method:"post",url:"/api/user/txdo",data:Object.assign({},{token:this.userInfo.token},this.submitDate)})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.submitDate.saltword=""
                this.getTypeMessage()
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
    //  获取提现信息
      getTypeMessage(){
        this.$http({method:'post',url:"/api/user/txview",data:{token:this.userInfo.token}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res)
                this.typeDate=res.data.data.type
                this.BankDate=res.data.data
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      }
    },
    created () {
      this.getTypeMessage();
=======
      ...mapState(['userInfo'])
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    }
  }
</script>

<style lang="scss" scoped>
  p{
    font-size: 0.91rem;
    text-align: left;
    font-weight: 600;
<<<<<<< HEAD
    color: #6F7176;
  }
  .account_box{
    padding: 0 15px;
    border-bottom: 8px solid #F2F3F5;
    border-top: 8px solid #F2F3F5;
    .account_title{
      padding: 1rem 0;
    }
=======
  }
  .account_box{
    padding: 0 15px;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    .account_number{
      font-size: 2rem;
      color: rgba(250, 103, 52, 1);
      margin-top: 0;
<<<<<<< HEAD
      padding-bottom: 1rem;
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    }
  }
  .rechange_box{
    padding: 0 15px;
<<<<<<< HEAD
    border-bottom: 8px solid #F2F3F5;
    p{
      color: #000000;
      padding:1rem 0;
    }
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    .input_box{
      height: 3rem;
      line-height: 3rem;
      text-align: left;
<<<<<<< HEAD
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #DFDFE5;
=======
      margin-bottom: 3rem;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
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
<<<<<<< HEAD
    border-bottom: 8px solid #F2F3F5;
    padding: 0.5rem 1rem;
    text-align: left;
    height: 2rem;
    line-height: 2rem;
=======
    padding: 0 15px;
    text-align: left;
    margin: 1.4rem 0;
    height: 2rem;
    line-height: 2rem;
    box-sizing: border-box;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
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
<<<<<<< HEAD
=======
    margin-bottom: 4rem;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
    height: 3rem;
    line-height: 3rem;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    font-size: 1rem;
    span{
<<<<<<< HEAD
      display: inline-block;
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
      font-weight: 600;
      padding: 0 15px;
    }
    input{
      font-size: 1.1rem;
      outline: none;
      border: none;
    }
  }
<<<<<<< HEAD
  .btn_box{
    background: #F2F3F5;
    padding-top: 3rem;
    padding-bottom: 15rem;
    .bt{
      background:rgba(250, 103, 52, 1);
      color: #fff;
      font-size: 0.95rem;
      width: 90%;
      border-radius:1.3rem ;
      height: 2.6rem;
      line-height: 2.6rem;
    }
  }
  .radio_box{
    position: fixed;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    box-sizing: border-box;
    top: 0;
    left: 0;
    .box{
      border-radius: 8px;
      text-align: left;
      background: #fff;
      margin: 50% 1rem 0;
      padding: 1rem;
      p{
        color: #000000;
        padding: 0.5rem 0;
        .close_icon{
          float: right;
          width: 1rem;
          background: url("../../assets/img/addprice_close.png") no-repeat center center/1rem;
        }
      }
      .item{
        padding: 1rem 0.5rem;
        border-bottom: 1px solid #EEEEEE;
        height: 1rem;
        line-height: 1rem;
        label{
          display: inline-block;
          width: 60%;
        }
        .wai{
          text-align: center;
          margin-right: 0.7rem;
          display: inline-block;
          background: #ffffff;
          width: 1rem;
          height: 1rem;
          vertical-align:middle;
          border-radius: 50%;
          border: 1px solid #999999 ;
          position: relative;
        }
        .active{
          border: 1px solid #FA6734;
          .nei{
            vertical-align: middle;
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background:#FA6734;
            position: absolute;
            left: 0.25rem;
            top:0.25rem;
          }
        }
      }
      .item:last-child{
        border-bottom: none;
      }
    }
=======
  .mint-button{
    background:rgba(250, 103, 52, 1);
    color: #fff;
    font-size: 1rem;
    width: 100%;
    border-radius:1.3rem ;
    height: 2.6rem;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
  }
</style>
