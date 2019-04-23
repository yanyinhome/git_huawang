<template>
  <div>
      <div class="head_box">
        <h3><span @click="return_icon" class="return">&nbsp;</span>找花店</h3>
        <div class="search" @click="search"><span class="search_icon">&nbsp;</span><input type="text" placeholder="请输入搜索内容" v-model="searchData.keyword"></div>
      </div>
      <div class="address">
        <AddressChoice @addressToParent="getAddress" class="doble_border"></AddressChoice>
      </div>
      <Recommendation :shop-arry="shopLists"></Recommendation>
  </div>
</template>

<script>
  import  Recommendation from './publicComponents/RecommendDation';
  import {mapState} from 'vuex';
  export default {
    name: 'FindFlower',
    data(){
      return{
        page:1,
        pages:1,
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
      return_icon(){
        this.$router.back(-1);
      },
      search(page){
        console.log(Object.assign({},{token:this.userInfo.token},this.searchData))
        this.$http({method:"post",url:"/api/flower/serch_flower",data:Object.assign({},{token:this.userInfo.token,page:this.page},this.searchData)})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                if(res.data.data.list.length==0){
                  this.shopLists=[]
                }else {
                  this.shopLists=res.data.data.list
                  this.pages=res.data.data.pages;
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
