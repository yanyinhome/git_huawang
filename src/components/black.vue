<template>
  <div>
    <ReturnHead head_name="黑名单管理"></ReturnHead>
    <div class="itme_box">
      <template v-if="!blacklist.length">
        <div class="none">暂无记录</div>
      </template>
      <template v-if="blacklist.length">
        <div class="item head">
          <div class="left first">店铺名称</div>
          <div class="left second">用户名</div>
          <div class="right noicon">操作&nbsp;</div>
        </div>
        <div v-for="(item,index) in blacklist" :key="index" class="item">
          <div class="left first">{{item.fl_name}}</div>
          <div class="left second">{{item.user_name}}</div>
          <div class="right" @click="delate(item.id)">移出&nbsp;</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'black',
    data(){
      return{
        blacklist:[]
      }
    },
    computed:{
      ...mapState(["userInfo"])
    },
    methods:{
      delate(id){
        this.$http({method:"post",url:"/api/user/delete_blacklist",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.getlist()
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      getlist(){
        this.$http({method:'post',url:"/api/user/blacklist",data:{token:this.userInfo.token}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.blacklist=res.data.data
              }else {
                if(res.data.code==205){
                  this.blacklist=[]
                }else {
                  this.$toast(res.data.msg)
                }
              }
            }
          )
      }
    },
    created () {
      this.getlist()
    }
  }
</script>

<style lang="scss" scoped>
  .itme_box{
    padding: 15px 15px 0;
    .none{
      font-weight: bold;
    }
    .item{
      overflow: hidden;
      padding: 10px 10px;
      border-bottom: 1px solid rgba(242, 243, 245, 1);
      .left{
        float: left;
      }
      .first{
        width: 30%;
      }
      .second{
        width: 30%;
      }
      .right{
        color:rgba(111, 113, 118, 1);
        float: right;
        padding-right: 1rem;
        background: url("../assets/img/close_photo.png") no-repeat right center/1rem 1rem;
      }
      .noicon{
        background: none;
      }
    }
    .head{
      font-weight: bold;
    }
  }
  .mint-header {
    font-size: 0.95rem;
    font-weight: bold;
    background-color: #fff;
    padding: 0 0 5px;
    color: #333;
    border-bottom: 1px solid rgba(223, 223, 229, 1);
    margin: 1rem 1rem;
  .user_base {
    display: inline-block;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 1);
    padding-left: 1rem;
  }
  .user_base{
    padding-left: 0;
  }
  }
</style>
