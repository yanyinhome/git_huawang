<template>
  <div>
    <h3><span @click="return_icon" class="return">&nbsp;</span>修改用户名</h3>
    <div class="input_box">
      <input type="text" v-model="inputData">
    </div>
    <div class="padding_bottom"></div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'ChangeUserName',
    data(){
      return{
        inputData:""
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      return_icon(){
        if(this.inputData==""||this.inputData==this.userInfo.username){
          this.$router.back(-1);
        }else {
          this.$http({method:"post",url:"/api/user/upusername",data:{token:this.userInfo.token,username:this.inputData}})
            .then(
              res=>{
                if(res.data.code==200){

                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
          this.$router.back(-1);
        }
      }
    },
    created () {
      this.inputData=this.userInfo.username
    }
  }
</script>

<style lang="scss" scoped>
h3{
    font-size: 1.2rem;
    margin-top: 0rem;
    padding:30px 0 10px;
    color: #000;
    position: relative;
    .return{
      background: url("../../assets/img/head_return.png") no-repeat right/auto 80%;
      display: block;
      position: absolute;
      width: 1.5rem;
      left: 15px;
    }
  }
.input_box{
  height: 3rem;
  line-height: 3rem;
  border-top: 0.5rem solid rgba(242, 243, 245, 1);
  padding: 0 1rem;
  input{
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
  }
}
.padding_bottom{
  height: 35rem;
  background:rgba(242, 243, 245, 1);
}
</style>
