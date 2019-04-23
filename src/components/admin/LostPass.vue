<template>
  <div class="hello">
    <h3>忘记密码</h3>
    <div class="input_box">
      <div class="item">
        <input type="text" v-model="inputMessage.account" placeholder="输入手机号">
      </div>
      <div class="item yanzhengcode">
        <input type="text" placeholder="输入右侧验证码" v-model="inputMessage.yzmCode">
        <span class="yanzheng_code" @click="rodomcode">{{yan_num}}</span>
      </div>
      <div class="item mescode">
        <input type="text" v-model="inputMessage.param" placeholder="输入短信验证码">
        <span class="mes_code" :class="{none:!flag.btn}"  @click="getmecode">{{mecodeMsg}}</span>
      </div>
      <div class="item">
        <input type="password" v-model="inputMessage.password" placeholder="设置登录密码">
      </div>
      <div class="item">
        <input type="password" v-model="inputMessage.check_word" @blur="checkpass" placeholder="再次确认登录密码">
      </div>
    </div>
    <div class="btn_box">
      <mt-button @click="submit">确认</mt-button>
    </div>
    <div class="back_icon" @click="goback()">&nbsp;</div>
  </div>
</template>

<script>
  export default {
    name: 'LostPass',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        yan_num:"2345",
        totalnum:60,
        flag:{
          mecodeMsg:1,
          btn:true
        },
        inputMessage:{
          account:"",
          param:"",
          password:"",
          check_word:"",
          yzmCode:"",
        }
      }
    },
    watch:{
      inputMessage:{
        handler(value){
          window.sessionStorage.inputMessage=JSON.stringify(value);
        },
        deep:true
      }
    },
    computed:{
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
      //定时器
      timer(){
        const _this=this;
        let timeInterval=setInterval(function () {
          if(_this.totalnum>0){
            _this.totalnum--;
            window.localStorage.timer=_this.totalnum.toString();
            window.localStorage.timerstate=JSON.stringify(_this.flag);
          }else {
            clearInterval(timeInterval);
            _this.flag.mecodeMsg=1;
            _this.flag.btn=true
            _this.totalnum=60;
          }
        },1000)
      },
      //路由跳转函数
      go(path){
        this.$router.push({path:path})
      },
      //失去焦点验证确认密码是否一致
      checkpass(){
        if(this.inputMessage.password!==this.inputMessage.check_word){
          this.$toast("密码和确认密码不一致")
          return;
        }
      },
      //获取短信验证码函数
      getmecode(){
        const _this=this;
        let phone=this.inputMessage.account;
        if(this.yan_num==this.inputMessage.yzmCode){
          if(phone){
            if(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone)){
              if(this.flag.btn){
                this.flag.mecodeMsg=2;
                this.flag.btn=false
                _this.$http({method:'post',url:"/api/register/getcode",data:{phone:phone,type:"2"}})
                  .then(
                    res=>{
                      console.log(res)
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
        }else {
          this.$toast('图形验证码不正确')
        }

      },
      //刷新图形验证码函数
      rodomcode(){
        this.yan_num=parseInt(Math.random()*100000).toString().slice(0,4);
      },
      goback(){
        this.$router.back(-1);
      },
      go(path){
        this.$router.push({path:path})
      },
      submit(){
        console.log(this.inputMessage)
        if(!this.inputMessage.password){
          this.$toast("密码不能为空")
          return;
        }
        if(!this.inputMessage.account){
          this.$toast("电话号码不能为空")
          return;
        }else {
          if(!/^1[34578]\d{9}$/.test(this.inputMessage.account)){
            this.$toast("请输入正确的电话号码")
            return
          }
        }
        if(!this.inputMessage.param){
          this.$toast("请输入手机验证码")
          return;
        }
        if(this.inputMessage.yzmCode==this.yan_num){
          const _this=this;
          this.$http({method:"post",url:"/api/register/forgetpwd",data:this.inputMessage}).then(
            res=>{
              if(res.data.code==200){
                console.log(res)
                this.$toast("修改成功，即将跳转到登录界面")
                setTimeout(function () {
                  _this.$router.push('/login')
                },3000)
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
      if(window.sessionStorage.inputMessage){
        this.inputMessage=Object.assign({},this.inputMessage,JSON.parse(window.sessionStorage.inputMessage));
      }
      if(window.localStorage.timer&&window.localStorage.timer>0&&window.localStorage.timer<60){
        this.totalnum=parseInt(window.localStorage.timer);
        this.timer();
      }
      if(window.localStorage.timerstate){
        this.flag=Object.assign({},this.flag,JSON.parse(window.localStorage.timerstate))
        window.localStorage.removeItem("timerstate")
      }
    }
  }
</script>

<style lang="scss"  scoped>
  .hello{
    padding: 3.5rem 1rem 0;
  h3{
    color: rgba(250, 103, 52, 1);
    font-size: 1.2rem;
    font-weight: normal;
  }
  .input_box{
    padding:0 1rem;
  .item{
    padding: 1.1rem 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(181, 181, 191, 1);
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
    font-size: 1rem;
  }
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
    padding: 3.5rem 1rem 1.2rem;
  .mint-button{
    width: 100%;
    color: #fff;
    background: rgba(250, 103, 52, 1);
    height: 2.5rem;
    line-height: 2.5rem;
    box-sizing: border-box;
    border-radius: 1.25rem;
    font-size: 0.9rem;
    letter-spacing: 3px;
  }
  }
  .back_icon{
    width: 1rem;
    left: 1rem;
    top: 1rem;
    position: absolute;
    background: url("../../assets/img/reg_back.png") no-repeat center center/0.7rem auto;
  }
  }
</style>
