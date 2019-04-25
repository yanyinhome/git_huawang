<template>
  <div>
      <div class="head_box">
        <h3><span @click="return_icon" class="return">&nbsp;</span>找花店</h3>
        <div class="search" @click="search"><span class="search_icon">&nbsp;</span><input type="text" placeholder="请输入QQ、花店名称、手机号" v-model="searchData.keyword"></div>
      </div>
      <div class="address">
        <AddressChoice @addressToParent="getAddress" :state="5" class="doble_border"></AddressChoice>
      </div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <Recommendation :shop-arry="shopLists"></Recommendation>
    </mt-loadmore>
  </div>
</template>

<script>
  import  Recommendation from './publicComponents/RecommendDation';
  import {mapState} from 'vuex';
  export default {
    name: 'FindFlower',
    data(){
      return{
        allLoaded:false,
        shopListsdata:{
          page:"1",
          pages:"1"
        },
        shopLists:[],
        searchData:{
          keyword:"",
          province:"",
          city:"",
          area:""
        }
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
          let datalist=this.shopLists;
          this.shopLists.page++;
          this.$http({method:"post",url:"/api/flower/serch_flower",data:Object.assign({},{token:this.userInfo.token},this.searchData,{page:this.shopLists.page})})
            .then(
              res=>{
                if(res.data.code==200){
                  this.shopListsdata.pages=res.data.data.pages;
                }else {
                  if(res.data.code==205){
                    this.shopLists=[]
                  }
                }
              }
            ).then(
            function () {
              _this.shopLists=_this.shopLists.concat(datalist);
              _this.$refs.loadmore.onBottomLoaded();
            }
          )
        }
      },
      //下拉刷新
      loadTop() {
        this.shopLists.page=1;
        this.$http({method:"post",url:"/api/flower/serch_flower",data:Object.assign({},{token:this.userInfo.token},{page:1})})
          .then(
            res=>{
              if(res.data.code==200){
                this.shopLists=res.data.data.list
                this.shopListsdata.pages=res.data.data.pages;
                this.$refs.loadmore.onTopLoaded()
              }else {
                this.$toast(res.data.msg)
                this.$refs.loadmore.onTopLoaded()
              }
            }
          )
        // 加载更多数据
      },
      return_icon(){
        this.$router.back(-1);
      },
      search(page="1"){
        this.$http({method:"post",url:"/api/flower/serch_flower",data:Object.assign({},{token:this.userInfo.token},this.searchData,{page:page})})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                if(res.data.data.list.length==0){
                  this.shopLists=[]
                }else {
                  this.shopLists=res.data.data.list
                  this.shopListsdata.pages=res.data.data.pages;
                }
              }else {
                this.shopLists=[]
                this.$toast(res.data.msg)
              }
            }
          )
      },
      getAddress(data){
        this.searchData.province=data.province;
        this.searchData.city=data.city;
        this.searchData.area=data.area;
      },
    },
    components:{
      Recommendation
    },
    created () {
      console.log(this.userInfo)
      this.$http({method:"post",url:"/api/flower/serch_flower",data:{token:this.userInfo.token,province:this.userInfo.province,city:this.userInfo.city}})
        .then(
          res=>{
            console.log('find',res)
            if(res.data.code==200){
              this.shopLists=res.data.data.list
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
  .head_box{
    background: url("../assets/img/findflower_bg.png") no-repeat center/cover;
    padding-top: 1rem;
    box-sizing: border-box;
    height: 6rem;
    margin-bottom: 2rem;
    h3{
      font-size: 1.2rem;
      margin-top: 0rem;
      padding:10px 0;
      color: #ffffff;
      /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/
      position: relative;
      .return{
        background: url("../assets/img/head_return_white.png") no-repeat right/auto 80%;
        display: block;
        position: absolute;
        width: 1.5rem;
        left: 5%;
      }
    }
    .flower_head{
      color: #fff;
      border: none;
    }
    .search{
      background: #fff;
      width: 92%;
      background: #fff;
      margin: 1rem auto 0;
      height: 2.8rem;
      line-height: 2.8rem;
      border-radius: 8px;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      .search_icon{
        display: inline-block;
        width: 2.5rem;
        background: url("../assets/img/search.png") no-repeat center center/1.5rem 1.5rem;
      }
      input{
        width: 80%;
        outline: none;
        border: none;
        font-size: 1.1rem;
        color: rgba(181, 181, 191, 1);
      }
      input::-webkit-input-placeholder{
        color:rgba(181, 181, 191, 1);
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:rgba(181, 181, 191, 1);
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:rgba(181, 181, 191, 1);
      }
    }
    .address{
      height: 2.5rem;
    }
  }
  .address{
    padding: 0.5rem 0;
    .doble_border{
      padding: 0 1rem;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      border-top: 1px solid rgba(223, 223, 229, 1);
    }
  }
</style>
