<template>
<div>
  <ReturnHead head_name="个人资料"></ReturnHead>
  <div class="item_box">
    <div class="item">
      <div class="left">真实姓名</div>
      <div class="right">
        <input type="text" v-model="inputData.real_name" placeholder="输入真实姓名">
      </div>
    </div>
    <div class="item">
      <div class="left">手机号码</div>
      <div class="right">
        <!--<input type="text" v-model="inputData.phone" placeholder="输入11位手机号码">-->
        <span>{{inputData.phone}}</span>
      </div>
    </div>
    <div class="item noborder">
      <div class="left">QQ号</div>
      <div class="right">
        <input type="text" v-model="inputData.qq" placeholder="输入您的QQ号">
      </div>
    </div>
  </div>
  <div class="address_box">
  <div class="change_address">
    <AddressChoice class="address_set" @addressToParent="getAddress" :state="3"></AddressChoice>
  </div>
    <div class="item">
      <div class="left">详细地址</div>
      <div class="right">
        <input type="text" v-model="inputData.detail_address" placeholder="请填写详细地址">
      </div>
    </div>
  </div>
  <div class="btn_box">
    <mt-button class="save" @click="submit()">保存</mt-button>
  </div>
</div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'ChangePersonalMessage',
    data(){
      return{
        inputData:{
          real_name:"",
          phone:"",
          qq:"",
          city:"",
          city_name:"",
          area:"",
          area_name:"",
          detail_address:"",
          province:"",
          province_name:"",
          username:""
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      //提交
      submit(){
        if(!this.inputData.real_name){
          this.$toast('真实姓名不能为空')
          return
        }
        if(!this.inputData.city){
          this.$toast('请选择城市')
          return
        }
        if(!this.inputData.area){
          this.$toast('请选择区域')
          return
        }
        if(!this.inputData.province){
          this.$toast('请选择省份')
          return
        }
        this.$http({method:"post",url:"/api/user/upuserinfo",data:Object.assign({},{token:this.userInfo.token},this.inputData)})
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
      },
      //获取地址
      getAddress(data){
        this.inputData.province=data.province;
        this.inputData.city=data.city;
        this.inputData.area=data.area;
      },
      //获取个人信息
      getpersonalmessage(){
        this.$http({method:'post',url:"/api/user/upuserview",data:{token:this.userInfo.token,username:this.userInfo.username}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.inputData=res.data.data
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      }
    },
    created(){
     this.getpersonalmessage()
    }
  }
</script>

<style lang="scss" scoped>
.item_box{
  border-bottom: 5px solid rgba(242, 243, 245, 1);
  border-top: 5px solid rgba(242, 243, 245, 1);
  .item{
    overflow: hidden;
    margin: 0 1rem;
    font-size: 0.95rem;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
    padding: 15px 0;
    .left{
      float: left;
      width: 35%;
      text-align: left;
    }
    .right{
      width: 65%;
      float:right;
      text-align: right;
      input{
        outline: none;
        border: none;
        text-align: right;
        font-size: 0.95rem;
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
.address_box{
  .change_address{
    padding: 0 1rem;
    .address_set{
      margin-top: 0;
      border-bottom:1px solid rgba(223, 223, 229, 1);
    }
  }
  .item{
    overflow: hidden;
    padding: 0 1rem;
    font-size: 0.95rem;
    .left{
      float: left;
      width: 25%;
      text-align: left;
      height: 2.6rem;
      line-height: 2.6rem;
    }
    .right{
      width: 75%;
      float:right;
      height: 2.6rem;
      line-height: 2.6rem;
      input{
        width: 100%;
        outline: none;
        border: none;
        text-align: right;
        font-size: 0.95rem;
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
