<template>
  <div>
    <ReturnHead head_name="申请退款"></ReturnHead>
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="aftersale_item">
      <div class="left"><b>退款金额：</b></div>
      <div class="right tl"><span>￥{{orderdetail.or_flower_total}}</span></div>
    </div>
    <div class="aftersale_item">
      <div class="left"><b>退款理由：</b></div>
      <div class="right tr"><input type="text" v-model="xia_aftersaleDate.content" placeholder="请输入退款理由"></div>
    </div>
    <div class="upload_box">
      <div class="title">
        上传凭证
      </div>
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
          <div class="fun_up_box" @click="openInput('upload')" v-show="input_show_state">
            <div class="up_box">
              <input  ref="upload" type="file" v-show="false" accept="image/*" @change="change($event)">
            </div>
          </div>
        </div>
        <div class="info">
          *最多上传三张图片
        </div>
      </div>
      <div class="btn_asksale_box">
        <mt-button class="btn" @click="xia_ask_refund">
          确定
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from "axios"
  export default {
    name: 'ApplyRefund',
    data(){
      return{
        xia_aftersaleDate:{
          content:"",
          img:""
        },
        orderdata:{},
        imgArray:[],
        imgIdArray:[],
        inputShow:true,
        orderdetail:{},
      }
    },
    computed:{
      ...mapState(['userInfo']),
      input_show_state(){
        if(this.imgArray.length>=3){
          return false;
        }else {
          return true
        }
      }
    },
    methods:{
      //下单申请退款
      xia_ask_refund(){
        console.log(this.imgArray)
        console.log(this.imgIdArray)
        this.xia_aftersaleDate.img=this.imgIdArray.join(',')
        console.log(this.xia_aftersaleDate)
        if(!this.xia_aftersaleDate.content){
          this.$toast("请输入退款原因")
          return
        }
        if(!this.xia_aftersaleDate.img){
          this.$toast("请上传凭证")
          return
        }
        this.$http({method:"post",url:"/api/order/after_sale",data:Object.assign({},{token:this.userInfo.token,id:this.$route.query.id},this.xia_aftersaleDate)})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.push({path:'/refunddetail',query:{id:this.orderdetail.id,type:2}})
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //图片上传
      change(e){
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
              console.log(res)
              this.imgArray.push(res.data.data.imgurl)
              this.imgIdArray.push(res.data.data.img_id)
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
      //获取订单信息
      getorderdetail(){
        console.log(this.$route.query.id,"id")
        this.$http({method:'post',url:"/api/index/order_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res)
                this.orderdata=res.data.data;
                this.orderdetail=res.data.data.orderinfo;
                let status=res.data.data.orderinfo.status
                console.log(status,"status")
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      close(index){
        this.imgArray.splice(index,1);
        this.inputShow=true;
      },
      go(path){
        this.$router.push({path:path})
      }
    },
    created () {
      this.getorderdetail()
    }
  }
</script>

<style lang="scss" scoped>
  .info_box{
    .title{
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      font-size: 1rem;
      text-align: left;
      background: rgba(242, 243, 245, 1);
      padding: 10px 0;
      padding-left: 0.9rem;
    }
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
  .aftersale_item{
    overflow: hidden;
    padding: 0 1rem;
    border-top: 10px solid #F2F3F5;
    .left{
      text-align:left;
     padding: 10px 0;
      float: left;
      width: 30%;
    }
    .right{
      padding: 10px 0;
      float: right;
      width: 70%;
      font-size: 1rem;
    }
    .tl{
      text-align: left;
      span{
        color: #E30000;
      }
    }
    .tr{
      input{
        font-size: 1rem;
        border: none;
        outline: none;
        width: 100%;
        text-align: right;
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
  .upload_box{
    .img_upload_box{
      overflow: hidden;
      margin-top: 0.3rem;
      .img_show_box{
        overflow: hidden;
        text-align: left;
        float: left;
        .item_fun{
          float: left;
          width: 33.3vw;
          padding: 0.3rem;
          text-align: center;
          height: 33.3vw;
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
        width: 33.3vw;
        height: 33.3vw;
        padding: 0.3rem;
        box-sizing: border-box;
        .up_box{
          width: 100%;
          height: 100%;
          border: 1px dotted #ccc;
          box-sizing: border-box;

          background: url("../../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
          background-color: #DFDFE5;
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
    .flower_shop_info{
      overflow: hidden;
      padding: 1rem 0;
      .img_box{
        width: 20%;
        float: left;
        img{
          width: 2.35rem;
          height: 2.35rem;
          border: 2px solid rgba(53, 66, 54, 1);
          border-radius: 50%;
        }
      }
      .font_box{
        width: 80%;
        float: left;
        text-align: left;
        .shop_name{
          color: rgba(0, 0, 0, 1);
          font-size: 0.85rem;
        }
        .shop_address{
          color: rgba(111, 113, 118, 1);
          font-size: 0.75rem;
        }
      }
    }
    .info{
      color: rgba(111, 113, 118, 1);
      font-size: 0.7rem;
      text-align: left;
    }
    .btnbox{
      box-sizing: border-box;
      border-top: 1px solid rgba(223, 223, 229, 1);
      margin: 0.5rem 0.4rem 0;
      padding: 0.9rem 0;
      overflow: hidden;
      .btn{
        width: 50%;
        box-sizing: border-box;
        float: left;
        color: rgba(68, 68, 68, 1);
        font-size: 0.95rem;
        span{
          display: inline-block;
          padding-left: 1.8rem;
          background: url("../../assets/img/phone_qq.png") no-repeat left center/1.3rem auto;
        }
      }
      .left{
        border-right: 1px solid rgba(223, 223, 229, 1);
        span{
          background: url("../../assets/img/phone_sender.png") no-repeat left center/1.3rem auto;
        }
      }
    }
  }
  .btn_asksale_box{
    background: #F2F3F5;
    padding: 6rem 1rem 8rem;
    .btn{
      background: #FA6734;
      color: #ffffff;
      font-size: 0.85rem;
      width: 100%;
      height: 2.6rem;
      line-height: 2.6rem;
      border-radius: 1.3rem;
    }
  }
</style>
