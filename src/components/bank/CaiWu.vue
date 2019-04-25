<template>
  <div>
    <div class="head">
      <div class="return"><span class="return_icon" @click="goback">&nbsp;</span></div>
      <p>当前余额（￥）</p>
       <h2>{{userInfo.money?userInfo.money:'0.00'}}</h2>
    </div>
    <div class="list_box">
      <div class="item" v-for="(val,key,index) in historyList">
        <h3 @click="change(index,$event)">{{key}} <span class="icon down">&nbsp;</span></h3>
        <div :id="index" style="display: none">
          <div v-for="item in val" class="list_item">
            <div class="up">
              <div class="content">{{item.type}}</div>
              <div class="money red" v-if="item.check==0">+{{item.money}}</div>
              <div class="money green" v-if="item.check==1">-{{item.money}}</div>
            </div>

            <div class="time" style="color:#393a3c">{{item.content}}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from  "vuex"
  export default {
    name: 'CaiWu',
    data(){
      return{
        historyList:{}
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      //返回
      goback(){
        this.$router.back(-1)
      },
      gethistory(){
        this.$http({method:"post",url:"/api/user/moneylog",data:{token:this.userInfo.token,type:1}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
               this.historyList=res.data.data.log;
              }else {
                this.$toast("暂无记录")
              }
            }
          )
      },
      //显示和隐藏
      change(id,e){
        if(document.getElementById(id).style.display=='none'){
          document.getElementById(id).style.display='block'
          e.currentTarget.firstElementChild.classList.remove("down")
          e.currentTarget.firstElementChild.classList.add("up")
          return
        }
        document.getElementById(id).style.display='none'
        e.currentTarget.firstElementChild.classList.remove("up")
        e.currentTarget.firstElementChild.classList.add("down")
        /*if(e.target.localName=='span'){
          e.target.classList.remove('up')
          e.target.classList.add('down')
        }*/
      }
    },
    created () {
      this.gethistory()
    }
  }
</script>

<style lang="scss" scoped>
.head{
  height: 10rem;
  background: url("../../assets/img/caiwu_bg.png") no-repeat center center/cover;
  color: #ffffff;
  .return{
    text-align: left;
    padding-top: 1.5rem;
    height: 1.5rem;
    .return_icon{
      display: inline-block;
      width: 4rem;
      background: url("../../assets/img/head_return_white.png") no-repeat center center/1.5rem 1.5rem;
    }
  }
  p{
    font-size: 0.95rem;
  }
  h2{
    font-size: 2rem;
  }
}
.list_box{
  .item{
    h3{
      text-align: left;
      background: #F2F3F5;
      font-size: 0.95rem;
      color: #000000;
      padding: 0.6rem 1rem;
      margin-bottom: 5px;
      .icon{
        display: inline-block;
        width: 2rem;
      }
      .up{
        background: url("../../assets/img/order_up.png") no-repeat center center/0.8rem;
      }
      .down{
        background: url("../../assets/img/order_down.png") no-repeat center center/0.8rem;
      }
    }
    .list_item{
      border-bottom: 1px solid #DFDFE5;
      margin:0.6rem 1rem;
      padding-bottom: 0.6rem;
      .up{
        overflow: hidden;
        .content{
          width: 50%;
          float: left;
          text-align: left;
          color: #000000;
          font-size: 0.95rem;
          font-weight: bold;
        }
        .money{
          width: 50%;
          float: right;
          text-align: right;
          font-weight: bold;
        }
        .green{
          color: #0A741C;
        }
        .red{
          color: #E30000;
        }
      }
      .time{
        overflow: hidden;
        padding-top: 0.3rem;
        text-align: left;
        color: #6F7176;
        font-size: 0.8rem;
      }
    }
    .list_item:last-child{
      border-bottom: none;
    }
  }
}
</style>
