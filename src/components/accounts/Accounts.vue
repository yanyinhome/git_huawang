<template>
  <div>
    <ReturnHead head_name="账户设置"></ReturnHead>
<<<<<<< HEAD
    <div class="head_list_box">
      <div class="list_box" @click="show()">
        <mt-header class="highter" title="">
        <span slot="left">
          <span class="user_base user_setorder">头像</span>
        </span>
          <span class="right_icon" slot="right">
            <img :src="userInfo.headimg?userInfo.headimg:defaultUrl" alt="" @click="showchange()">
            <input type="file" ref="input1" accept="image/*" capture="camera" v-show="false" @change="change($event)">
            <input type="file" ref="input2" accept="image/*" v-show="false" @change="change($event)">
            <i class="lnr lnr-chevron-right"></i>
          </span>
        </mt-header>
      </div>
      <div class="list_box" @click="go('/changeusername')">
        <mt-header class="noborder" title="">
        <span slot="left">
          <span class="user_base user_setorder">用户名</span>
        </span>
          <span class="right_icon" slot="right">{{userInfo.username}}&nbsp;<i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
    </div>
    <div class="body_list_box">
      <div class="list_box" @click="go('/changepersonalmessage')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">个人资料</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
     <!-- <div class="list_box" @click="go('/changebankcard')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">银行卡</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>-->
      <div class="list_box" @click="go('/changezfb')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">支付宝</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
     <!-- <div class="list_box" @click="go('/changewx')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_setorder">微信</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>-->
      <div class="list_box" @click="go('/safecenter')">
        <mt-header class="noborder" title="">
        <span slot="left">
          <span class="user_base user_setorder">安全中心</span>
        </span>
          <span class="right_icon" slot="right"><i class="lnr lnr-chevron-right"></i></span>
        </mt-header>
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="relogin" @click="reload">退出登录</mt-button>
    </div>
    <div class="alert_box" v-show="changeState">
      <div class="bg">
        <div class="change_box">
          <p @click="openinput('input1')">拍照</p>
          <p @click="openinput('input2')">从相册中选择</p>
        </div>
        <div class="cancle_box" @click="closeChange">
            取消
        </div>
      </div>
    </div>
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
  </div>
</template>

<script>
<<<<<<< HEAD
  import {mapState,mapActions} from "vuex"
  import axios from  'axios'
  export default {
    name: 'Accounts',
    data(){
      return{
        imgUrl:"",
        imgId:"",
        changeState:false,
        defaultUrl:require('../../assets/img/example.png')
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['setUserInfo']),
      //图片上传
      change(e){
        const _this=this;
        let file=e.target.files[0];
        console.log(e.target)
        let param=new FormData()//创建form对象
        param.append("headimg",file);
        param.append("token",this.userInfo.token);
        axios.post("http://houtai1.cadhx.com/api/user/upheadimg",param,{headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
            if(res.data.code=="200"){
              console.log(res)
              this.$toast(res.data.msg)
              this.getuserInfo()
            /*  this.imgUrl=res.data.data.imgurl
              this.imgId=res.data.data.img_id*/
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
      showchange(){
        this.changeState=true;
      },
      closeChange(){
        this.changeState=false;
      },
      //打开input窗
      openinput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      show(){},
      go(path){
        this.$router.push({path:path})
      },
      reload(){
        this.setUserInfo("")
        window.localStorage.removeItem('userInfo')
        this.$router.push({path:"/personalcenter"})
      },
      getuserInfo(){
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
      }
    },
    created () {
      this.getuserInfo()
    }
  }
</script>

<style lang="scss" scoped>
.head_list_box{
  background: #fff;
  border-bottom: 10px solid #f2f3f5;
  border-top: 10px solid #f2f3f5;
  .list_box{
    padding: 0 15px;
    .mint-header{
      font-size: 0.95rem;
      background-color: #fff;
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .user_base{
        display: inline-block;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 1);
      }
      .right_icon{
        color: rgba(51, 51, 51, 1);
        img{
          margin-right: 0.5rem;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
        }
      }
    }
    .noborder{
      border-bottom: 0px;
    }
    .highter{
      padding: 2rem 0;
    }
  }
}
.body_list_box{
  .list_box{
    padding: 0 15px;
    .mint-header{
      font-size: 0.95rem;
      background-color: #fff;
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .user_base{
        display: inline-block;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 1);
      }
      .right_icon{
        color: rgba(51, 51, 51, 1);
      }
    }
    .noborder{
      border-bottom: 0px;
    }
  }
}
.btn_box{
  height: 17rem;
  padding-bottom: 8rem;
  background: rgba(242, 243, 245, 1);
  .relogin{
    width: 90%;
    height:2.6rem;
    background: rgba(250, 103, 52, 1);
    color: #ffffff;
    border-radius: 1.3rem;
    margin-top: 4rem;
    font-size: 0.95rem;
  }
}
.alert_box{
  position: fixed;
  width:100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  box-sizing: border-box;
  top: 0;
  left: 0;
  .bg{
    position: absolute;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    .change_box{
      border-radius: 8px;
      background: #ffffff;
      margin-bottom: 0.5rem;
      p{
        text-align: center;
        font-size: 1.1rem;
        color: #007AFF;
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid #F8F8F8;
      }
      p:last-child{
        border-bottom: none;
      }
    }
    .cancle_box{
      height: 3rem;
      border-radius: 8px;
      background: #ffffff;
      text-align: center;
      color: #007AFF;
      font-size: 1.1rem;
      line-height: 3rem;
    }
  }
}
=======
  export default {
    name: 'Accounts'
  }
</script>

<style scoped>

>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
</style>
