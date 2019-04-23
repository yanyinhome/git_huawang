<template>
  <div>
    <OrderSearch @beginSearch="beginSearch"></OrderSearch>
    <div v-if="OrderList.length==0" style="margin-bottom:5rem">
      <div class="img_box">
        <img src="../../assets/img/order_noorder.png" alt="">
      </div>
      <div class="info">没有订单哦~~~</div>
    </div>
    <div v-if="OrderList.length!=0">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="orders_box">
          <div class="item_box" v-for="(item,index) in OrderList" :key="index">
            <template v-if="item.state==1">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="go('/detail',item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    未付款
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间：{{item.or_delivery_time}}</p>
                </div>
              </div>
              <div class="btn_item_box">
                <div class="btn">
                  <mt-button @click="openpay(item.id)" v-bind:class="btnClass.receive">立即付款</mt-button>
                </div>
                <div class="btn">
                  <mt-button @click="cancle(item.id)" v-bind:class="btnClass.cancle">取消订单</mt-button>
                </div>
              </div>
            </template>
            <template v-if="item.state==2">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="go('/detail',item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img wait_order">
                    待接单
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间：{{item.or_delivery_time}}</p>
                  <p class="addinfo">有{{item.mapricecount}}家花店追加金额！</p>
                </div>
              </div>
              <div class="btn_item_box">
                <div class="btn">
                  <mt-button v-bind:class="btnClass.receive" @click="alert_Addprice(item.id,item.or_flower_total)"><span class="red_circular">&nbsp;</span>追加金额</mt-button>
                </div>
                <div class="btn">
                  <mt-button v-bind:class="btnClass.cancle" @click="cancle(item.id)">取消订单</mt-button>
                </div>
              </div>
            </template>
            <template v-if="item.state==3">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="go('/detail',item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img refuse_order">
                    已拒绝
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间：{{item.or_delivery_time}}</p>
                </div>
              </div>
              <div class="btn_item_box">
                <div class="btn">
                  <mt-button v-bind:class="btnClass.receive" @click="alert_Addprice(item.id,item.or_flower_total)">追加金额</mt-button>
                </div>
                <div class="btn">
                  <mt-button v-bind:class="btnClass.cancle" @click="cancle(item.id)">取消订单</mt-button>
                </div>
              </div>
            </template>
            <template v-if="item.state==4">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="go('/detail',item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img wait_order">
                    已接单
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间：{{item.or_delivery_time}}</p>
                </div>
              </div>
              <!--<div class="btn_item_box">
                <div class="onebtn">
                  <mt-button v-bind:class="btnClass.cancle" @click="cancle(item.id)">取消订单</mt-button>
                </div>
              </div>-->
            </template>
          </div>
        </div>
      </mt-loadmore>
      <div class="pay_window_box" v-if="payWindow.show">
        <div class="pay_window_bg" v-if="payWindow.state==1">
          <span class="close_icon" @click="closePay">&nbsp;</span>
          <h3>支付</h3>
          <p class="num">￥{{pay.number}}</p>
          <div class="item_box">
            <span class="title">付款账户</span>
            <span class="content">{{pay.account}}</span>
          </div>
          <div class="item_box">
            <span class="title">付款方式</span>
            <span class="content">{{pay.type}}</span>
          </div>
          <div class="item_box">
            <span class="title">账户余额</span>
            <span class="content">{{pay.yuer}}</span>
          </div>
          <div class="item_box">
            <span class="title">安全密码</span>
            <input type="password" placeholder="请输入安全密码" v-model="pay.password">
          </div>
          <div class="btn_box">
            <mt-button @click="paymoney()">确定付款</mt-button>
          </div>
        </div>
        <div class="pay_window_bg" v-if="payWindow.state==2">
          <span class="close_icon" @click="closePay">&nbsp;</span>
          <h3>支付</h3>
          <p class="num">&nbsp;</p>
          <p class="result">{{resultMsg.result}}</p>
          <p class="info">{{resultMsg.info}}</p>
          <div class="btn_box">
            <mt-button @click="go(resultMsg.path)">{{resultMsg.btnMsg}}</mt-button>
          </div>
        </div>
      </div>
      <div class="addPrice_box" v-if="alert_Addprice_box.state">
        <div class="bg">
          <h3>加价填写</h3>
          <div class="item_box">
            <div class="left">
              订单原价:
            </div>
            <div class="right">
              <p class="price">
                ¥ {{alert_Addprice_box.nowprice}}
              </p>
            </div>
          </div>
          <div class="item_box">
            <div class="left">
              加价数额：
            </div>
            <div class="right">
              <input type="text" placeholder="请输入您想要增加的金额" v-model="alert_Addprice_box.maprice">
            </div>
          </div>
          <div class="item_box">
            <div class="left">
              安全密码：
            </div>
            <div class="right">
              <input type="password" placeholder="请输入您的安全密码" v-model="alert_Addprice_box.saltword">
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
          <mt-button v-bind:class="bindClass.submit" @click="submit_upprice()">提交请求</mt-button>
          <span class="close_icon" @click="alert_Addprice_box_close()">&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'XiaWaitSend',
    data(){
      return{
        allLoaded:false,
        bindClass:{
          addPrice:'addPrice',
          order:'order',
          submit:"sub"
        },
        pageDate:{
          page:1,
          pages:1
        },
        alert_Addprice_box:{
          state:false,
          id:"",
          maprice:"",
          saltword:"",
          nowprice:""
        },
        btnClass:{
          receive:"receive",
          cancle:"cancle"
        },
        pay:{
          number:"",
          account:'',
          type:'余额',
          password:"",
          yuer:"0",
          id:""
        },
        payWindow:{
          show:false,
          state:1
        },
        resultMsg:{
          result:"支付失败",
          info:"账户余额不足，无法完成支付，请充值",
          btnMsg:"去充值",
          path:"/rechange"
        },
        OrderList:[
        ]
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapActions(['BottomNavStateShow','BottomNavStateHide']),
      // 上拉加载
      loadBottom() {
     // // 加载更多数据
        if(this.pageDate.page==this.pageDate.pages){
          this.$toast("已到最后一页")
          this.$refs.loadmore.onBottomLoaded();
        }else {
          const _this=this;
          let datalist=this.OrderList;
          this.pageDate.page++;
           this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'5'},{page:this.pageDate.page})})
             .then(
               res=>{
                 if(res.data.code==200){
                   this.pageDate.pages=res.data.data.pages;
                   this.OrderList=res.data.data.list.map(function (item) {
                     let status=item.is_pay;
                     if(item.status==1){
                       switch (status) {
                         case 0:
                           item.state="1";
                           break;
                         case 1:
                           item.state="2";
                           break;
                         default :
                           break;
                       }
                     }
                     if(item.status==5){
                       item.state="4"
                     }
                     return item;
                   });
                 }else {
                   if(res.data.code==205){
                     this.OrderList=[]
                   }
                 }
               }
             ).then(
               function () {
                 _this.OrderList=_this.OrderList.concat(datalist);
                 _this.$refs.loadmore.onBottomLoaded();
               }
           )
        }
      },
      //下拉刷新
      loadTop() {
        this.pageDate.page=1;
        this.getorderlist("",this.$refs.loadmore.onTopLoaded())
      // 加载更多数据
      },
      //开始搜索
      beginSearch(val){
        this.getorderlist(val)
      },
      go(path,id){
        this.$router.push({path:path,query:{id:id,type:2}})
      },
      //立即加价弹窗
      alert_Addprice(id,nowprice){
        this.alert_Addprice_box.state=true;
        this.alert_Addprice_box.id=id;
        this.alert_Addprice_box.nowprice=nowprice;
        this.BottomNavStateHide();
      },
      //立即加价弹框关闭
      alert_Addprice_box_close(){
        this.alert_Addprice_box.state=false;
        this.BottomNavStateShow();
      },
      //立即加价事件
      submit_upprice(){
          this.$http({method:"post",url:"/api/order/jia",data:Object.assign({},{token:this.userInfo.token},this.alert_Addprice_box)})
            .then(
              res=>{
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                  this.alert_Addprice_box.saltword=""
                  this.alert_Addprice_box_close()
                  this.getorderlist()
                }else {
                  this.$toast(res.data.msg)
                  this.alert_Addprice_box_close()
                }
              }
            )
      },
      //立即付款事件
      openpay(id){
        this.openPay();
        this.BottomNavStateHide();
        this.getorderinfo(id)
      },
      //取消订单事件
      cancle(id){
        //取消订单操作
          this.$http({method:"post",url:"/api/order/cancel_order",data:{token:this.userInfo.token,id:id}})
            .then(
              res=>{
                console.log(res)
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                 this.getorderlist()
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
      },
      //关闭付款窗口
      closePay(){
        this.payWindow.show=false;
        this.BottomNavStateShow();
      },
      // 打开付款窗口
      openPay(){
        this.payWindow.show=true;
      },
      //获取订单信息函数
      getorderinfo(id){
        this.pay.id=id;
        this.$http({method:"post",url:"/api/index/pay_view",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.pay.account=res.data.data.pay_num
                this.pay.number=res.data.data.total
                this.pay.yuer=res.data.data.money
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      // 改变付款窗口状态
      changeState(){
        this.payWindow.state=2;
      },
      //支付
      paymoney(){
        console.log(Object.assign({},{token:this.userInfo,saltword:this.pay.password,id:this.pay.id}))
        this.$http({method:"post",url:"/api/index/pay_order",data:{token:this.userInfo.token,saltword:this.pay.password,id:this.pay.id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg);
                this.closePay()
                this.getorderlist()
                this.pay.password=""
              }else {
                this.$toast(res.data.msg);
                if(res.data.code==208){
                  this.changeState();
                  return
                }
                if(res.data.code==207){
                  this.$toast(res.data.msg)
                  return
                }
                if(res.data.code==204){
                  this.$toast(res.data.msg)
                }
              }
            }
          )
      },
      //获取订单列表函数
      getorderlist(data,next){
        this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'5'},data?data:{})})
          .then(
            res=>{
              console.log(res);
              if(res.data.code==200){
                this.pageDate.pages=res.data.data.pages;
                this.OrderList=res.data.data.list.map(function (item) {
                  let status=item.is_pay;
                 if(item.status==1){
                   switch (status) {
                     case 0:
                       item.state="1";
                       break;
                     case 1:
                       item.state="2";
                       break;
                     default :
                       break;
                   }
                 }
                 if(item.status==5){
                   item.state="4"
                 }
                  return item;
                });
              }else {
                if(res.data.code==205){
                  this.OrderList=[]
                }
              }
            }
          ).then(
            function (next) {
              if(next){
                next();
              }
            }
        )
      }
    },
    created () {
      this.getorderlist()
    }
  }
</script>

<style lang="scss" scoped>
  .orders_box{
    padding: 0.8rem;
    box-sizing: border-box;
    margin-bottom: 3rem;
    .item_box{
      border: 1px solid rgba(223, 223, 229, 1);
      border-radius: 8px;
      padding: 1rem 0.8rem 0;
      box-sizing: border-box;
      box-shadow: 1px 2px 1px rgba(223, 223, 229, 1);
      margin-bottom: 1rem;
      .head{
        p{
          position: relative;
          text-align: left;
          .order_num{
            color: rgba(111, 113, 118, 1);
            font-size: 0.8rem;
          }
          .price{
            position: absolute;
            top: 0rem;
            right: 0rem;
            color: rgba(227, 0, 0, 1);
            font-size: 1.1rem;
            font-weight: bold;
          }
        }
      }
      .body{
        padding-top: 1rem;
        text-align: left;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(223, 223, 229, 1);
        overflow: hidden;
        padding-bottom: 0.8rem;
        .left{
          float: left;
          width: 1.5rem;
          padding-top: 0.2rem;
          .fonts{
            box-sizing: border-box;
            width: 1.5rem;
            height: 1.5rem;
            color: rgba(250, 103, 52, 1);
            border:1px solid rgba(250, 103, 52, 1);
            border-radius: 0.75rem;
            text-align: center;
            line-height: 1.5rem;
          }
        }
        .right{
          float: left;
          width: calc(100% - 1.5rem);
          box-sizing: border-box;
          padding-left: 0.5rem;
          position: relative;
          .info_img{
            position: absolute;
            right: 0.6rem;
            top: 0;
            height:3.4rem;
            box-sizing: border-box;
            padding-top: 2.5rem;
            background: url("../../assets/img/unpaid.png") no-repeat center 0rem/100%;
            color: rgba(181, 181, 191, 1);
            font-size: 0.9rem;
          }
          .wait_order{
            background: url("../../assets/img/wait_order.png") no-repeat center 0rem/85%;
          }
          .refuse_order{
            background: url("../../assets/img/order_refuse.png") no-repeat center 0rem/85%;
          }
          p{
            padding: 0.25rem 0;
          }
          .order_info{
            color: rgba(0, 0, 0, 1);
            font-size: 0.95rem;
          }
          .address{
            color: rgba(111, 113, 118, 1);
            font-size: 0.8rem;
          }
          .time{
            color: rgba(13, 127, 232, 1);
            font-size: 0.95rem;
          }
          .addinfo{
            color: #fa6734;
            font-size: 0.95rem;
          }
        }
      }
      .btn_item_box{
        margin: 0.5rem 0;
        .onebtn{
         .cancle{
           height: 1.8rem;
           line-height: 1.8rem;
           font-size: 1rem;
           color: rgba(68, 68, 68, 1);
           background: #ffffff;
           border: none;
         }
        }
        .btn{
          width: 49%;
          display: inline-block;
          box-sizing: border-box;
          .receive{
            height: 1.8rem;
            line-height: 1.8rem;
            font-size: 1rem;
            color: rgba(250, 103, 52, 1);
            background: #ffffff;
            border: none;
            box-shadow: none;
            .red_circular{
              background: red;
              display: inline-block;
              width: 0.5rem;
              border-radius: 0.25rem;
              height: 0.5rem;
              margin-right: 0.3rem;
              vertical-align: middle;
            }
          }
          .cancle{
            height: 1.8rem;
            line-height: 1.8rem;
            font-size: 1rem;
            color: rgba(68, 68, 68, 1);
            background: #ffffff;
            border: none;
            box-shadow: none;
          }
        }
        .btn:first-child{
          border-right: 1px solid rgba(223, 223, 229, 1);
        }
      }
    }
  }
  .img_box{
    box-sizing: border-box;
    padding: 5rem 5rem 0 5rem;
    img{
      width: 100%;
    }
  }
  .info{
    margin-top: 2rem;
    color: rgba(135, 127, 127, 1);
    font-size: 1.1rem;
  }
  .pay_window_box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    .pay_window_bg{
      padding: 0.8rem;
      background: #ffffff;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .close_icon{
        background: url("../../assets/img/addprice_close.png") no-repeat center/2.5rem 2.5rem;
        width: 3rem;
        display: block;
        position: absolute;
        right: 0.8rem;
        top: 0.8rem;
      }
      h3{
        font-size: 1.1rem;
        color: rgba(0, 0, 0, 1);
        padding-bottom: 0.9rem;
        border-bottom: 1px solid rgba(223, 223, 229, 1);
      }
      .num{
        font-size: 2rem;
        color: rgba(0, 0, 0, 1);
        font-weight: bold;
        padding: 0.8rem 0;
      }
      .result{
        color: rgba(250, 103, 52, 1);
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
      .info{
        color: rgba(111, 113, 118, 1);
        font-size: 1rem;
        margin-bottom: 2rem;
      }
      .item_box{
        font-size: 1rem;
        height: 3rem;
        box-sizing: border-box;
        line-height: 3rem;
        border-bottom: 1px solid rgba(223, 223, 229, 1);
        .title{
          color: rgba(111, 113, 118, 1);
          display: inline-block;
          width: 30%;
        }
        .content{
          display: inline-block;
          width: 68%;
          text-align: right;
        }
        input{
          text-indent: 0.3rem;
          width: 68%;
          text-align: right;
          font-size: 1rem;
          outline: none;
          border: none;
          box-sizing: border-box;
        }
      }
      .btn_box{
        margin: 1.5rem 0;
        .mint-button{
          background: rgba(250, 103, 52, 1);
          color: #fff;
          height: 2.8rem;
          line-height: 2.8rem;
          border-radius: 1.4rem;
          font-size: 0.9rem;
          width: 45%;
        }
      }
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
