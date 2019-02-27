<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
     this.$toast(
       {
        message: "操作成功", //提示内容分
        position: "bottom", //提示框位置
        duration: 5000 , //持续时间（毫秒），若为 -1 则不会自动关闭
        /* iconClass: 'fa fa-plug' , //icon 图标的类名 */
        className:"addClass"  //Toast 的类名。可以为其添加样式
        }
      );
   /*  console.log("123");
     this.$toast("123");
     this.$confirm(res.data.msg, options)
     this.$alert(res.data.msg); */
  }
}
</script>

<style lang='scss'>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
</style>
