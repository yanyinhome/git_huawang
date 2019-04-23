<template>
  <div>
    <ReturnHead head_name="订单详情"></ReturnHead>
    <div class="img_box">
      <img :src="orderInfo.img" alt="">
    </div>
    <div class="info_box">
      <p>{{orderInfo.dizhi}}<span class="price">¥{{orderInfo.or_flower_total}}</span></p>
    </div>
    <div class="detail_box">
      <h3>订单详情</h3>
      <div class="item_box">
        <div class="left">
          订单编号:
        </div>
        <div class="right">
          <p>
            {{orderInfo.or_number}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          购买数量:
        </div>
        <div class="right">
          <p>
           {{orderInfo.or_flower_num}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          收花信息:
        </div>
        <div class="right">
          <p>
            {{orderInfo.or_shou_name}}
          </p>
          <p>
           {{orderInfo.or_shou_phone}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          详细地址:
        </div>
        <div class="right">
          <p>
            {{orderInfo.dizhi}}
          </p>
          <p>
            {{orderInfo.or_shou_address}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          送达时间：
        </div>
        <div class="right">
          <p class="time">
            {{orderInfo.or_delivery_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          花材信息：
        </div>
        <div class="right">
          <p>
            {{orderInfo.or_flower_info}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          订单备注：
        </div>
        <div class="right">
          <p>
            {{orderInfo.or_flower_content}}
          </p>
        </div>
      </div>
      <div class="btn_box">
        <mt-button :class="bindClass.addPrice" @click="show('addPrice','true')">请求加价</mt-button>
        <mt-button :class="bindClass.order" @click="getorder()">立即抢单</mt-button>
      </div>
    </div>
    <div class="addPrice_box" v-if="showState.addPrice">
      <div class="bg">
        <h3>加价填写</h3>
        <div class="item_box">
          <div class="left">
            订单原价:
          </div>
          <div class="right">
            <p class="price">
              ¥ {{orderInfo.or_flower_total}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            加价数额：
          </div>
          <div class="right">
            <input type="text" placeholder="请输入您想要增加的金额" v-model="order.maprice">
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            期望价格：
          </div>
          <div class="right">
            <p class="price">
              ¥ 0.00
            </p>
          </div>
        </div>
        <mt-button v-bind:class="bindClass.submit" @click="submit">提交请求</mt-button>
        <span class="close_icon" @click="show('addPrice',false)">&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'OrderDetail',
    data(){
      return{
        orderInfo:{},
        order:{
          id:"",
          maprice:""
        },
        bindClass:{
          addPrice:'addPrice',
          order:'order',
          submit:"sub"
        },
        showState:{
          addPrice:false
        }
      }
    },
    methods:{
      show(key,state){
        this.showState[key]=state;
      },
      getorderdetail(id){
        this.$http({method:"post",url:"/api/index/order_info",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              console.log(res,"123")
              this.orderInfo=res.data.data.orderinfo
            }
          )
      },
      submit(){
        this.showState.addPrice=false
        this.AddPrice(this.order.maprice)
      },
      //加价函数
      AddPrice(price){
        let id=this.$route.query.id;
        this.$http({method:"post",url:"/api/index/markup",data:{token:this.userInfo.token,id:id,maprice:price}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(
                  {
                    message: "请求已发送", //提示内容分
                    position: "center", //提示框位置
                    duration: 3000 , //持续时间（毫秒），若为 -1 则不会自动关闭
                    iconClass: 'lnr lnr-checkmark-circle icon-small' , //icon 图标的类名
                    className:"addClass"  //Toast 的类名。可以为其添加样式
                  }
                )
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //抢单
      getorder(){
        this.$messagebox.confirm('',{
          message: '<div style="color:rgba(51, 51, 51, 1)">确定接收订单编号为12312344567的订单吗？</div>',
          // title: '温馨提示',
          cancelButtonClass:'cancelButton',
          confirmButtonClass:'confirmButton',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            this.$http({method:"post",url:"/api/index/Grab",data:{token:this.userInfo.token,id:this.$route.query.id}})
              .then(
                res=>{
                  if(res.data.code==200){
                    this.$toast(res.data.msg)
                    this.$router.back(-1);
                  }else {
                    this.$toast(res.data.msg)
                  }
                }
              )
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
          })
      }
    },
    computed:{
      ...mapState(["userInfo"])
    },
    created () {
      this.order.id=this.$route.query.id
      this.getorderdetail(this.order.id)
    }
  }
</script>

<style lang="scss" scoped>
  .img_box{
    box-sizing: border-box;
    img{
      width: 100%;
    }
  }
  .info_box{
    p{
      text-align: left;
      padding-left: 0.8rem;
      height: 3.4rem;
      line-height: 3.4rem;
      font-weight: bold;
      .price{
        float: right;
        color: rgba(227, 0, 0, 1);
        margin-right: 1rem;
      }
    }
  }
  .detail_box{
    h3{
      font-family: FZ;
      background:url("../../assets/img/order_detail_left.png") no-repeat left center/4.8rem,url('../../assets/img/order_detail_right.png') no-repeat right center/4.8rem;
      box-sizing: border-box;
      margin: 1rem 3rem;
    }
    .item_box{
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
      overflow: hidden;
      color:rgba(0, 0, 0, 1);
      .left{
        display: inline-block;
        width: 24%;
        text-align: left;
        vertical-align: top;
        color: rgba(111, 113, 118, 1);
      }
      .right{
        display: inline-block;
        width: 74%;
        text-align: left;
        .time{
          color: rgba(13, 127, 232, 1);
        }
      }
    }
    .btn_box{
      margin: 1rem 0;
    }
    .addPrice{
      border: 1px solid rgba(53, 66, 54, 1);
      color: rgba(53, 66, 54, 1);
      height: 2rem;
      width: 43%;
      font-size: 0.7rem;
    }
    .order{
      color: rgba(250, 103, 52, 1);
      border: 1px solid rgba(250, 103, 52, 1);
      height: 2rem;
      width: 43%;
      font-size: 0.7rem;
      margin-left: 0.5rem;
    }
  }
  .addPrice_box{
    position: fixed;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    box-sizing: border-box;
    top: 0;
    left: 0;
    .bg{
      position: absolute;
      background: #fff;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 0 0.8rem;
      .close_icon{
        display: block;
        width: 2rem;
        background: url("../../assets/img/addprice_close.png") no-repeat center center/2.5rem 2.5rem;
        position: absolute;
        right: 0.8rem;
        top:0.8rem;
      }
      h3{
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        padding: 1.5rem 0 0.9rem 0;
        font-weight: bold;
      }
      .sub{
        background: rgba(250, 103, 52, 1);
        color: #fff;
        height: 2.5rem;
        width: 30%;
        line-height: 2.5rem;
        border-radius: 1.25rem;
        font-size: 0.9rem;
        margin: 3rem 0 1rem 0;
      }
      .item_box{
        padding: 1rem 0.8rem;
        box-sizing: border-box;
        overflow: hidden;
        color:rgba(0, 0, 0, 1);
        border-bottom: 1px solid rgba(223, 223, 229, 1);
        .left{
          display: inline-block;
          width: 26%;
          text-align: left;
          vertical-align: top;
          color: rgba(111, 113, 118, 1);
        }
        .right{
          display: inline-block;
          width: 72%;
          text-align: left;
          .price{
            color: rgba(227, 0, 0, 1);
          }
          input{
            outline: none;
            border: none;
          }
        }
      }
    }
  }
</style>
