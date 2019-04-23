<template>
  <div class="hello">
    <h3>花团帮</h3>
    <div class="input_box">
      <div class="item">
        <input type="text" v-model="inputMessage.account" placeholder="用户名/手机号码">
      </div>
      <div class="item">
        <input type="password" v-model="inputMessage.password" placeholder="登录密码">
      </div>
    </div>
    <div class="btn_box">
      <mt-button @click="submit">登录</mt-button>
    </div>
    <div class="info_box">
      <div class="pass" @click="go('/lost')">忘记密码？</div>
      <div class="register" @click="go('/reg')">去注册<span class="right_arrow">&nbsp;</span></div>
    </div>
    <div class="close_icon" @click="go('/home')">&nbsp;</div>
  </div>
</template>

<script>
  import {mapState,mapActions} from  'vuex';
export default {
  name: 'Login',
  data () {
    return {
      inputMessage:{
        account:"",
        password:""
      }
    }
  },
  computed:{
    ...mapState(['userInfo']),
  },
 methods:{
    ...mapActions(['setUserInfo','setActiveIndex']),
   go(path){
     this.$router.push({path:path})
   },
 // 登录提交验证
   submit(){
      const _this=this;
     if(!this.inputMessage.account){
       this.$toast("请输入用户名")
       return
     }
     if(!this.inputMessage.password){
       this.$toast("请输入密码")
       return;
     }
     this.$http({method:"post",url:"/api/register/login",data:this.inputMessage}).then(
       res=>{
         if(res.data.code==200){
           this.setUserInfo(Object.assign({},{token:res.data.data}));
           this.setActiveIndex(0)
           this.$toast("登录成功，即将跳转到首页")
           setTimeout(function () {
             _this.$router.push({path:"/home",query:{message:"你好，欢迎来到花团"}})
           },1000)
         }else {
           this.$toast(res.data.msg)
         }
       }
     )
   }
 },
  created () {
    console.log(this.$route.query.redirect)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    padding: 3.5rem 0;
    position: relative;
    .close_icon{
      width: 1rem;
      left: 1rem;
      top: 2rem;
      position: absolute;
      background: url("../../assets/img/login_close.png") no-repeat center center/1rem 1rem;
    }
    h3{
      font-family: FZ;
      font-size: 1.3rem;
      letter-spacing: 8px;
      color: rgba(250, 103, 52, 1);
      padding-bottom: 2rem;
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
    .info_box{
      padding: 0 1rem;
      font-size: 0.76rem;
      overflow: hidden;
      div{
        width: 50%;
        box-sizing: border-box;
      }
      .pass{
        float: left;
        text-align: left;
      }
      .register{
        float: right;
        text-align: right;
        .right_arrow{
          display: inline-block;
          width: 0.8rem;
          background: url("../../assets/img/right_arron.png") no-repeat center center/auto 80%;
        }
      }
    }
  }
</style>
