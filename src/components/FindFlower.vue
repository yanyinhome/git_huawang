<template>
  <div>
      <div class="head_box">
        <ReturnHead head_name="找花店"></ReturnHead>
        <div>我是搜索框</div>
        <Recommendation></Recommendation>
      </div>

  </div>
</template>

<script>
  import  Recommendation from './publicComponents/RecommendDation';
  export default {
    name: 'FindFlower',
    data(){
      return{
      }
    },
    components:{
      Recommendation
    }
  }
</script>

<style lang="scss" scoped>

</style>
