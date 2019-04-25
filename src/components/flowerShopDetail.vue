<template>
  <div>
    <ReturnHead class="flower_head" head_name="花店详情"></ReturnHead>
    <div class="img_box">
      <img src="../assets/img/example.png" alt="">
    </div>
    <div class="info_box">
      <h3>{{flowerShopInfo.fl_name}} <span class="total_orders"><span class="num">{{flowerShopInfo.fl_order_num}}</span>总接单</span></h3>
      <p>地址：{{flowerShopInfo.dizhi}}</p>
      <p>近三个月<span style="color:#fa6734">{{flowerShopInfo.ordercount}}</span>单</p>
    </div>
    <div class="contact">
      <div class="left">
        联系商家:
      </div>
      <div class="right">
        <div class="phone"><span class="show">{{flowerShopInfo.fl_phone}}</span><a :href="'tel:'+flowerShopInfo.fl_phone" id="phone">立即拨打</a></div>
        <div class="qq"><span class="show">{{flowerShopInfo.fl_qq}}</span><a target="_blank" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+flowerShopInfo.fl_qq+'&version=1&src_type=web&web_src=lvlingseeds.com'">qq交谈</a></div>
      </div>
    </div>
    <div class="detail_box">
      <h3>花店简介</h3>
      <p class="dec">
        {{flowerShopInfo.fl_content}}
      </p>
    </div>
  </div>
</template>

<script>
  import {mapState} from  "vuex"
  export default {
    name: 'flowerShopDetail',
    data(){
      return{
        flowerShopInfo:{
        },
        WriterOrderData:{
          or_buy_name:"",
          or_buy_phone:"",
          or_shou_name:"",
          or_shou_phone:"",
          or_shou_province:"",
          or_shou_city:"",
          or_shou_area:"",
          or_shou_address:"",
          or_delivery_type:"2",
          or_delivery_time:"2019-3-22 18:30",
          or_flower_info:"",
          or_flower_img:"",
          or_flower_num:"",
          or_flower_price:"",
          or_flower_content:""
        },
        imgIdArray:[],
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      xiadan(){
        //or_fl_id
        this.WriterOrderData.or_flower_img=this.imgIdArray.join(',')
        console.log(this.WriterOrderData)
        if(!this.WriterOrderData.or_buy_name){
          this.$toast('请输入订花人姓名')
          return;
        }
        if(!this.WriterOrderData.or_buy_phone){
          this.$toast('请输入订花人电话')
          return;
        }
        if(!this.WriterOrderData.or_delivery_time){
          this.$toast('请输入下单时间')
          return;
        }
        if(!this.WriterOrderData.or_flower_info){
          this.$toast('请输入花卉描述')
          return;
        }
        if(!this.WriterOrderData.or_flower_img){
          this.$toast('请上传花卉图片')
          return;
        }
        if(!this.WriterOrderData.or_flower_num){
          this.$toast('请输入花卉数量')
          return;
        }
        if(!this.WriterOrderData.or_flower_price){
          this.$toast('请输入价格')
          return;
        }
        if(!this.WriterOrderData.or_shou_address){
          this.$toast('请输入详细地址')
          return;
        }
        if(!this.WriterOrderData.or_shou_area){
          this.$toast('请选择区域')
          return;
        }
        if(!this.WriterOrderData.or_shou_city){
          this.$toast('请选择城市')
          return;
        }
        if(!this.WriterOrderData.or_shou_name){
          this.$toast('请选择收货人姓名')
          return;
        }
        if(!this.WriterOrderData.or_shou_phone){
          this.$toast('请选择收货人电话')
          return;
        }
        if(!this.WriterOrderData.or_shou_province){
          this.$toast('请选择省份')
          return;
        }
        this.$http({method:'post',url:"/api/index/place_order",data:Object.assign({},{token:this.userInfo.token},{fl_id:this.$route.query.id},{point:"1"},this.WriterOrderData)})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res,'xiadan')
                this.WriterOrderData={
                  or_buy_name:"",
                  or_buy_phone:"",
                  or_shou_name:"",
                  or_shou_phone:"",
                  or_shou_province:"",
                  or_shou_city:"",
                  or_shou_area:"",
                  or_shou_address:"",
                  or_delivery_type:"2",
                  or_delivery_time:"2019-3-22 18:30",
                  or_flower_info:"",
                  or_flower_img:"",
                  or_flower_num:"",
                  or_flower_price:"",
                  or_flower_content:""
                }
                this.$router.push('/addorders')
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      }
    },
    created () {
      if(window.sessionStorage.WriterOrderData){
        this.WriterOrderData=JSON.parse(window.sessionStorage.WriterOrderData)
      }
      if(window.sessionStorage.imgIdArray){
        this.imgIdArray=window.sessionStorage.imgIdArray.split(' ')
      }
      this.$http({method:"post",url:"/api/flower/serch_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
        .then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.flowerShopInfo=res.data.data[0]
          }
        })
      console.log(this.$route.query)
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
    padding: 1rem;
    p{
      text-align: left;
      height: 3.4rem;
      line-height: 3.4rem;
      font-weight: bold;
    }
    h3{
      text-align: left;
      .total_orders{
        float: right;
        display: block;
        font-size:0.7rem;
        color:rgba(111, 113, 118, 1);
        .num{
        color: rgba(250, 103, 52, 1);
      }
      }
    }
    border-bottom: 1px solid rgba(242, 243, 245, 1);
  }
  .contact{
    padding: 1rem;
    overflow: hidden;
    border-bottom: 1px solid rgba(242, 243, 245, 1);
    .left{
      width: 27%;
      float: left;
      text-align: left;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
      vertical-align: top;
    }
    .right{
      width: 73%;
      float: right;
      text-align: left;
      .show{
        display: inline-block;
        width: 8rem;
      }
      .phone{
        margin-bottom: 0.8rem;
        padding-left: 1.5rem;
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        background: url("../assets/img/shop-phone.png") no-repeat left center/1rem 1rem;
        a{
          display: inline-block;
          width: 5rem;
          background:rgba(80, 146, 231, 1);
          color: #ffffff;
          text-align: center;
          font-size: 0.9rem;
          padding: 5px 0;
          border-radius: 5px;
        }
      }
      .qq{
        margin-bottom: 0.8rem;
        padding-left: 1.5rem;
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        background: url("../assets/img/shop-qq.png") no-repeat left center/1rem 1rem;
        a{
          border-radius: 5px;
          padding: 5px 0;
          font-size: 0.9rem;
          text-align: center;
          display: inline-block;
          width: 5rem;
          background:rgba(245, 88, 88, 1);
          color: #ffffff;
        }
      }
    }
  }
  .detail_box{
    h3{
      font-family: FZ;
      background:url("../assets/img/order_detail_left.png") no-repeat left center/4.8rem,url('../assets/img/order_detail_right.png') no-repeat right center/4.8rem;
      box-sizing: border-box;
      margin: 1rem 3rem;
    }
    .dec{
      text-align: left;
      padding: 1rem;
      text-indent: 1.5em;
    }
  }
  .btn_box{
    padding: 2rem 1rem;
    .xiadan_btn{
      width: 100%;
      color: #fff;
      line-height: 2.4rem;
      font-size: 0.95rem;
      height: 2.4rem;
      border-radius: 1.2rem;
      background: #FA6734;
    }
  }
</style>
