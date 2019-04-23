<template>
  <div>
    <div class="head_nav">
      <span class="title">花市咨讯</span>
      <span class="cancle" @click="goback()">取消</span>
      <span class="push" @click="submit">发布</span>
    </div>
    <div class="input_box">
      <textarea v-model="quesion" name="" id="" cols="30" rows="10" placeholder="请输入你想要问的问题">
      </textarea>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'AskPriceAddQuesion',
    data(){
      return{
        quesion:""
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      goback(){
        this.$router.back(-1)
      },
      submit(){
        if(this.quesion){
          this.$http({method:"post",url:"/api/flower/add_ques",data:{token:this.userInfo.token,content:this.quesion}})
            .then(
              res=>{
                console.log(res)
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                  this.quesion=''
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
        }
          else {
            this.$toast('请输入要提问的问题')
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
.head_nav{
  font-size: 0.9rem;
  padding: 30px 0 10px;
  border-bottom: 1px solid rgba(223, 223, 229, 1);
  .title{
    font-weight: bold;
    font-size: 1rem;
  }
  .cancle{
    float: left;
    display: block;
    width: 5rem;
    text-align: center;
    font-weight: bold;
  }
  .push{
    float: right;
    color: rgba(250, 103, 52, 1);
    display: block;
    width: 5rem;
    text-align: center;
    font-weight: bold;
  }
}
.input_box{
  padding: 0.6rem 1rem;
  textarea{
    width: 100%;
    font-size: 1rem;
    border: 1px solid rgba(223, 223, 229, 1);
    outline: none;
    box-sizing: border-box;
    padding: 0.3rem;
  }
  textarea::-webkit-input-placeholder{
  color:rgba(181, 181, 191, 1);
  }
  textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:rgba(181, 181, 191, 1);
  }
  textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color:rgba(181, 181, 191, 1);
  }
}
</style>
