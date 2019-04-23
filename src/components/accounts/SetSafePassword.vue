<template>
  <div>
    <ReturnHead :head_name="up?'修改安全密码':'设置安全密码'"></ReturnHead>
    <div class="input_box" v-if="!up">
      <div class="item" style="text-align: left;color:rgba(181, 181, 191, 1)">
        <span>{{inputData1.phone}}</span>
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
        <input type="password" placeholder="设置安全密码" v-model="inputData.newcode">
      </div>
      <div class="item none">
        <input type="password" placeholder="再次确认安全密码" v-model="inputData.check_word">
      </div>
    </div>
    <div class="input_box" v-if="up">
      <div class="item" style="text-align: left;color:rgba(181, 181, 191, 1)">
        <span>{{inputData1.phone}}</span>
      </div>
      <div class="item yanzhengcode">
        <input type="text" placeholder="输入图形验证码" v-model="inputData1.yzmCode">
        <span class="yanzheng_code" @click="rodomcode">{{yan_num}}</span>
      </div>
      <div class="item mescode">
        <input type="text" placeholder="输入短信验证码" v-model="inputData1.param">
        <span class="mes_code" :class="{none:!flag.btn}" @click="getmecode">{{mecodeMsg}}</span>
      </div>
      <div class="item">
        <input type="password" placeholder="输入旧密码" v-model="inputData1.oldpwd">
      </div>
      <div class="item">
        <input type="password" placeholder="请输入新的安全密码" v-model="inputData1.newpwd">
      </div>
      <div class="item none">
        <input type="password" placeholder="再次确认安全密码" v-model="inputData1.check_word">
      </div>
    </div>
    <div class="btn_box" v-if="up">
      <mt-button class="save" @click="submit1">保存</mt-button>
    </div>
    <div class="btn_box" v-if="!up">
      <mt-button class="save" @click="submit">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'SetSafePassword',
    data () {
      return {
        yan_num:"2345",
        totalnum:60,
        flag:{
          mecodeMsg:1,
          btn:true
        },
        up:"",
        inputData:{
          check_word:"",
          param:"",
          phone:"",
          yzmCode:"",
          newcode:""
        },
        inputData1:{
          oldpwd:"",
          check_word:"",
          param:"",
          phone:"",
          yzmCode:"",
          newpwd:""
        },
      }
    },
    watch:{
      inputData:{
        handler(value){
          window.sessionStorage.inputData=JSON.stringify(value);
        },
        deep:true
      }
    },
    computed:{
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
      goback(){
        this.$router.back(-1);
      },
      go(path){
        this.$router.push({path:path})
      },
      //失去焦点验证确认密码是否一致
      checkpass(){
        if(this.inputmes.password!==this.inputmes.check_word){
          this.$toast("密码和确认密码不一致")
          return;
        }
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
        if(this.yan_num==this.inputData.yzmCode||this.yan_num==this.inputData1.yzmCode){
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
      //修改安全密码提交事件
      submit(){
        if(!this.inputData.newcode){
          this.$toast("密码不能为空")
          return;
        }
        if(!this.inputData.phone){
          this.$toast("电话号码不能为空")
          return;
        }
        if(!this.inputData.param){
          this.$toast("请输入手机验证码")
          return;
        }
        if(this.inputData.newcode!==this.inputData.check_word){
          this.$toast("两次密码不一致")
          return;
        }
        if(this.inputData.yzmCode==this.yan_num){
          console.log(Object.assign({},this.inputData,{token:this.userInfo.token}))
           this.$http({method:"post",url:"/api/user/editsalecode",data:Object.assign({},this.inputData,{token:this.userInfo.token})}).then(
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
        }else {
          this.$toast("图形验证码错误")
        }
      },
      submit1(){
        if(!this.inputData1.oldpwd){
          this.$toast("请输入旧密码")
          return;
        }
        if(!this.inputData1.newpwd){
          this.$toast("新密码不能为空")
          return;
        }
        if(!this.inputData1.phone){
          this.$toast("电话号码不能为空")
          return;
        }
        if(!this.inputData1.param){
          this.$toast("请输入手机验证码")
          return;
        }
        if(!this.inputData1.newpwd==this.inputData1.check_word){
          this.$toast("两次密码输入不一致")
          return;
        }
        if(this.inputData1.yzmCode==this.yan_num){
            this.$http({method:"post",url:"/api/user/editsalecode",data:Object.assign({},this.inputData1,{token:this.userInfo.token})}).then(
              res=>{
                console.log(res)
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                  this.inputData1={
                    oldpwd:"",
                    check_word:"",
                    param:"",
                    phone:"",
                    yzmCode:"",
                    newpwd:""
                  }
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
        }else {
          this.$toast("图形验证码错误")
        }
      }
    },
    created () {
      this.rodomcode();
      if(window.sessionStorage.inputData){
        this.inputData=Object.assign({},this.inputData,JSON.parse(window.sessionStorage.inputData));
      }
      if(window.sessionStorage.timer&&window.sessionStorage.timer>0&&window.sessionStorage.timer<60){
        this.totalnum=parseInt(window.sessionStorage.timer);
        this.timer();
      }else {
        this.totalnum=60
        this.flag.mecodeMsg=1;
        this.flag.btn=true
      }
      if(window.sessionStorage.timerstate){
        this.flag=Object.assign({},this.flag,JSON.parse(window.sessionStorage.timerstate))
        window.sessionStorage.removeItem("timerstate")
      }
      this.$http({method:"post",url:"/api/user/sale",data:{token:this.userInfo.token}})
        .then(
          res=>{
            if(res.data.code==200){
              this.inputData.phone=res.data.data.phone;
              this.inputData1.phone=res.data.data.phone;
              this.up=res.data.data.up;
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    },
  }
</script>

<style lang="scss" scoped>
  .input_box{
    padding:0 1rem;
    .item{
      padding: 15px 0;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      input::-webkit-input-placeholder{
        color:rgba(181, 181, 191, 1);
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:rgba(181, 181, 191, 1);
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:rgba(181, 181, 191, 1);
      }
      input{
        border: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        font-size: 0.95rem;
      }
    }
    .none{
      border-bottom:none;
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
