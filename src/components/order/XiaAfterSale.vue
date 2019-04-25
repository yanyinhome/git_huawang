<template>
  <div>
    <OrderSearch @beginSearch="beginSearch"></OrderSearch>
    <div v-if="OrderList.length==0" style="margin-bottom: 5rem">
      <div class="img_box">
        <img src="../../assets/img/order_noorder.png" alt="">
      </div>
      <div class="info">没有订单哦~~~</div>
    </div>
    <div v-if="OrderList.length!=0">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="orders_box">
          <div class="item_box" v-for="(item,index) in OrderList" :key="index">
            <template v-if="item.state==0">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="gorefunddetail(item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    待处理
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间:{{item.or_delivery_time}}</p>
                  <p class="time">配送完成时间:{{item.songda_time}}</p>
                </div>
              </div>
            </template>
            <template v-if="item.state==1">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="gorefunddetail(item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    已退款
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间:{{item.or_delivery_time}}</p>
                  <p class="time">配送完成时间:{{item.songda_time}}</p>
                </div>
              </div>
              <div class="result_img agree" @click="gorefunddetail(item.id)">&nbsp;</div>
            </template>
            <template v-if="item.state==2">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="gorefunddetail(item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    已拒绝
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间:{{item.or_delivery_time}}</p>
                  <p class="time">配送完成时间:{{item.songda_time}}</p>
                </div>
              </div>
              <div class="result_img refuse" @click="gorefunddetail(item.id)">&nbsp;</div>
            </template>
            <template v-if="item.state==3">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="gorefunddetail(item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    平台退款
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间:{{item.or_delivery_time}}</p>
                  <p class="time">配送完成时间:{{item.songda_time}}</p>
                </div>
              </div>
              <div class="result_img agree" @click="gorefunddetail()">&nbsp;</div>
            </template>
            <template v-if="item.state==4">
              <div class="head">
                <p><span class="order_num">订单编号：{{item.or_number}}</span><span class="price">￥{{item.or_flower_total}}</span></p>
              </div>
              <div class="body" @click="gorefunddetail(item.id)">
                <div class="left">
                  <div class="fonts">
                    收
                  </div>
                </div>
                <div class="right">
                  <div class="info_img">
                    平台完成
                  </div>
                  <p class="order_info"><span>{{item.or_shou_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.or_shou_phone}}</span></p>
                  <p class="address">{{item.dizhi}}</p>
                  <p class="time">送达时间:{{item.or_delivery_time}}</p>
                  <p class="time">配送完成时间:{{item.songda_time}}</p>
                </div>
              </div>
              <div class="result_img refuse" @click="gorefunddetail(item.id)">&nbsp;</div>
            </template>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'XiaAfterSale',
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
          this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'12'},data)})
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
      gorefunddetail(id){
        this.$router.push({path:'/refunddetail',query:{id:id,type:2}})
      },
      getlist(data){
        this.$http({method:"post",url:"/api/order/order",data:Object.assign({},{token:this.userInfo.token,type:"2",flag:'12'},data?data:{})})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.pageDate.pages=res.data.data.pages;
                this.OrderList=res.data.data.list.map(
                  function (item) {
                    if(item.status==12){
                      item.state=0
                    }
                    if(item.status==13){
                      item.state=1
                    }
                    if(item.status==14||item.status==15){
                      item.state=2
                    }
                    if(item.status==16){
                      //强制退款
                      item.state=3
                    }
                    if(item.status==17){
                      //强制完成
                      item.state=4
                    }
                    return item
                  }
                )
              }else {
                if(res.data.code==205){
                  this.OrderList=[]
                }
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
      position: relative;
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
        overflow: hidden;
        margin-bottom: 0.8rem;
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
            background: url("../../assets/img/after_sale.png") no-repeat center top/80%;
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
            color: rgba(0, 0, 0, 1);
            font-size: 0.95rem;
          }
        }
      }
      .result_img{
        position: absolute;
        left: 4rem;
        top:3rem;
        width: 6rem;
        height: 6rem;
      }
      .refuse{
        background: url("../../assets/img/refuse_refund.png") center center/cover;
      }
      .agree{
        background: url("../../assets/img/agree_refund.png") center center/cover;
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
