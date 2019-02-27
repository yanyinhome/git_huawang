<template>
  <h3><span @click="return_icon" class="return">&nbsp;</span>{{head_name}}</h3>
</template>

<script>
  export default {
    name: 'ReturnHead',
    props:{
      head_name:{
          default:"未添加标题"
        }
    },
    methods:{
      return_icon(){
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  h3{
    font-size: 1.2rem;
    margin-top: 0rem;
    padding:10px 0;
    color: #000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .return{
      background: url("../../assets/img/head_return.png") no-repeat right/auto 80%;
      display: block;
      float: left;
      width: 1.5rem;
      padding-left: 20px;
    }
  }
</style>
