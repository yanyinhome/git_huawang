<template>
  <div>
    <ReturnHead head_name="修改登录密码"></ReturnHead>
    <div class="item_box">
      <div class="item" style="text-align: left;color:rgba(181, 181, 191, 1)">
        <span>{{inputData.phone}}</span>
      </div>
      <div class="item yanzhengcode">
        <input type="text" placeholder="输入图形验证码" v-model="inputData.yzmCode">
        <span class="yanzheng_code" @click="rodomcode">{{yan_num}}</span>
      </div>
      <div class="item mescode">
        <input type="text" placeholder="输入短信验证码" v-model="inputData.param">
        <span class="mes_code" :class="{none:!flag.btn}" @click="getmecode">{{mecodeMsg}}</span>
      </div>
      <div class="item">
        <input type="password" v-model="inputData.oldpwd" placeholder="原登录密码">
      </div>
      <div class="item">
        <input type="password" v-model="inputData.newpwd" placeholder="新登录密码">
      </div>
      <div class="item none">
        <input type="password" v-model="inputData.checkPass" placeholder="确认新登录密码">
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="save" @click="submit">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'ChangeLoadPassword',
    data(){
      return{
        yan_num:"2345",
        totalnum:60,
        flag:{
          mecodeMsg:1,
          btn:true
        },
        inputData:{
          yzmCode:"",
          param:"",
          oldpwd:"",
          newpwd:"",
          checkPass:"",
          phone: ""
        }
      }
    },computed:{
      ...mapState(['userInfo']),
      mecodeMsg(){
        const _this=this;
        if(this.flag.mecodeMsg==1){
          return "获取验证码"
        }
        if(this.flag.mecodeMsg==2){
          return this.totalnum+"s后重新获取"
        }
      }
    },
    methods:{
      rodomcode(){
        this.yan_num=parseInt(Math.random()*100000).toString().slice(0,4);
      },
      timer(){
        const _this=this;
        let timeInterval=setInterval(function () {
          if(_this.totalnum>0){
            _this.totalnum--;
            window.sessionStorage.timer=_this.totalnum.toString();
            window.sessionStorage.timerstate=JSON.stringify(_this.flag);
          }else {
            clearInterval(timeInterval);
            _this.flag.mecodeMsg=1;
            _this.flag.btn=true
            _this.totalnum=60;
          }
        },1000)
      },
      //  获取验证码，并阻止再次点击事件
      getmecode(){
        const _this=this;
        if(this.yan_num==this.inputData.yzmCode){
          let phone=this.inputData.phone;
          if(phone){
            if(/^1[34578]\d{9}$/.test(phone)){
              if(this.flag.btn){
                this.flag.mecodeMsg=2;
                this.flag.btn=false
                _this.$http({method:'post',url:"/api/register/getcode",data:{phone:phone,type:"2"}})
                  .then(
                    res=>{
                      if(res.data.code==200){
                        this.$toast(res.data.msg)
                      }else {
                        this.$toast(res.data.msg)
                      }
                    }
                  )
                this.timer();
              }
            }else {
              _this.$toast('请输入正确的电话号码')
            }
          }else {
            _this.$toast("电话号码不能为空")
          }
        }
        else {
          this.$toast('图形验证码不正确')
        }
      },
      submit(){
        if(!this.inputData.oldpwd){
          $this.$toast("请输入旧密码")
          return;
        }
        if(!this.inputData.newpwd){
          $this.$toast("请输入新密码")
          return;
        }
        if(this.inputData.newpwd!=this.inputData.checkPass){
          $this.$toast("两次密码输入不一致")
          return;
        }
        console.log(this.inputData)
        this.$http({method:'post',url:'/api/user/editpwd',data:Object.assign({},{token:this.userInfo.token},this.inputData)})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.back(-1)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      }
    },
    created () {
      this.rodomcode();
      this.$http({method:"post",url:"/api/user/sale",data:{token:this.userInfo.token}})
        .then(
          res=>{
            if(res.data.code==200){
              this.inputData.phone=res.data.data.phone;
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
  .item_box{
    border-top: 8px solid rgba(242, 243, 245, 1);
    .item{
      margin: 0 1rem;
      padding: 15px 0;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      input{
        font-size: 0.95rem;
        width: 100%;
        outline: none;
        border: none;
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
    .none{
      border-bottom: none;
    }
    .yanzhengcode{
      text-align: left;
      input{
        width: 60%;
      }
      .yanzheng_code{
        display: block;
        width: 5.5rem;
        float: right;
        text-align: center;
        height: 1.8rem;
        line-height: 1.8rem;
        box-sizing: border-box;
        color: #ffffff;
        letter-spacing: 3px;
        background: url("../../assets/img/yanzheng_bg.png") no-repeat center center/cover;
      }
    }
    .mescode{
      text-align: left;
      input{
        width: 60%;
      }
      .mes_code{
        display: block;
        width: 5.5rem;
        float: right;
        color: rgba(250, 103, 52, 1);
        font-size: 0.8rem;
        text-align: center;
      }
      .none{
        color: rgba(111, 113, 118, 1);
      }
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
