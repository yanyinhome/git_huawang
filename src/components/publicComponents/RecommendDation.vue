<template>
  <div class="flow_shop_box">
      <div class="shop_item" v-for="(item,index) in ShopArry" :key="index">
        <div class="img_box">
          <img :src="item.src" alt="">
        </div>
        <div class="message_box">
          <span class="orders_info"><span class="num_color">{{item.TotalOrders}}</span>&nbsp;总接单</span>
          <p class="head">{{item.name}}</p>
          <p class="address">地址：{{item.address}}</p>
          <span class="phone_box">{{item.phone}}</span>
          <span class="qq_box">{{item.qq}}</span>
        </div>
      </div>
      <div>
        <mt-button>查看更多</mt-button>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Recommendation',
    data(){
      return{
        ShopArry:[
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')},
          {name:"花店名称",address:"河南省金水区",phone:"13345699999",qq:'99999999999',TotalOrders:9562,src:require('../../assets/img/shop_card.png')}
        ]
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
      .img_box{
        padding-top: 1rem;
        height: 100%;
        float: left;
        width:20%;
        padding-right: 2%;
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
        float: left;
        width: 78%;
        position: relative;
        text-align: left;
        .orders_info{
          font-size: 0.85rem;
          color: rgba(36, 45, 36, 0.5);;
          position: absolute;
          top:5px;
          right: 1.3rem;
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
    .mint-button{
      border:1px solid rgba(53, 66, 54, 1);
      height: 1.3rem;
      font-size: 0.7rem;
      color: rgba(53, 66, 54, 1);
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
