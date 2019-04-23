<template>
  <div>
    <div class="head" @click="changeNavState()">{{title}}
      <span class="icon" :class="{up:this.state.navState,down:!this.state.navState}">&nbsp;
        <div class="sanjiao" v-show="this.state.navState">&nbsp;</div>
      <div class="orderTyepNav" v-show="this.state.navState">
        <p><span class="getorder" @click="changeType(1)">接单</span></p>
        <p><span class="sendorder" @click="changeType(2)">下单</span></p>
      </div>
      </span>
    </div>
    <div v-if="orderType==1">
      <div class="tab_nav">
        <span class="nav_item" v-for="(item,index) in navArray.type1"  :key="index" @click="toChildren(item.sonRouter),changActiveNav(index),getaccount()"><span v-bind:class="{active:index==orderActiveIndex}">{{item.name}}</span></span>
        <!--<span class="nav_item" @click="toChildren('/orderwaitsend'),changActiveNav(0)"><span v-bind:class="{active:0==orderActiveIndex}">待确认</span></span>
        <span class="nav_item" @click="toChildren('/ordersending'),changActiveNav(1)"><span v-bind:class="{active:1==orderActiveIndex}">配送中</span></span>
        <span class="nav_item" @click="toChildren('/OrderComplete'),changActiveNav(2)"><span v-bind:class="{active:2==orderActiveIndex}">已完成</span></span>
        <span class="nav_item" @click="toChildren('/aftersale'),changActiveNav(3)"><span v-bind:class="{active:3==orderActiveIndex}">售后</span></span>
        <span class="nav_item" @click="toChildren('/OrderCancel'),changActiveNav(4)"><span v-bind:class="{active:4==orderActiveIndex}">已取消</span></span>-->
      </div>
      <router-view/>
    </div>
    <div v-if="orderType==2">
      <div class="tab_nav">
        <span class="nav_item" v-for="(item,index) in navArray.type2"  :key="index" @click="toChildren(item.sonRouter),changActiveNav(index),getaccount()"><span v-bind:class="{active:index==orderActiveIndex}">{{item.name}}</span></span>
      </div>
      <router-view/>
    </div>
    <BottomNav v-show="BottomNavState"></BottomNav>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'Order',
    data(){
      return{
        state:{
          navState:false,
          sonRouterState:0,
        },
        navArray:{
          type1:[
            {name:"待确认",sonRouter:"/orderwaitsend"},
            {name:"配送中",sonRouter:"/ordersending"},
            {name:"已完成",sonRouter:"/OrderComplete"},
            {name:"售后",sonRouter:"/aftersale"},
            {name:"已取消",sonRouter:"/OrderCancel"}
          ],
          type2:[
            {name:"待确认",sonRouter:"/XiaWaitSend"},
            {name:"配送中",sonRouter:"/XiaSending"},
            {name:"已完成",sonRouter:"/XiaComplete"},
            {name:"售后",sonRouter:"/XiaAfterSale"},
            {name:"已取消",sonRouter:"/XiaCancel"},
          ]
        }
      }
    },
    computed:{
      ...mapState(['orderActiveIndex','orderType','BottomNavState','userInfo']),
      title(){
        if(this.orderType==1){
          return "接单管理"
        }
        if(this.orderType==2){
          return "下单管理"
        }
      }
    },
    methods:{
      ...mapActions(['setOrderActiveIndex','setOrderType']),
      getaccount(){
        if(this.orderType==1){
          this.$http({method:"post",url:"/api/order/order",data:{token:this.userInfo.token,type:"1",flag:'6'}})
            .then(res=>{
              if(res.data.code==200||res.data.code==205){
                const usedata=res.data.data;
                this.navArray.type1.forEach((item,index)=>{
                  switch (index) {
                    case 0:
                      item.name="待确认("+usedata.daicount+")";
                      return item;
                      break;
                    case 1:
                      item.name="配送中("+usedata.peisong+")";
                      return item;
                      break;
                    case 2:
                      item.name="已完成("+usedata.yiwancheng+")";
                      return item;
                      break;
                    case 3:
                      item.name="售后("+usedata.shouhou+")";
                      return item;
                      break;
                    case 4:
                      item.name="已取消("+usedata.quxiao+")";
                      return item;
                      break;
                    default:
                      break;
                  }
                })
              }
              else {
                this.$toast(res.msg)
              }
            })
        }
        if(this.orderType==2){
          this.$http({method:"post",url:"/api/order/order",data:{token:this.userInfo.token,type:"2",flag:'6'}})
            .then(res=>{
              if(res.data.code==200||res.data.code==205){
                const usedata=res.data.data;
                this.navArray.type2.forEach((item,index)=>{
                  switch (index) {
                    case 0:
                      item.name="待确认("+usedata.daicount+")";
                      return item;
                      break;
                    case 1:
                      item.name="配送中("+usedata.peisong+")";
                      return item;
                      break;
                    case 2:
                      item.name="已完成("+usedata.yiwancheng+")";
                      return item;
                      break;
                    case 3:
                      item.name="售后("+usedata.shouhou+")";
                      return item;
                      break;
                    case 4:
                      item.name="已取消("+usedata.quxiao+")";
                      return item;
                      break;
                    default:
                      break;
                  }
                })
              }
              else {
                this.$toast(res.msg)
              }
            })
        }
      },
      changActiveNav(index){
        this.setOrderActiveIndex(index)
      },
      toChildren(path){
        this.$router.push({path:path})
      },
      changeNavState(){
        this.state.navState=!this.state.navState
      },
      changeType(state){
        if(state==1){
          if(this.orderType==1){
            return;
          }else {
            this.$http({method:"post",url:"/api/user/usermessage",data:{token:this.userInfo.token}})
              .then(
                res=>{
                  if(res.data.code==200){
                    if(res.data.data.is_fl==1){
                      this.setOrderType(state);
                      this.getaccount()
                      this.changActiveNav(0)
                      this.toChildren('/orderwaitsend')
                      return
                    }else {
                      this.$toast("请先认证花店")
                    }
                  }
                }
              )
          }
        }
        if(state==2){
          if(this.orderType==2){
            return;
          }else {
            this.setOrderType(state);
            this.getaccount()
            this.changActiveNav(0)
            this.toChildren('/XiaWaitSend')
          }
        }
      }
    },
    created () {
        this.getaccount()
    }
  }
</script>

<style lang="scss" scoped>
  .head{
    padding: 1rem 0;
    font-size: 1.2rem;
    color:rgba(0, 0, 0, 1);
    font-weight: bold;
    .icon{
      position: relative;
      display: inline-block;
      width: 1.6rem;
    }
    .up{
      background:url("../assets/img/order_up.png") no-repeat center/0.8rem;
    }
    .down{
      background:url("../assets/img/order_down.png") no-repeat center/0.8rem;
    }
    .sanjiao{
      position: absolute;
      right: 0.5rem;
      width: 0px;
      height: 0px;
      border-width: 0 6px 6px;
      border-color:transparent transparent rgba(92, 87, 85, 1);
      border-style: solid;
    }
    .orderTyepNav{
      z-index: 10000;
      position: absolute;
      background:rgba(92, 87, 85, 1);
      width: 8.5rem;
      height: 5.5rem;
      top: calc(100% + 0.4rem);
      right: -0.5rem;
      color: #fff;
      box-sizing: border-box;
      padding: 0.5rem;
      border-radius: 5px;
      p{
        height: 2.25rem;
        line-height: 2.25rem;
        .getorder{
          background: url("../assets/img/order_get.png") no-repeat left center/1.5rem 1.5rem;
        }
        .sendorder{
          background: url("../assets/img/order_send.png") no-repeat left center/1.5rem 1.5rem;
        }
        span{
          padding-left: 2.3rem;
          font-weight: normal;
          box-sizing: border-box;
          font-size: 1rem;
        }
      }
      p:first-child{
        border-bottom: 1px solid rgba(140, 137, 135, 1) ;
      }
    }
  }
  .tab_nav{
    padding: 0 15px;
    box-sizing: border-box;
    .nav_item{
      text-align: center;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      font-size: 0.95rem;
      color: rgba(111, 113, 118, 1);
      margin-bottom: 1rem;
    }
    span{
      padding-bottom: 5px;
    }
    .active{
      border-bottom: 2px solid rgba(250, 103, 52, 1);
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }
</style>
