<template>
  <div class="hello">
    <div class="font">花团帮</div>
    <div class="swiper_box">
      <mt-swipe :show-indicators="true" :auto='5000'>
        <mt-swipe-item><img src="../assets/img/banner.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/img/banner.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/img/banner.png" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <!--中间的提示信息-->
    <div class="swiper_info">
      <div class="info_item" v-for="(item,index) in infoArry" :key="index" >
        <span :style="{background:`url(${item.src}) no-repeat left/1rem 1rem`}">{{item.message}}</span>
      </div>
    </div>
    <!--中间的提示信息end-->
    <!--中部导航-->
      <div class="center_nav_box">
        <div class="nav_item" v-for="(item,index) in CenterNavArry" :key="index" @click="go({path:item.path,index:index})">
          <img :src="item.src" alt=""><br>
          <span>{{item.message}}</span>
        </div>
      </div>
    <!--中部导航end-->
    <!--平台公告-->
    <div class="public_message">
      <p>{{PublicMessage}}</p>
    </div>
    <!--平台公告end-->
    <!--推荐花店-->
    <div class="recommenddation_box">
      <div class="title_box">
        <h3><span>推荐花店</span></h3>
        <p>Recommendation</p>
      </div>
      <Recommendation></Recommendation>
    </div>
    <!--推荐花店end-->
    <div class="transaction_order_box">
      <div class="title_box">
        <h3><span>成交订单</span></h3>
        <p>Transaction Order</p>
      </div>
      <div class="order_box">
        <div class="order_item" v-for="(item,index) in SuccessOrders" :key="index">
          <span class="order_address">{{item.address}}</span>
          <span class="order_number">￥{{item.number}}</span>
          <span class="order_user_name">{{item.username}}</span>
          <span class="order_time">{{item.time}}</span>
        </div>
      </div>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import {mapState,mapActions} from  'vuex';
import  Recommendation from './publicComponents/RecommendDation';
export default {
  name: 'Home',
  components:{
  },
  data () {
    return {
      infoArry:
        [
        {message:'花匠用心严选',src:require('../assets/img/index_info_1.png')},
        {message:'实时精准配送',src:require('../assets/img/index_info_2.png')},
        {message:'优质售后服务',src:require('../assets/img/index_info_3.png')},
        ],
      CenterNavArry:[
        {message:'抢订单',path:"/order",src:require('../assets/img/index_getorder.png')},
        {message:'下订单',path:"/order",src:require('../assets/img/index_serorder.png')},
        {message:'找花店',path:"/findflower",src:require('../assets/img/index_searchorder.png')},
        {message:'关于我们',path:"/aboutus",src:require('../assets/img/index_aboutus.png')}
      ],
      SuccessOrders:[
        {username:"李某某",address:'河南省郑州市中原区棉纺西路等等等等等',number:280,time:'2019-01-30 13:25'},
        {username:"李某某",address:'河南省郑州市中原区棉纺西路等等等等等',number:280,time:'2019-01-30 13:25'},
        {username:"李某某",address:'河南省郑州市中原区棉纺西路等等等等等',number:280,time:'2019-01-30 13:25'},
        {username:"李某某",address:'河南省郑州市中原区棉纺西路等等等等等',number:280,time:'2019-01-30 13:25'}
      ],
      PublicMessage:'平台将于2019年1月30日下午13:00进行维护，请各位用户注意'
    }
  },
  components:{
    Recommendation
  },
  computed:{

  },
  methods:{
    ...mapActions(['setActiveIndex']),
    go(obj={path:'/',index: 0}){
      this.$router.push({path:obj.path})
      switch (obj.index) {
        case 0: case 1:
          this.setActiveIndex(1);
          break
        case  2:
          this.setActiveIndex(0);
          break
        case  3:
          this.setActiveIndex(2);
        default :
          break
      }
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    margin-bottom: 4rem;
    .swiper_box {
      height: 11rem;
      position: relative;
      .mint-swipe {
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .font{
      font-family: FZ;
      color: #FA6734;
      line-height: 1.5em;
      font-size: 1.3rem;
    }
    .swiper_info{
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      padding: 0 10px;
      box-sizing: border-box;
      .info_item{
        width: 33.3%;
        box-sizing: border-box;
        float: left;
        text-align: center;
        span{
          padding-left: 1.3rem;
          font-size: 0.7rem;
          color: #333;
        }
      }
    }
    .center_nav_box{
      padding: 10px 10px 0;
      height: 5.5rem;
      overflow: hidden;
      box-sizing: border-box;
      .nav_item{
        width: 25%;
        text-align: center;
        float: left;
        box-sizing: border-box;
        img{
          width: 2rem;
          height: 2rem;
          padding-bottom: 3px;
        }
        span{
          font-size: 0.9rem;
          color: #000;
          font-weight: bold;
        }
      }
    }
    .public_message{
      p{
        overflow: hidden;
        height: 1.2rem;
        font-size: 1rem;
        margin: 0;
      }
    }
    .title_box{
      text-align: center;
      font-family: FZ;
      h3{
        margin-right: 3.5rem;
        margin-left: 3.5rem;
        margin-bottom: 10px;
        letter-spacing: 3px;
        background: url("../assets/img/index_line.png") repeat-x left center;
        span{
          background: #fff;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 1.2rem;
          color: #000;
        }
      }
      p{
        font-size: 0.7rem;
        color: #99782E;
        margin: 0;
        letter-spacing: 5px;
      }
    }
    .transaction_order_box{
      padding: 0px 10px;
      .order_box{
        margin-top: 25px;
        padding: 2rem 1.5rem;
        height: 16rem;
        box-sizing: border-box;
        background: url("../assets/img/index_order_box.png") no-repeat center/100% 100%;
        .order_item{
          border-bottom: 1px dashed rgba(151, 151, 151, 1);
          padding: 5px 0;
          span{
            color: rgba(0, 0, 0, 1);
            display: inline-block;
            font-size: 0.8rem;
            overflow: hidden;
          }
          .order_address{
            text-align: left;
            width: 70%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .order_number{
            width: 28%;
          }
          .order_user_name{
            color: rgba(250, 103, 52, 1);
            text-align: left;
            width: 55%;
          }
          .order_time{
            width: 43%;
          }
        }
        .order_item:last-child{
          border-bottom: 0;
        }
      }
    }
  }
</style>
