<template>
<div>
  <ReturnHead head_name="拒绝退款"></ReturnHead>
  <div class="info_box">
    <div class="dec">
      <div class="img_box">
        <img :src="orderDetail.img" alt="">
      </div>
      <div class="right_content">
        <p class="font_dec">{{orderDetail.or_flower_info}}</p>
        <p class="num">x{{orderDetail.or_flower_num}}</p>
      </div>
    </div>
  </div>
  <div class="refund_num_box">
    <div class="refund_num">
      要求退款金额：<span class="number">¥ {{orderDetail.or_flower_total}}</span>
    </div>
  </div>
  <div class="refund_dec">
    <div class="dec">拒绝说明：</div>
    <textarea v-model="refuseDate.jujue_content" name="" id="" cols="30" rows="10" placeholder="请输入拒绝的理由"></textarea>
  </div>
  <div class="refuse_img">
  <div class="upload_box">
    <div class="info1">上传凭证：</div>
    <div class="up_load">
      <div class="img_upload_box">
        <div class="img_show_box" v-if="imgArray.length">
          <div class="item_fun" v-for="(item,index) in imgArray" :key="index">
            <div class="item">
              <span class="close_icon" @click="close(index)">&nbsp;</span>
              <img  :src="item" alt="">
            </div>
          </div>
        </div>
        <div class="fun_up_box" @click="openInput('upload')" v-show="imgArray.length<3">
          <div class="up_box">
            <input  ref="upload" type="file" v-show="false" accept="image/png,image/gif,image/jpeg" @change="change($event)" multiple>
          </div>
        </div>
      </div>
      <div class="info">
        *最多上传三张图片
      </div>
    </div>
  </div>
  <div class="btn_box">
    <mt-button class="ok" @click="refuseSubmit()">确定</mt-button>
  </div>
  </div>
</div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from  'axios'
  export default {
    name: 'RefuseRefund',
    data(){
      return{
        imgArray:[],
        imgIdArray:[],
        refuseDate:{
          jujue_content:"",
          jujue_img:""
        },
        refundDetail:{},
        orderDetail:{},
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      //提交拒绝申请
      refuseSubmit(){
        if(!this.imgIdArray){
          this.$toast("请上传图片")
          return
        }
        if(!this.refuseDate.jujue_content){
          this.$toast("请输入拒绝理由")
          return
        }
        let jujue_img=this.imgIdArray.join(',')
        this.$http({method:'post',url:"/api/order/do_sale",data:{token:this.userInfo.token,id:this.$route.query.id,step:14,refu_id:this.refundDetail.id,jujue_content:this.refuseDate.jujue_content,jujue_img:jujue_img}})
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
      //获取订单详情
      getdetail(){
        this.$http({method:"post",url:"/api/index/order_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.refundDetail=res.data.data.refund
                this.orderDetail=res.data.data.orderinfo
              }
            }
          )
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      change(e){
        const _this=this;
        let file=e.target.files[0];
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
              this.imgArray.push(res.data.data.imgurl)
              this.imgIdArray.push(res.data.data.img_id)
              console.log(this.imgArray)
              console.log(this.imgIdArray)
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
      close(index){
        this.imgArray.splice(index,1);
      },
      go(path){
        this.$router.push({path:path})
      }
    },
    created () {
      this.getdetail()
    }
  }
</script>

<style lang="scss" scoped>
  .info_box{
    .dec{
      padding:0.9rem;
      background: #ffffff;
      overflow: hidden;
      .img_box{
        width: 4rem;
        height: 4rem;
        float: left;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .right_content{
        float: right;
        width: calc(100% - 6rem);
        text-align: left;
        box-sizing: border-box;
        padding-left: 0.6rem;
        overflow: hidden;
        .font_dec{
          color: rgba(0, 0, 0, 1);
          font-size: 1rem;
          width: 78.5%;
          float: left;
          height: 4rem;
          overflow: hidden;
        }
        .num{
          color: rgba(0, 0, 0, 1);
          font-size: 1rem;
          width: 18.5%;
          float: right;
          text-align: right;
          height: 4rem;
        }
      }
    }
  }
  .refund_num_box{
    background: rgba(242, 243, 245, 1);
    padding: 0.8rem 0;
    .refund_num{
      background: #ffffff;
      text-align: left;
      font-size: 0.95rem;
      padding: 0.8rem 1rem;
      .number{
        color: rgba(227, 0, 0, 1);
      }
    }
  }
  .refund_dec{
    text-align: left;
    border-bottom: 0.8rem solid rgba(242, 243, 245, 1);
    padding: 1rem;
    .dec{
      padding-bottom: 1rem;
      font-size: 0.95rem;
      font-weight: bold;
    }
    textarea{
      width: 100%;
      font-size: 0.95rem;
    }
    textarea::placeholder{
      color: rgba(223, 223, 229, 1);
    }
  }
  .upload_box{
    padding:1rem;
    .info1{
      text-align: left;
      font-size: 0.85rem;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
    }
    .img_upload_box{
      overflow: hidden;
      margin-top: 0.3rem;
      .img_show_box{
        overflow: hidden;
        text-align: left;
        float: left;
        .item_fun{
          float: left;
          width: 30vw;
          padding: 0.3rem;
          text-align: center;
          height: 30vw;
          box-sizing: border-box;
          .item{
            width: 100%;
            height: 100%;
            position: relative;
            border: 1px dotted #ccc;
            box-sizing: border-box;
            border-radius: 8px;
            overflow: hidden;
            padding: 0.3rem;
            .close_icon{
              display: block;
              width: 1.8rem;
              background: url("../../assets/img/close_photo.png") no-repeat center center/1.2rem 1.2rem;
              position: absolute;
              top: 0.5rem;
              right: 0.2rem;
            }
            img{
              width: 100%;
            }
          }
        }
      }
      .fun_up_box{
        float: left;
        width: 30vw;
        height: 30vw;
        padding: 0.3rem;
        box-sizing: border-box;
        .up_box{
          width: 100%;
          height: 100%;
          border: 1px dotted #ccc;
          box-sizing: border-box;
          background: url("../../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
          background-color: rgba(223, 223, 229, 1);
          border-radius: 8px;
        }
      }
    }
    .title{
      color: rgba(0, 0, 0, 1);
      font-size: 1rem;
      text-align: left;
      background: rgba(242, 243, 245, 1);
      height: 2.4rem;
      line-height: 2.4rem;
      padding-left: 0.9rem;
      font-weight: bold;
    }
    .info{
      color: rgba(111, 113, 118, 1);
      font-size: 0.7rem;
      text-align: left;
    }
  }
  .btn_box{
    background: rgba(242, 243, 245, 1);
    padding-top: 3rem;
    padding-bottom: 1rem;
    .ok{
      background: rgba(250, 103, 52, 1);
      color: #ffffff;
      height: 3rem;
      line-height: 3rem;
      border-radius: 1.5rem;
      width: 90%;
      font-size: 0.9rem;
      letter-spacing: 3px;
    }
  }
</style>
