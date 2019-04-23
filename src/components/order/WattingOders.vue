<template>
  <div class="add_box">
    <div class="head_box">
      <h3>待接订单</h3>
    </div>
    <template v-if="!Orders.length">
      没有订单可接！
    </template>
    <template v-if="Orders.length">
      <div class="order_box" v-for="(item,index) in Orders" :key="index">
        <div class="up_box" @click="go('/orderdetail',item.id)">
          <div class="left_box">
            <img v-lazy="item.img" alt="">
          </div>
          <div class="right_box">
            <div class="title">
              {{item.dizhi}}
            </div>
            <p>
              花材信息：<span class="message">{{item.or_flower_info}}</span>
            </p>
            <p>
              送达时间：<span class="time">{{item.or_delivery_time}}</span>
            </p>
            <p>
              订单价格：<span class="price">￥{{item.or_flower_total}}</span>
            </p>
          </div>
        </div>
        <div class="bottom_box">
          <mt-button :class="bindClass.addPrice" @click="go('/orderdetail',item.id)">请求加价</mt-button>
          <mt-button :class="bindClass.order" @click="getorder(item.id)">立即抢单</mt-button>
        </div>
      </div>
    </template>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'WattingOders',
    data(){
      return{
        Orders:[
        ],
        bindClass:{
          addPrice:'addPrice',
          order:'order'
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      go(path,id){
        this.$router.push({path:path,query:{id:id}})
      },
      //抢单事件
      getorder(id){
        this.$http({method:"post",url:"/api/index/Grab",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
             if(res.data.code==200){
               this.$toast(res.data.msg)
               this.getorderlist()
             }else {
               this.$toast(res.data.msg)
             }
            }
          )
      },
      //获取订单列表的函数
      getorderlist(){
        this.$http({method:"post",url:"/api/index/qiangdan",data:{token:this.userInfo.token}})
          .then(
            res=>{
              if(res.data.code==200){
                this.Orders=res.data.data.daiorder
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      }
    },
    created () {
      const _this=this;
      this.$http({method:"post",url:"/api/index/qiangdan",data:{token:this.userInfo.token}})
        .then(
          res=>{
            console.log(res)
            if(res.data.code==200){
              this.Orders=res.data.data.daiorder
            }else {
              this.$toast(res.data.msg)
              setTimeout(function () {
                _this.$router.back(-1)
              },1000)
            }
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
.head_box{
    padding-top: 1rem;
    box-sizing: border-box;
    h3{
      font-size: 1.2rem;
      margin-top: 0rem;
      padding:10px 0;
      color: #000000;
      /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/
    }

  }
.order_box{
  border-top: 10px solid rgba(242, 243, 245, 1);
  padding: 0.8rem 0;
  .up_box{
    padding: 0.8rem 0;
    margin: 0 15px;
    border-bottom: 1px solid rgba(223, 223, 229, 1);
    overflow: hidden;
    box-sizing: border-box;
    .left_box{
      width: 30%;
      float: left;
      /*height: 5.5rem;*/
      /*line-height: 5.5rem;*/
      overflow: hidden;
      box-sizing: border-box;
      img{
        width: 5.5rem;
        height: 5.5rem;
        overflow: hidden;
      }
    }
    .right_box{
      /*height: 5.5rem;*/
      overflow: hidden;
      width: 70%;
      float: left;
      font-size: 0.85rem;
      text-align: left;
      box-sizing: border-box;
      padding-left: 0.3rem;
      .title{
        font-weight: bold;
      }
      p{
        color: rgba(0, 0, 0, 1);
        margin: 0.3rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .time{
          color: rgba(13, 127, 232, 1);
        }
        .price{
          color: rgba(227, 0, 0, 1);
        }
      }
    }
  }
  .bottom_box{
    padding: 0.8rem 0;
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
}
</style>
