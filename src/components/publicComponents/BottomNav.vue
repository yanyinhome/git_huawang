<template>
  <div class="nav_box">
    <div class="item" v-for="(item,index) in NavLists" :key="index" @click="go({path:item.path,index:index})">
    <img :src="index==activeIndex?item.checked_src:item.src"  alt=""><br>
    <span  :class="{active:index==activeIndex}">
        {{item.name}}
      </span>
  </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from "vuex";
  export default {
    name: 'BottomNav',
    data(){
      return {
        NavLists:[
          {
            name:'首页',path:'/',src:require('../../assets/img/bottomnav_index.png'),checked_src:require('../../assets/img/bottomnav_indexchecked.png')
          },
          {
            name:'订单',path:'/order',src:require('../../assets/img/bottomnav_order.png'),checked_src:require('../../assets/img/bottomnav_orderchecked.png')
          },
          {
            name:'我的',path:'/personalcenter',src:require('../../assets/img/bottomnav_mine.png'),checked_src:require('../../assets/img/bottomnav_mine_checked.png')
          },
        ],
      }
    },
    computed:{
      ...mapState(['activeIndex'])
    },
    methods:{
      ...mapActions(['setActiveIndex']),
      go(obj={path:'/',index:0}){
        console.log(obj)
        this.$router.push({path:obj.path});
        // this.$store.dispatch('setActiveIndex',obj.index)
        this.setActiveIndex(obj.index)
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  .nav_box{
    background-color:#fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    padding-top: 8px;
    .item{
      display: inline-block;
      text-align: center;
      width: 33%;
      img{
        width: 1.2rem;
        height: 1.2rem;
      }
      span{
        line-height: 13px;
        height: 13px;
        font-size: 0.6rem;
        color: #333;
      }
      .active{
        color: #FA6734;
      }
    }
  }
</style>
