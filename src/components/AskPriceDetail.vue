<template>
  <div>
    <ReturnHead head_name="提问详情"></ReturnHead>
    <div class="list_box">
      <div class="list_item">
        <p class="title">{{quesion.content}}</p>
        <div class="info">
          <div class="left">
            <span class="user_photo"><img :src="quesion.headimg?quesion.headimg:defaulturl" alt=""></span>
            <span class="user">
          {{quesion.username}}
        </span>
            <span class="user">
            {{quesion.create_time}}
        </span>
          </div>
          <div class="right">
          <span class="user">
          {{quesion.answer}}
        </span>
            <span class="user">
          评论
        </span>
          </div>
        </div>
      </div>
    </div>
    <div class="answers_box">
      <div class="list_item" v-for="(item,index) in answerArray" :key="index">
          <div class="left">
            <span class="photo"><img :src="item.headimg?item.headimg:defaulturl" alt=""></span>
          </div>
          <div class="right">
            <div class="info">
              <div class="info_left">
                <span class="user">
                  {{item.username}}
                </span>
              </div>
              <div class="info_right">
                 <span class="user">
                  {{item.create_time}}
                  </span>
              </div>
            </div>
            <p class="title">{{item.content}}</p>
          </div>
      </div>
    </div>
    <div class="answer_input_box">
      <input type="text" placeholder="写评论..." v-model="answerMessage">
      <span class="btn" @click="submit">回复</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'AskPriceDetail',
    data(){
      return{
        defaulturl:require('../assets/img/shop_card.png'),
        answerMessage:"",
        quesion:{
          content:"我想问一下，蓝色妖姬现在每朵是多少钱啊，全国的价格都一样吗？",
          username:"我***名",
          create_time:"2019-01-29 09:30",
          answer:'389',
          headimg:""},
        answerArray:[
        ]
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      return_icon(){
        this.$router.back(-1);
      },
      //提交事件
      submit(){
        const _this=this;
        let id=this.$route.query.id;
        this.$http({method:"post",url:"/api/flower/add_answer",data:{token:this.userInfo.token,id:this.$route.query.id,content:this.answerMessage}})
          .then(
            res=>{
              console.log(res,"提交")
              if(res.data.code==200){
                this.$toast(res.data.msg)
                _this.getlist()
              }else {
                _this.$toast(res.data.msg)
              }
            }
          )
      },
      //获取信息方法
      getlist(){
        this.$http({method:"post",url:"/api/flower/ques_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              console.log(res,"create")
              if(res.data.code==200){
                this.quesion=res.data.data.ques;
                this.answerArray=res.data.data.answer
              }else {
                this.$toast(res.data.msg)
              }
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
  .list_box{
    .list_item{
      padding: 0.3rem 1rem 0.8rem;
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
  .answers_box{
    padding-top: 0.8rem;
    .list_item{
      overflow: hidden;
      padding: 0.3rem 1rem 1rem;
      .left{
        width: 13%;
        float: left;
        text-align: center;
        img{
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%
        }
      }
      .right{
        width: 87%;
        float: right;
        .title{
          color: rgba(0, 0, 0, 1);
          text-align: left;
          font-size: 0.95rem;
          padding: 0.3rem 0;
        }
        .info{
          overflow: hidden;
          height: 1.8rem;
          line-height: 1.8rem;
          .info_left{
            float: left;
            .user{
              font-size: 0.8rem;
              color: rgba(111, 113, 118, 1);
              display: inline-block;
              margin-right: 4px;
            }
          }
          .info_right{
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
  }
  .answer_input_box{
    padding: 0 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 3rem;
    line-height: 3rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    input{
      border: 1px solid rgba(245, 245, 245, 1);
      background: rgba(245, 245, 245, 1);
      height: 1.8rem;
      border-radius: 0.9rem;
      width: 85%;
      box-sizing: border-box;
      padding-left: 1em;
      outline: none;
    }
    .btn{
      width: 13%;
      display: inline-block;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
