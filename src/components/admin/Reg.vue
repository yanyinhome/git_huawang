<template>
  <div class="hello">
   <h3>注册账号</h3>
   <div class="input_box">
     <div class="item">
       <input type="text" placeholder="设置用户名" v-model="inputmes.username">
     </div>
     <div class="item">
       <input type="password" placeholder="设置登录密码" v-model="inputmes.password">
     </div>
     <div class="item">
       <input type="password" placeholder="再次确认登录密码" @blur="checkpass" v-model="inputmes.check_word">
     </div>
     <div class="item">
       <input type="text" placeholder="输入QQ号（选填）" v-model="inputmes.qq">
     </div>
     <div class="item">
       <input type="text" placeholder="输入验证手机号码" v-model="inputmes.phone">
     </div>
     <div class="item yanzhengcode">
       <input type="text" placeholder="输入右侧验证码" v-model="inputmes.yzmCode">
       <span class="yanzheng_code" @click="rodomcode">{{yan_num}}</span>
     </div>
     <div class="item mescode">
       <input type="text" placeholder="输入短信验证码" v-model="inputmes.param">
       <span class="mes_code" :class="{none:!flag.btn}"  @click="getmecode">{{mecodeMsg}}</span>
     </div>
   </div>
    <div class="btn_box">
      <mt-button @click="submit">注册</mt-button>
    </div>
    <div class="back_icon" @click="goback()">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      yan_num:"2345",
      totalnum:60,
      flag:{
        mecodeMsg:1,
        btn:true
      },
      inputmes:{
        username:"",
        password:"",
        check_word:"",
        param:"",
        phone:"",
        qq:"",
        yzmCode:"",
      }
    }
  },
  watch:{
    inputmes:{
      handler(value){
        window.sessionStorage.inputmes=JSON.stringify(value);
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
  //  获取验证码，并阻止再次点击事件
    getmecode(){
      const _this=this;
      let phone=this.inputmes.phone;
      if(this.yan_num==this.inputmes.yzmCode){
        if(phone){
          if(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone)){
            if(this.flag.btn){
              this.flag.mecodeMsg=2;
              this.flag.btn=false
              _this.$http({method:'post',url:"/api/register/getcode",data:{phone:phone,type:"1"}})
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
      }else {
        this.$toast('图形验证码不正确')
      }
    },
    //注册提交事件
    submit(){
      if(!this.inputmes.username){
        this.$toast("用户名不能为空")
        return;
      }
      if(!this.inputmes.password){
        this.$toast("密码不能为空")
        return;
      }
      if(!this.inputmes.phone){
        this.$toast("电话号码不能为空")
        return;
      }
      if(!this.inputmes.param){
        this.$toast("请输入手机验证码")
        return;
      }
     if(this.inputmes.yzmCode==this.yan_num){
       console.log(this.inputmes)
       this.$http({method:"post",url:"/api/register/reg",data:this.inputmes}).then(
         res=>{
           if(res.data.code==200){
               this.$router.push({path:'/regsuc',query:{account:this.inputmes.phone,password:this.inputmes.password}})
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
    if(window.sessionStorage.inputmes){
      this.inputmes=Object.assign({},this.inputmes,JSON.parse(window.sessionStorage.inputmes));
    }
    if(window.localStorage.timer&&window.localStorage.timer>0&&window.localStorage.timer<60){
      this.totalnum=parseInt(window.localStorage.timer);
      this.timer();
    }
    if(window.localStorage.timerstate){
      this.flag=Object.assign({},this.flag,JSON.parse(window.localStorage.timerstate))
      window.localStorage.removeItem("timerstate")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
