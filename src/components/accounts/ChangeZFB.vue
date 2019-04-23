<template>
  <div>
    <ReturnHead head_name="支付宝信息"></ReturnHead>
    <div class="input_box">
      <div class="item">
        <div class="left">支付宝账户</div>
        <div class="right">
          <input type="text" v-model="inputData.alipay" placeholder="输入支付宝账户">
        </div>
      </div>
      <div class="item noborder">
        <div class="left">真实姓名</div>
        <div class="right">
          <input type="text" v-model="inputData.alipay_name" placeholder="输入您真实姓名">
        </div>
      </div>
    </div>
    <div class="up_load">
      <p class="title">
        上传支付宝收款码
      </p>
      <div class="up_load_box">
        <div @click="clickInput" class="img_box" v-if="alipay_img">
          <img  :src="alipay_img" alt="" >
        </div>
        <label v-if="!alipay_img" class="input_box" for="input">&nbsp;</label>
        <input ref="input" type="file" accept="image/*" v-show="false" id="input" @change="upload($event)">
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="save" @click="submit">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from "vuex"
  import axios from "axios"
  export default {
    name: 'ChangeZFB',
    data(){
      return{
        alipay_img:"",
        inputData:{
          alipay:"",
          alipay_name:"",
          alipay_img:""
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['setUserInfo']),
      //input框代理事件
      clickInput(){
        this.$refs.input.dispatchEvent(new MouseEvent('click'))
      },
      //图片上传
      upload(e){
        const _this=this;
        let file=e.target.files[0];
        console.log(e.target)
        let param=new FormData()//创建form对象
        param.append("imgurl",file);
        param.append("token",this.userInfo.token);
        //添加请求头
        /* this.$http({method:"post",url:"/index.php/index/common/douploads",headers:"headers:{'Content-Type':'multipart/form-data'}",param})
             .then(res=>{console.log(res)})*/
        axios.post("http://houtai.huatuan666.com/api/home/doupload",param,{headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
            if(res.data.code=="200"){
              this.$toast(res.data.msg)
              this.alipay_img=res.data.data.imgurl
              this.inputData.alipay_img=res.data.data.img_id
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
      submit(){
        console.log(Object.assign({},{token:this.userInfo.token},this.inputData,{flag:2}))
          this.$http({method:"post",url:"/api/user/editother",data:Object.assign({},{token:this.userInfo.token},this.inputData,{flag:2})})
            .then(
              res=>{
                console.log(res,'1')
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                }else {
                  this.$toast(res.data.msg)
                }
              }
            ).then(
            this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
              .then(
                res=>{
                  console.log(res)
                  if(res.data.code==200){
                    this.setUserInfo(Object.assign({},this.userInfo,res.data.data))
                    this.$router.back(-1)
                  }else {
                    this.$toast(res.data.msg)
                  }
                }
              )
          )
      }
    },
    created () {
      const  {alipay,alipay_name,alipay_img}=this.userInfo.other;
      this.inputData={
        alipay:alipay,
        alipay_name:alipay_name,
        alipay_img:""
      }
      this.alipay_img=alipay_img;
    }
  }
</script>

<style lang="scss" scoped>
  .input_box{
    border-bottom: 10px solid  rgba(242, 243, 245, 1);
    border-top: 10px solid  rgba(242, 243, 245, 1);
    .item{
      overflow: hidden;
      margin: 0 15px;
      font-size: 0.95rem;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .left{
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
        text-align: right;
        input{
          outline: none;
          border: none;
          text-align: right;
          font-size: 0.9rem;
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
  .up_load{
    padding: 1rem;
    .title{
      font-size: 0.95rem;
      text-align: left;
      font-weight: bold;
    }
    .up_load_box{
      padding: 1rem 0;
      text-align: center;
      .img_box{
        border: 2px dotted rgba(223, 223, 229, 1);
        border-radius: 8px;
        width: 10rem;
        height: 14rem;
        overflow: hidden;
        margin: 0 auto;
        img{
          width: 100%;
        }
      }
      .input_box{
        border: 2px dotted rgba(223, 223, 229, 1);
        border-radius: 8px;
        display: inline-block;
        width: 10rem;
        height: 14rem;
        background: url("../../assets/img/up_load_bg.png") no-repeat center center/1.5rem 1.5rem;
        background-color: rgba(223, 223, 229, 1);
      }
    }
  }
  .btn_box{
    background: rgba(242, 243, 245, 1);
    height: 16rem;
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
