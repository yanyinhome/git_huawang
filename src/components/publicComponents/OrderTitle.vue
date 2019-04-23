<template>
  <div class="title"><span v-if="must" style="color:rgba(227, 0, 0, 1)">&nbsp;*&nbsp;</span>{{title}}</div>
</template>

<script>
  export default {
    name: 'OrderTitle',
    props:{
      title:String,
      must:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title{
    padding: 0.7rem 0;
    font-size: 1rem;
    color:rgba(0, 0, 0, 1);
    font-weight: bold;
    text-align: left;
  }
</style>
