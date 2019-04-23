<template>
  <div id="app">
    <router-view/>
    <div id="bdtts_div_id">
      <audio id="tts_autio_id" autoplay="autoplay">
        <source id="tts_source_id"
                src="http://tts.baidu.com/text2audio?lan=zh&amp;ie=UTF-8&amp;spd=5&amp;per=0&amp;text=''"
                type="audio/mpeg">
        <embed id="tts_embed_id" height="0" width="0" src="">
      </audio>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
  }
  },
  computed:{
    ...mapState(['userInfo','timer'])
  },
  methods:{
    ...mapActions(['setActiveIndex','setTimer','clearTimer']),
    //  新订单提醒
    orderNotice:function () {
      if(this.timer){this.clearTimer()}
      let token=this.userInfo.token
      const _this=this
      this.setTimer(setInterval(
        function () {
          if(token){
            _this.$http({method:'post',url:"/api/user/get_new_order",data:{token:token}})
              .then(res=>{
                console.log(1)
                console.log(res)
                if(res.data.code==200){
                  let content=res.data.msg
                  _this.$toast(content)
                  _this.playSound(content)
                }
              })
          }
        },10000
      ))
    },
    //  语音播报
    playSound:function (ttsText) {
      var ttsDiv = document.getElementById('bdtts_div_id');
      var ttsAudio = document.getElementById('tts_autio_id');
      // 文字转语音
      ttsDiv.removeChild(ttsAudio);
      var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
      var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=0&spd=5&text=' + ttsText + '" type="audio/mpeg">';
      var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
      var au2 = '</audio>';
      ttsDiv.innerHTML = au1 + sss + eee + au2;
      ttsAudio = document.getElementById('tts_autio_id');
      ttsAudio.play();
    }
  },
  mounted(){
    this.orderNotice()
  }
}
</script>

<style lang='scss'>
@import '../src/assets/css/base.css';
.confirmButton{
  height: 2.64rem;
  color: rgba(250, 103, 52, 1) !important;
  font-size: 1.2rem;
}
.cancelButton{
  height: 2.64rem;
  color: rgba(181, 181, 191, 1) !important;
  font-size: 1.2rem;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
</style>
