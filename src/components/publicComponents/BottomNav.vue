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
            name:'订单',path:'/orderwaitsend',src:require('../../assets/img/bottomnav_order.png'),checked_src:require('../../assets/img/bottomnav_orderchecked.png')
          },{
            name:'抢单',path:'/getorders',src:require('../../assets/img/bottomnav_qiang.png'),checked_src:require('../../assets/img/bottomnav_qiangchecked.png')
          },
          {
            name:'我的',path:'/personalcenter',src:require('../../assets/img/bottomnav_mine.png'),checked_src:require('../../assets/img/bottomnav_mine_checked.png')
          },
        ],
      }
    },
    computed:{
      ...mapState(['activeIndex','userInfo'])
    },
    methods:{
      ...mapActions(['setActiveIndex','setOrderActiveIndex','setOrderType',"setUserInfo"]),
      go(obj={path:'/',index:0}){
        if(obj.path=='/orderwaitsend'){
          if(this.userInfo.token){
            this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
              .then(
                res=>{
                  console.log(res)
                  if(res.data.code==200){
                    if(res.data.data.is_fl==1){
                      this.setOrderActiveIndex(0)
                      this.setOrderType(1)
                      this.$router.push({path:obj.path});
                      this.setActiveIndex(obj.index)
                    }else {
                      this.setOrderActiveIndex(0)
                      this.setOrderType(2)
                      this.$router.push({path:'/XiaWaitSend'});
                      this.setActiveIndex(obj.index)
                    }
                  }else {
                    this.$toast(res.data.msg)
                    this.setUserInfo({})
                    this.setOrderType(2)
                    this.setActiveIndex(0)
                  }
                }
              ).catch(
                err=>{
                  this.$router.push({path:'/login'})
                }
            )
          }
            else {
              this.$toast('您还未登录，请先登录')
              return
          }
        }
          else {
          this.$router.push({path:obj.path});
          this.setActiveIndex(obj.index)
        }
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
      width: 25%;
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
