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
            <div class="head">
              <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
            </div>
            <div class="body" @click="todetail(item.id)">
              <div class="left">
                <div class="fonts">
                  收
                </div>
              </div>
              <div class="right">
                <div class="info_img">
                  配送中
                </div>
                <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                <p class="address">{{item.dizhi}}</p>
                <p class="time">送达时间：{{item.or_delivery_time}}</p>
              </div>
            </div>
            <div class="btn_item_box">
              <div class="btn">
                <mt-button v-bind:class="btnClass.receive" @click="querenshouhuo(item.id)">确定收货</mt-button>
              </div>
              <div class="btn">
                <mt-button v-bind:class="btnClass.cancle"  @click="asktuikuan(item.id)">申请退款</mt-button>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'XiaSending',
    data(){
      return{
        btnClass:{
          receive:"receive",
          cancle:"cancle"
        },
        pageDate:{
          page:1,
          pages:1
        },
        allLoaded:false,
        OrderList:[
        ]
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      // 上拉加载
      loadBottom() {
        // // 加载更多数据
        if(this.pageDate.page==this.pageDate.pages){
          this.$toast("已到最后一页")
          this.$refs.loadmore.onBottomLoaded();
        }else {
          const _this=this;
          let datalist=this.OrderList;
          this.pageDate++;
          this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'8'},{page:this.pageDate.page})})
            .then(
              res=>{
                console.log(res)
                if(res.data.code==200){
                  this.pageDate.pages=res.data.data.pages;
                  this.OrderList=res.data.data.list;
                }else {
                  if(res.data.code==205){
                    this.OrderList=[];
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
        this.getlist("",this.$refs.loadmore.onTopLoaded())
        // 加载更多数据
      },
      //开始搜索
      beginSearch(val){
        this.getlist(val)
      },
      todetail(id){
        this.$router.push({path:"/detail",query:{id:id,type:"2"}})
      },
      querenshouhuo(id){
        this.$http({method:"post",url:'/api/order/confirm',data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              if(res.data.code==200){
                this.getlist()
              }else {
               this.$toast(res.data.msg)
               this.getlist()
              }
            }
          )
      },
      asktuikuan(id){
        this.$router.push({path:"/applyrefund",query:{id:id,type:"2"}})
      },
      getlist(data,next){
        this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'8'},data?data:{})})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.pageDate.pages=res.data.data.pages;
                this.OrderList=res.data.data.list;
              }else {
                if(res.data.code==205){
                  this.OrderList=[];
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
      this.getlist()
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
            background: url("../../assets/img/order_sending.png") no-repeat center 0.3rem/100%;
            color: rgba(181, 181, 191, 1);
            font-size: 0.9rem;
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
            padding-bottom: 0.8rem;
          }
        }
      }
      .btn_item_box{
        margin: 0.5rem 0;
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
</style>
