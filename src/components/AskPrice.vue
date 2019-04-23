<template>
<div>
  <div>
    <h3><span @click="return_icon" class="return">&nbsp:</span><span @click="change(1)" :class="{active:activeState,unactive:!activeState}">首页</span>&nbsp;&nbsp;&nbsp;<span @click="change(2)" :class="{active:!activeState,unactive:activeState}">我的</span></h3>
  </div>
  <div class="list_box">
    <div class="list_item" v-for="(item,index) in quesionsArray" :key="index" @click="go('/askpricedetail',item.id)">
      <p class="title">{{item.content}}</p>
      <div class="info">
       <div class="left">
         <span class="user_photo"><img :src="item.headimg?item.headimg:defaulturl" alt=""></span>
         <span class="user">
          {{item.username}}
        </span>
         <span class="user">
            {{item.create_time}}
        </span>
       </div>
        <div class="right">
          <span class="user">
          {{item.answer}}
        </span>
          <span class="user">
          评论
        </span>
        </div>
      </div>
    </div>
  </div>
  <div class="add">
    <span class="add_icon" @click="go('/askpriceaddquesion')">&nbsp;</span>
  </div>
</div>
</template>
<script>
  import {mapState} from "vuex"
  export default {
    name: 'AskPrice',
    data(){
      return{
        defaulturl:require('../assets/img/shop_card.png'),
        activeState:true,
        quesionsArray:[
        ]
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      //路由跳转方法
      go(path,id){
        if(id){
          this.$router.push({path:path,query:{id:id}})
        }else {
          this.$router.push({path:path})
        }
      },
      //返回事件
      return_icon(){
        this.$router.back(-1);
      },
      change(state){
        if(state==1){
         if(this.activeState){
           return
         } else {
           this.activeState=!this.activeState
           this.getlist();
         }
        }
        if(state==2){
          if(!this.activeState){
            return
          } else {
            this.activeState=!this.activeState
            this.getlist(1)
          }
        }
      },
      getlist(flag,page){
        this.$http({method:"post",url:"/api/flower/my_question",data:flag?{token:this.userInfo.token,flag:flag}:{token:this.userInfo.token}})
          .then(
            res=>{
              console.log(res)
              this.quesionsArray=res.data.data.ques;
            }
          )
      }
    },
    created () {
      this.getlist();
    }
  }
</script>

<style lang="scss" scoped>
  h3{
    font-size: 1rem;
    padding: 30px 0 0px;
    color: #000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    position: relative;
    color: rgba(0, 0, 0, 1);
    .return{
      background: url("../assets/img/head_return.png") no-repeat right/auto 80%;
      display: block;
      position: absolute;
      width: 1.5rem;
      left: 5%;
    }
    .active{
      display: inline-block;
      border-bottom: 3px solid rgba(0, 0, 0, 1);
      box-sizing: border-box;
      padding-bottom: 0.5rem;
    }
    .unactive{
      color: rgba(111, 113, 118, 1);
      display: inline-block;
      box-sizing: border-box;
      padding-bottom: 0.5rem;
    }
  }
  .list_box{
    margin-bottom: 4rem;
    .list_item{
      padding: 0.3rem 1rem;
      border-bottom: 5px solid rgba(242, 243, 245, 1);
      .title{
        color: rgba(0, 0, 0, 1);
        text-align: left;
        font-size: 0.95rem;
        font-weight: bold;
        padding: 0.3rem 0;
      }
     .info{
       overflow: hidden;
       height: 1.3rem;
       line-height: 1.3rem;
      .left{
        float: left;
        .user_photo{
          overflow: hidden;
          img{
            border-radius: 50%;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
        .user{
          font-size: 0.8rem;
          color: rgba(111, 113, 118, 1);
          display: inline-block;
          margin-right: 4px;
        }
      }
      .right{
        float: right;
        .user{
          font-size: 0.8rem;
          color: rgba(111, 113, 118, 1);
          display: inline-block;
          margin: 0 3px;
        }
      }
     }
    }
  }
  .add{
    position: fixed;
    height:4rem;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    .add_icon{
      display: inline-block;
      width:3.3rem;
      height:3.3rem;
      background: url("../assets/img/ask_add.png") no-repeat center center/3.3rem 3.3rem;
    }
  }
</style>
