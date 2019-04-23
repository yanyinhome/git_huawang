<template>
  <div class="hello">
    <h3>注册成功</h3>
    <div class="img_bg_box">
    </div>
    <div class="mes">您已注册成功,欢迎加入花团帮~~</div>
    <div class="btn_box">
      <mt-button @click="go('/home')">进入首页</mt-button>
    </div>
    <div class="info_box">
      <span class="route">{{count}}s后自动跳转</span>
    </div>
    <div class="close_icon" @click="go('/home')">&nbsp;</div>
  </div>
</template>

<script>
  import {mapState,mapActions} from  'vuex';
  export default {
    name: 'RegSuc',
    data(){
     return{
       count:5
     }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      ...mapActions(['setUserInfo','setActiveIndex']),
      go(path){
        this.loadin()
        this.setActiveIndex(0)
        this.$router.push({path:path})
      },
      loadin(){
        this.$http({method:"post",url:"/api/register/login",data:this.$route.query}).then(
          res=>{
            if(res.data.code==200){
              this.setUserInfo(Object.assign({},{token:res.data.data}));
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
      }
    },
    mounted () {
      const _this=this;
      const timer=setInterval(
        function () {
          if(_this.count==0){
            clearInterval(timer)
            _this.loadin()
            _this.setActiveIndex(0)
            _this.go('/home')
          }else {
            _this.count--
          }
        },1000
      )
    }
  }
</script>

<style lang="scss" scoped>
  .hello{
    padding: 3rem 0;
    position: relative;
    .img_bg_box{
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1rem;
      background: url("../../assets/img/reg_suc_bg.png") center center/100% auto;
    }
  .close_icon{
    width: 1rem;
    left: 1rem;
    top: 2rem;
    position: absolute;
    background: url("../../assets/img/login_close.png") no-repeat center center/1rem 1rem;
  }
    .mes{
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      letter-spacing: 3px;
    }
  h3{
    font-size: 1.3rem;
    letter-spacing: 8px;
    color: rgba(0, 0, 0, 1);
    padding-bottom: 2rem;
  }
  .btn_box{
    padding: 3rem 1rem 1.2rem;
  .mint-button{
    width: 50%;
    color: #fff;
    background: rgba(255, 160, 134, 1);
    height: 3rem;
    line-height: 3rem;
    box-sizing: border-box;
    border-radius: 1.5rem;
    font-size: 1rem;
  }
  }
  .info_box{
    padding: 0 1rem;
    font-size: 0.76rem;
    overflow: hidden;
    color: rgba(250, 103, 52, 1);
    .route{
      display: inline-block;
      padding-left: 1.2rem;
      background: url("../../assets/img/reg_suc_flower.png") no-repeat left center/0.9rem 0.9rem;
    }
  }
  }
</style>
