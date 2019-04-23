<template>
  <div class="up_box" @click="openInput(ref)">
    <label :ref="ref" :for="InputName">{{info}}</label>
    <input type="file" v-show="false" accept="image/png,image/gif,image/jpeg" @change="change($event)" :id="InputName">
  </div>
</template>

<script>
  export default {
    name: 'up_load_box',
    props:{
      InputName:{
        type:String,
        default:'input'
      },
      info:{
        type:String,
        default:'点击上传'
      },
      ref:{
        type:String,
        default:'input'
      }
    },
    methods:{
      change(e){
        console.log(e)
        this.$emit('upload',e)
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .up_box{
    width: 9.7rem;
    height: 6.2rem;
    border: 1px dotted #ccc;
    background: url("../../assets/img/up_load_bg.png") no-repeat center 1rem/2.1rem 1.7rem;

    box-sizing: border-box;
    padding-top: 3rem;
    label{
      color: #a2a2a7;
      font-size: 0.9rem;
    }
  }
</style>
