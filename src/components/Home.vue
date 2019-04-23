<template>
  <div class="hello">
    <div class="font">花团</div>
    <div class="swiper_box">
      <mt-swipe :show-indicators="true" :auto='5000'>
        <mt-swipe-item v-for="(item,index) in bannerArray" :key="index"><img :src="item.imgurl" alt=""></mt-swipe-item>
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
        <mt-swipe :auto='1000' :speed='10000' :show-indicators="false" :prevent="true">
          <mt-swipe-item v-for="(item,index) in PublicMessageArray" :key="index">
            <div v-html="item.content"></div>
          </mt-swipe-item>
        </mt-swipe>
    </div>
    <!--平台公告end-->
    <!--推荐花店-->
    <div class="recommenddation_box">
      <div class="title_box">
        <h3><span>推荐花店</span></h3>
        <p>Recommendation</p>
      </div>
      <Recommendation :ShopArry="flowerShopArray"></Recommendation>
      <div style="border-bottom: 10px solid rgba(242, 243, 245, 1)">
        <mt-button class="more" @click="go({path:'/findflower'})">查看更多</mt-button>
      </div>
    </div>
    <!--推荐花店end-->
    <div class="transaction_order_box">
      <div class="title_box">
        <h3><span>成交订单</span></h3>
        <p>Transaction Order</p>
      </div>
      <div class="order_box">
        <div class="order_item" v-for="(item,index) in SuccessOrders" :key="index">
          <span class="order_address">{{item.dizhi}}</span>
          <span class="order_number">￥{{item.or_flower_total}}</span>
          <span class="order_user_name">{{item.or_shou_name}}</span>
          <span class="order_time">{{item.create_time}}</span>
        </div>
        <div class="nomore" v-if="SuccessOrders.length<4&&SuccessOrders.length>0">没有更多订单了！</div>
        <div class="nomore" v-if="SuccessOrders.length==0">暂时没有订单！</div>
      </div>
    </div>
    <BottomNav></BottomNav>
    <div id="bdtts_div_id">
      <audio id="tts_autio_id" autoplay="autoplay">
        <source id="tts_source_id"
                src="http://tts.baidu.com/text2audio?lan=zh&amp;ie=UTF-8&amp;spd=5&amp;per=0&amp;text=''"
                type="audio/mpeg">
        <embed id="tts_embed_id" height="0" width="0" src="">
      </audio>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from  'vuex';
import  Recommendation from './publicComponents/RecommendDation';
export default {
  name: 'Home',
  data () {
    return {
      bannerArray:[],
      flowerShopArray:[],
      infoArry:
        [
        {message:'花匠用心严选',src:require('../assets/img/index_info_1.png')},
        {message:'实时精准配送',src:require('../assets/img/index_info_2.png')},
        {message:'优质售后服务',src:require('../assets/img/index_info_3.png')},
        ],
      CenterNavArry:[
        {message:'抢订单',path:"/getorders",src:require('../assets/img/index_getorder.png')},
        {message:'下订单',path:"/addorders",src:require('../assets/img/index_serorder.png')},
        {message:'找花店',path:"/findflower",src:require('../assets/img/index_searchorder.png')},
        {message:'关于我们',path:"/aboutus",src:require('../assets/img/index_aboutus.png')}
      ],
      SuccessOrders:[
        // {or_shou_name:"李某某",dizhi:'河南省郑州市中原区棉纺西路等等等等等',or_flower_total:280,create_time:'2019-01-30 13:25'},
      ],
      PublicMessageArray:[],
    }
  },
  components:{
    Recommendation
  },
  computed:{
  ...mapState(['userInfo','timer'])
  },
  methods:{
    ...mapActions(['setActiveIndex','setTimer','clearTimer']),
    //  新订单提醒
    orderNotice:function () {
      if(this.timer){this.clearTimer()}
      let token=this.userInfo.token
      const _this=this
      this.setTimer(setInterval(
        function () {
          if(token){
            _this.$http({method:'post',url:"/api/user/get_new_order",data:{token:token}})
              .then(res=>{
                console.log(1)
                console.log(res)
                if(res.data.code==200){
                  let content=res.data.msg
                  _this.$toast(content)
                  _this.playSound(content)
                }
              })
          }
        },10000
      ))
    },
    //  语音播报
    playSound:function (ttsText) {
      var ttsDiv = document.getElementById('bdtts_div_id');
      var ttsAudio = document.getElementById('tts_autio_id');
      // 文字转语音
      ttsDiv.removeChild(ttsAudio);
      var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
      var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=0&spd=5&text=' + ttsText + '" type="audio/mpeg">';
      var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
      var au2 = '</audio>';
      ttsDiv.innerHTML = au1 + sss + eee + au2;
      ttsAudio = document.getElementById('tts_autio_id');
      ttsAudio.play();
    },
    go(obj={path:'/',index: 0}){
      this.$router.push({path:obj.path})
      switch (obj.index) {
        case 0:
          this.setActiveIndex(2);
          break
        default :
          break
      }
    }
  },
  created(){
    this.orderNotice()
    this.$http({method:"post",url:"/api/index/index",data:{token:this.userInfo.token,type:'1'}})
      .then(
        res=>{
          if(res.data.code==200){
            this.bannerArray=res.data.data.banner;
            this.flowerShopArray=res.data.data.list
            if(res.data.data.order){
              this.SuccessOrders=res.data.data.order
            }
            this.flowerShopArray=res.data.data.flower;
            this.PublicMessageArray=res.data.data.notice;
          }else {
            this.$toast("2")
          }
        }
      )
  },
  mounted () {
    if(this.$route.query.message){
      this.playSound(this.$route.query.message)
    }
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
      padding: 31px 0 10px;
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
      border-bottom: 10px solid rgba(242, 243, 245, 1);
      border-top: 10px solid rgba(242, 243, 245, 1);
      padding: 10px 1rem;
      height: 1.5rem;
      line-height: 1.5rem;
      color: #000000;
    }
    .title_box{
      text-align: center;
      font-family: FZ;
      h3{
<<<<<<< HEAD
        margin-top: 1.5rem;
        margin-right: 3.5rem;
        margin-left: 3.5rem;
        margin-bottom: 15px;
=======
        margin-right: 3.5rem;
        margin-left: 3.5rem;
        margin-bottom: 10px;
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
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
        margin-bottom: 15px;
      }
    }
    .transaction_order_box{
      padding: 0px 10px;
      .order_box{
        margin-top: 25px;
        padding: 2rem 1.5rem;
        box-sizing: border-box;
        background: url("../assets/img/index_order_box.png") no-repeat center/100% 100%;
        .nomore{padding-top: 1rem}
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
    .more{
      border:1px solid rgba(53, 66, 54, 1);
      height: 1.6rem;
      line-height: 1.6rem;
      box-sizing: border-box;
      font-size: 0.7rem;
      padding: 0 1.2rem;
      color: rgba(53, 66, 54, 1);
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
