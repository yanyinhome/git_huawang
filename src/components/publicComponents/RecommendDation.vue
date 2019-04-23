<template>
  <div class="flow_shop_box">
      <div class="shop_item" v-for="(item,index) in ShopArry" :key="index" @click="go('/flowershopdetail',item.id)">
        <div class="img_box">
          <img :src="item.fl_logo" alt="">
        </div>
        <div class="message_box">
          <span class="orders_info"><span class="num_color">{{item.fl_order_num}}</span>&nbsp;总接单</span>
          <p class="head">{{item.fl_name}}</p>
          <p class="address">地址：{{item.dizhi}}</p>
          <span class="phone_box">{{item.fl_phone}}</span>
          <span class="qq_box">{{item.fl_qq}}</span>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Recommendation',
    props:{
      ShopArry:{
        type:Array,
        default:function () {
          return [
          ]
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      go(path,id){
        if(this.userInfo){
          this.$router.push({path:path,query:{id:id}})
        }else {
          this.$toast('您还没有登录，请先登录')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flow_shop_box{
    padding: 0 3%;
    .shop_item{
      padding-top: 0.5rem;
      box-sizing: border-box;
      height: 6rem;
      overflow: hidden;
      border-bottom: 1px solid #4D242D24;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 1px 1px 5px rgba(36, 45, 36, 0.3);
      .img_box{
        padding-top: 1rem;
        padding-left: 10px;
        box-sizing: border-box;
        text-align: left;
        height: 100%;
        float: left;
        width:20%;
        overflow: hidden;
        img{
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          box-sizing: border-box;
          border: 2px solid #354236;
        }
      }
      .message_box{
        float: right;
        width: calc(80% - 5px);
        position: relative;
        text-align: left;
        .orders_info{
          font-size: 0.85rem;
          color: rgba(36, 45, 36, 0.5);;
          position: absolute;
          top:5px;
          right: 10px;
          .num_color{
            color: #FA6734;
          }
        }
        p{
          margin: 5px 0px;
        }
        .head{
          font-size: 1rem;
          font-weight: bold;
          text-align: left;
        }
        .address{
          font-size: 0.85rem;
          text-align: left;
        }
        .phone_box{
          color: rgba(36, 45, 36, 0.5);
          padding-left: 1rem;
          font-size: 0.85rem;
          background: url("../../assets/img/shop-phone.png") no-repeat left/0.8rem 0.8rem;
          margin-right: 0.8rem;
        }
        .qq_box{
          color: rgba(36, 45, 36, 0.5);
          padding-left: 1rem;
          font-size: 0.85rem;
          background: url("../../assets/img/shop-qq.png") no-repeat left/0.8rem 0.8rem;
        }
      }
    }
  }
</style>
