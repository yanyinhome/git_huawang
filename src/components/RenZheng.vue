<template>
  <div>
    <ReturnHead head_name="认证花店"></ReturnHead>
<<<<<<< HEAD
    <div v-if="state==1">
      <div class="baseMessage1">
        <h3>花店基本信息</h3>
        <div class="input_box">
          <label for="shop_name" class="fl">店铺名称</label><input class="fr" v-model="RenZhengDate.fl_name" type="text" id="shop_name" placeholder="请输入店铺名称">
        </div>
        <div class="input_box" style="padding-bottom: 0">
          <label for="shop_address" class="fl">店铺地址</label><input class="fr"  type="text" v-model="RenZhengDate.fl_address" id="shop_address"  placeholder="请输入店铺详细地址">
          <div style="clear: both"></div>
          <AddressChoice v-if="!chongxinrenzheng" class="changeaddress" @addressToParent="getAddress"></AddressChoice>
          <AddressChoice v-if="chongxinrenzheng" :state="1"  class="changeaddress" @addressToParent="getAddress"></AddressChoice>
        </div>
        <div class="input_box">
          <label for="shop_phone" class="fl">联系电话</label><input class="fr" type="text" id="shop_phone" v-model="RenZhengDate.fl_phone" placeholder="请输入联系电话">
        </div>
      </div>
      <div class="baseMessage2">
        <h3>花店基本信息</h3>
        <div class="upload_box" >
          <p class="title">上传负责人身份证照片</p>
          <div class="up_box" @click="openInput('zheng')">
            <img v-if="card.zheng.show" :src="card.zheng.src" alt="" style="width: 100%;">
            <label v-if="!card.zheng.show" >正面（人面像）</label>
            <input  ref="zheng" type="file" v-show="false" accept="image/*" @change="change(1,$event)" id="zheng">
          </div>
          <div class="up_box fr" @click="openInput('fan')">
            <img v-if="card.fan.show" :src="card.fan.src" alt="" style="width: 100%;">
            <label v-if="!card.fan.show">背面（国徽面）</label>
            <input  ref="fan" type="file" v-show="false" accept="image/*" @change="change(2,$event)" id="fan">
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="upload_box">
          <p class="title">上传负责人与店铺门头合照</p>
          <div class="up_box down" @click="openInput('hezhao')">
            <img v-if="hezhao.show" :src="hezhao.src" alt="" style="width: 100%;">
            <label v-if="!hezhao.show" >&nbsp;</label>
            <input  ref="hezhao" type="file" v-show="false" accept="image/*" @change="change(3,$event)" id="hezhao">
          </div>
          <div class="up_box fr example">
            <img src="../assets/img/example.png" style="width: 100%;">
            <label v-if="!hezhao.show" >&nbsp;</label>
            <span class="example_info">
            示例
          </span>
          </div>
        </div>
      </div>
      <div class="introduce">
        <textarea v-model="RenZhengDate.fl_content" name="" id="" cols="30" rows="10" placeholder="花店简介"></textarea>
      </div>
      <mt-button :class="sub" @click="submitRenZheng">提交认证</mt-button>
    </div>
    <div v-if="state==2">
      <div class="examine">
        <img src="../assets/img/examine.png" alt="">
        <p class="title">您的认证信息已提交成功！</p>
        <p class="info">
          请及时关注审核状态，我们将在3个工作日内对您的信息进行审核。
        </p>
        <mt-button :class="sub" @click="goback">确定</mt-button>
      </div>
    </div>
    <div v-if="state==3&&StepShow==1">
      <div class="examine">
        <img src="../assets/img/examine_step1.png" alt="">
        <p class="title examine_step1"><span class="icon">&nbsp;</span>已完成认证！</p>
        <p class="info">
          恭喜您，您已完成花店认证。
        </p>
        <p class="info">
          请完善您的花店信息，方便用户下单。
        </p>
        <mt-button :class="sub" @click="gostep(2)">完善信息</mt-button>
      </div>
    </div>
    <div v-if="state==3&&StepShow==2">
      <div class="examine_step2">
        <div class="img_box">
          <p>身份证照片</p>
          <div class="img_item">
            <img :src="wanshanDate.fl_idcard1" alt="">
          </div>
          <div class="img_item">
            <img :src="wanshanDate.fl_idcard2" alt="">
          </div>
        </div>
        <div class="img_box center">
          <p>花店门头及资质照片</p>
          <div class="img_item center">
            <img :src="wanshanDate.fl_store" alt="">
          </div>
        </div>
        <div class="content_box">
          <p class="head">花店详细信息</p>
          <div class="item_box">
            <div class="title logo_title">
              店铺LOGO
            </div>
            <div class="content">
              <div @click="openlogoInput" class="logo_box" v-if="wanshanDate.fl_logo_img">
                <img :src="wanshanDate.fl_logo_img" alt="">
              </div>
              <div v-show="!wanshanDate.fl_logo_img" class="logo_label_box">
                <label ref="fl_logo" for="logo">上传LOGO照片&nbsp;<i class="lnr lnr-chevron-right"></i></label>
                <input type="file" accept="image/*" v-show="false" @change="change('4',$event)" id="logo">
              </div>
            </div>
          </div>
          <div class="item_box">
            <div class="title">
              店铺名称
            </div>
            <div class="content">
              <input type="text" placeholder="输入店铺座机号码" v-model="wanshanDate.fl_name">
            </div>
          </div>
          <div class="item_box">
            <div class="title">
              店铺地址
            </div>
            <div class="content">
              <input type="text" placeholder="请输入详细地址" v-model="wanshanDate.fl_address">
            </div>
          </div>
          <div class="item_box">
            <AddressChoice class="changeaddress" style="padding: 0" :state="2" @addressToParent="changeAddress"></AddressChoice>
          </div>
          <div class="item_box">
            <div class="title">
              联系方式
            </div>
            <div class="content">
              <input type="text" placeholder="输入店铺座机号码" v-model="wanshanDate.fl_phone">
            </div>
          </div>
          <div class="item_box">
            <div class="title">
              座机
            </div>
            <div class="content">
              <input type="text" placeholder="输入店铺座机号码" v-model="wanshanDate.fl_tel">
            </div>
          </div>
          <div class="item_box">
            <div class="title">
              QQ
            </div>
            <div class="content">
              <input type="text" placeholder="输入QQ号码" v-model="wanshanDate.fl_qq">
            </div>
          </div>
          <div class="item_box">
            <div class="title">
             备用QQ
            </div>
            <div class="content">
              <input type="text" placeholder="输入QQ号码" v-model="wanshanDate.other_qq">
            </div>
          </div>
          <div class="item_box">
            <div class="title">
             备用电话
            </div>
            <div class="content">
              <input type="text" placeholder="输入电话号码" v-model="wanshanDate.other_phone">
            </div>
          </div>
        </div>
        <mt-button :class="sub" @click="submitWanShan">保存</mt-button>
      </div>
    </div>
    <div v-if="state==4">
    <div class="examine_step2">
      <div class="img_box">
        <p>身份证照片</p>
        <div class="img_item">
          <img :src="wanshanDate.fl_idcard1" alt="">
        </div>
        <div class="img_item">
          <img :src="wanshanDate.fl_idcard2" alt="">
        </div>
      </div>
      <div class="img_box center">
        <p>花店门头及资质照片</p>
        <div class="img_item center">
          <img :src="wanshanDate.fl_store" alt="">
        </div>
      </div>
      <div class="content_box">
        <p class="head">花店详细信息<span class="router_icon" @click="toWanShan">&nbsp;</span></p>
        <div class="item_box">
          <div class="title logo_title">
            店铺LOGO
          </div>
          <div class="content">
            <div class="logo_box">
              <img :src="wanshanDate.fl_logo_img" alt="">
            </div>
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            店铺名称
          </div>
          <div class="content">
            {{wanshanDate.fl_name}}
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            店铺地址
          </div>
          <div class="content">
            {{wanshanDate.fl_province_name}}{{wanshanDate.fl_city_name}}{{wanshanDate.fl_area_name}}
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            联系方式
          </div>
          <div class="content">
            {{wanshanDate.fl_phone}}
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            座机
          </div>
          <div class="content">
            <span>{{wanshanDate.fl_tel}}</span>
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            QQ
          </div>
          <div class="content">
            <span>{{wanshanDate.fl_qq}}</span>
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            备用QQ
          </div>
          <div class="content">
            <span>{{wanshanDate.other_qq}}</span>
          </div>
        </div>
        <div class="item_box">
          <div class="title">
            备用电话
          </div>
          <div class="content">
            <span>{{wanshanDate.other_phone}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div v-if="state==5&&StepShow==1">
      <div class="examine">
        <img src="../assets/img/examine_fail.png" alt="">
        <p class="title examine_fail_step1"><span class="fail_icon">&nbsp;</span>很抱歉，您的花店认证未通过！</p>
        <p class="fail_info">
          有可能造成不通过的原因：
        </p>
        <p class="fail_info">
          1.上传图片不清晰，或不完整，系统无法识别内容。
        </p>
        <p class="fail_info">
          2.上传图片不正确，图片内容与本人填写的个人信息不相符。
        </p>
        <mt-button :class="sub" @click="gostep()">重新认证</mt-button>
      </div>
    </div>
=======
>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
  </div>
</template>

<script>
<<<<<<< HEAD
  import axios from "axios"
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'RenZheng',
    data(){
      return{
        chongxinrenzheng:false,
        address:{},
        state:1,
        StepShow:1,
        sub:'sub',
        fl_logo:"",
        card:{
          zheng:{
            show:false,
            src:""
          },
          fan:{
            show:false,
            src:""
          }
        },
        hezhao:{
          show:false,
          src:""
        },
        RenZhengDate:{
          fl_name:"",
          fl_province:"",
          fl_city:"",
          fl_area:"",
          fl_address:"",
          fl_phone:"",
          fl_idcard1:"",
          fl_idcard2:"",
          fl_store:"",
          fl_content:""
        },
        id:"",
        wanshanDate:{
          fl_name:"",
          fl_province:"",
          fl_province_name:"",
          fl_city:"",
          fl_city_name:"",
          fl_area:"",
          fl_area_name:"",
          fl_address:"",
          fl_phone:"",
          fl_idcard1:"",
          fl_idcard2:"",
          fl_store:"",
          fl_content:"",
          fl_qq:"",
          fl_tel:"",
          fl_logo:"",
          fl_logo_img:"",
          id:"",
          other_qq:"",
          other_phone:''
        }
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    watch:{
      card:{
        handler:function (val) {
          window.sessionStorage.card=JSON.stringify(val)
        },
        deep:true
      },
      RenZhengDate:{
        handler:function (val) {
          window.sessionStorage.RenZhengDate=JSON.stringify(val)
        },
        deep:true
      },
      hezhao:{
        handler:function (val) {
          window.sessionStorage.hezhao=JSON.stringify(val)
        },
        deep:true
      }
    }
    ,
    methods:{
      ...mapActions(["SetagainRenzheng"]),
      //input代理事件
      openlogoInput(){
        this.$refs.fl_logo.dispatchEvent(new MouseEvent('click'))
      },
      //跳转修改信息界面
      toWanShan(){
        this.state=3;
        this.StepShow=2;
      },
      //提交认证信息
      submitRenZheng(){
        if(!this.RenZhengDate.fl_name){
          this.$toast("请输入花店名称")
          return
        }
        if(!this.RenZhengDate.fl_province){
          this.$toast("请选择省份")
          return
        }
        if(!this.RenZhengDate.fl_city){
          this.$toast("请选择城市")
          return
        }
        if(!this.RenZhengDate.fl_area){
          this.$toast("请选择地区")
          return
        }
        if(!this.RenZhengDate.fl_phone){
          this.$toast("电话不能为空")
          return
        }
        if(!this.RenZhengDate.fl_idcard1){
          this.$toast("请上传身份证正面照")
          return
        }
        if(!this.RenZhengDate.fl_idcard2){
          this.$toast("请上传身份证反面照")
          return
        }
        if(!this.RenZhengDate.fl_store){
          this.$toast("请上传花店照片")
          return
        }
        if(!this.RenZhengDate.fl_content){
          this.$toast("请填写描述信息")
          return
        }
        if(!this.chongxinrenzheng){
          console.log(this.RenZhengDate,1)
          this.$http({method:"post",url:"/api/flower/flower_auth",data:Object.assign({},{token:this.userInfo.token},this.RenZhengDate)})
            .then(
              res=>{
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                  this.state=2;
                }
                else {
                  this.$toast(res.data.msg)
                }
              }
            )
        }else {
          this.renzheng_chongxin()
        }
      },
      //完善花店信息
      submitWanShan(){
        if(!this.wanshanDate.fl_qq){
          this.$toast("qq号码不能为空")
          return
        }
        if(!this.wanshanDate.fl_phone){
          this.$toast("电话号码不能为空")
          return
        }
        if(!this.wanshanDate.fl_logo){
          this.$toast("请上传花店LOGO")
          return
        }
        console.log(this.wanshanDate)
        this.$http({method:'post',url:"/api/flower/up_flmessage",data:Object.assign({},{token:this.userInfo.token},this.wanshanDate)})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.state=4
                this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
                  .then(
                    res=>{
                      if(res.data.code==200){
                        this.wanshanDate=res.data.data
                      }else {
                        this.$toast(res.data.msg)
                      }
                    }
                  )
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //花店未通过认证视图
      renzheng_refuse_view(){
        this.$http({method:"post",url:"/api/flower/flower_refuse",data:{token:this.userInfo.token}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.chongxinrenzheng=true;
                this.card.zheng.src=res.data.data.fl_idcard1_img
                this.card.zheng.show=true
                this.card.fan.src=res.data.data.fl_idcard2_img
                this.card.fan.show=true
                this.hezhao.src=res.data.data.fl_store_img
                this.hezhao.show=true
                this.RenZhengDate.fl_name=res.data.data.fl_name
                this.RenZhengDate.fl_province=res.data.data.fl_province
                this.RenZhengDate.fl_city=res.data.data.fl_city
                this.RenZhengDate.fl_area=res.data.data.fl_area
                this.RenZhengDate.fl_address=res.data.data.fl_address
                this.RenZhengDate.fl_phone=res.data.data.fl_phone
                this.RenZhengDate.fl_content=res.data.data.fl_content
                this.RenZhengDate.fl_idcard1=res.data.data.fl_idcard1
                this.RenZhengDate.fl_idcard2=res.data.data.fl_idcard2
                this.RenZhengDate.fl_store=res.data.data.fl_store
                this.id=res.data.data.id
                this.SetagainRenzheng({provice:res.data.data.fl_province,city:res.data.data.fl_city,area:res.data.data.fl_area})
              }else{
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //花店重新认证
      renzheng_chongxin(){
        console.log(this.RenZhengDate)
        this.$http({method:"post",url:"/api/flower/flower_auth2",data:Object.assign({},{token:this.userInfo.token},this.RenZhengDate,{id:this.id})})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.state=2;
              }
              else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //获取地址
      getAddress(data){
        this.RenZhengDate.fl_province=data.province;
        this.RenZhengDate.fl_city=data.city;
        this.RenZhengDate.fl_area=data.area;
      },
      //修改地址
      changeAddress(data){
        console.log(data)
        this.wanshanDate.fl_province=data.province;
        this.wanshanDate.fl_city=data.city;
        this.wanshanDate.fl_area=data.area;
      },
      goback(){
        this.$router.back(-1);
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      gostep(step){
        if(!this.chongxinrenzheng){
          this.StepShow=step
        }else {
          this.state=1;
        }
      },
     /* change(e){
        const _this=this;
        let id=e.target.id;
        console.log(id)
        let fileReader=new  FileReader();
        const file=e.target.files[0];
        fileReader.readAsDataURL(file);
        fileReader.onload=function (e) {
          if(id=="zheng"){
            _this.card.zheng.src=this.result;
            _this.card.zheng.show=true
            console.log(this.result)
            return;
          }
          if(id=="fan"){
            _this.card.fan.src=this.result;
            _this.card.fan.show=true;
            console.log(this.result)
            return;
          }
          if(id=="hezhao"){
            _this.hezhao.src=this.result;
            _this.hezhao.show=true;
            console.log(this.result)
            return;
          }
        };
      },*/
      //图片上传
      change(type,e){
        const _this=this;
        let file=e.target.files[0];
        console.log(e.target)
        let param=new FormData()//创建form对象
        param.append("imgurl",file);
        param.append("token",this.userInfo.token);
        //添加请求头
        /* this.$http({method:"post",url:"/index.php/index/common/douploads",headers:"headers:{'Content-Type':'multipart/form-data'}",param})
             .then(res=>{console.log(res)})*/
        axios.post("http://houtai.huatuan666.com/api/home/doupload",param,{headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
            if(res.data.code=="200"){
              this.$toast(res.data.msg)
              console.log(res)
                if(type==1){
                  this.card.zheng.src=res.data.data.imgurl
                  this.card.zheng.show=true;
                  this.RenZhengDate.fl_idcard1=res.data.data.img_id
                  return
                }
              if(type==2){
                this.card.fan.src=res.data.data.imgurl
                this.card.fan.show=true;
                this.RenZhengDate.fl_idcard2=res.data.data.img_id
                return
              }
              if(type==3){
                this.hezhao.src=res.data.data.imgurl
                this.hezhao.show=true;
                this.RenZhengDate.fl_store=res.data.data.img_id
                return
              }
              if(type==4){
                this.wanshanDate.fl_logo=res.data.data.img_id
                this.fl_logo=res.data.data.imgurl
                return
              }
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
    },
    created () {
      console.log(this.userInfo)
      if(window.sessionStorage.card){
        this.card=JSON.parse(window.sessionStorage.card)
      }
      if(window.sessionStorage.hezhao){
        this.hezhao=JSON.parse(window.sessionStorage.hezhao)
      }
      if(window.sessionStorage.RenZhengDate){
        this.RenZhengDate=JSON.parse(window.sessionStorage.RenZhengDate)
      }
      const param=new FormData()
      param.append("token",this.userInfo.token);
      axios.post("http://houtai.huatuan666.com/api/flower/flower_status",param,{headers:{'Content-Type':'multipart/form-data'}})
        .then(
          res=>{
            console.log(res)
            if(res.data.code=200){
                if(res.data.data==9){
                  this.state=1;
                  return
                }
              if(res.data.data==0){
                this.state=2;
                return
              }
              if(res.data.data==2){
                //添加已拒绝视图
                this.state=5;
                this.StepShow=1;
                this.renzheng_refuse_view()
                return
              }
              if(res.data.data==3){
                this.state=3;
                this.StepShow=1;
                this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
                  .then(
                    res=>{
                      console.log(res,123)
                      if(res.data.code==200){
                        this.wanshanDate=res.data.data
                        this.fl_logo=this.wanshanDate.fl_logo;
                      }else {
                        this.$toast(res.data.msg)
                      }
                    }
                  )
              }
              if(res.data.data==4){
                this.state=4;
                this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
                  .then(
                    res=>{
                      console.log(res,123)
                      if(res.data.code==200){
                        this.wanshanDate=res.data.data
                        this.fl_logo=this.wanshanDate.fl_logo;
                      }else {
                        this.$toast(res.data.msg)
                      }
                    }
                  )
              }
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
  .baseMessage1{
    padding: 15px;
    font-size: 1rem;
    color: #000;
    h3{
      text-align: left;
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      margin-bottom: 0;
    }
    .input_box{
      overflow: hidden;
      border-bottom:1px solid rgba(223, 223, 229, 1);
      padding: 15px 0;
      text-align: left;
      label{
        width:35%;
        display: inline-block;
        text-align: left;
        font-size: 1rem;
        color: rgba(0, 0, 0, 1);
      }
      input{
        text-align: right;
        color: rgba(181, 181, 191, 1);
        font-size: 1rem;
        border: none;
        outline: none;
      }
      .fl{
        float: left;
      }
      .fr{
        float: right;
        margin-right: 17px;
      }
      .changeaddress{
      }
    }
  }
  .baseMessage2{
    padding: 0 15px;
    font-size: 1rem;
    color: #000;
    h3{
      text-align: left;
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      margin-bottom: 0;
    }
    .upload_box{
      overflow: hidden;
      p{
        margin: 15px 0;
        text-align: left;
      }
      .title{
        color:rgba(111, 113, 118, 1);
        font-size: 0.95rem;
      }
      .example{
        .example_info{
          position: absolute;
          top:0;
          left: 1rem;
          display: block;
          width: 3rem;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 0.8rem;
        }
      }
      .up_box{
        overflow: hidden;
       float: left;
        width: 48%;
        height: 6.2rem;
        border: 1px dotted #ccc;
        background: url("../assets/img/up_load_bg.png") no-repeat center 1rem/2.1rem 1.7rem;
        box-sizing: border-box;
        position: relative;
        border-radius: 8px;
        label{
          color: #a2a2a7;
          font-size: 0.9rem;
          position: absolute;
          top:3.5rem;
          left: 0;
          width: 100%;
        }
      }
      .down{
        background: url("../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
      }
      .fr{
        float: right;
      }
    }
  }
  .introduce{
    padding: 15px;
    textarea{
      border-radius: 8px;
      box-sizing: border-box;
      padding: 0.5rem;
      width: 100%;
      font-size: 1.3rem;
    }
  }
  .sub{
    color: #fff;
    background: rgba(250, 103, 52, 1);
    width: 90%;
    height: 2.8rem;
    line-height: 2.8rem;
    font-size: 0.9rem;
    margin: 3rem 0;
    border-radius: 1.4rem;
  }
  .examine{
    padding: 0.8rem;
    img{
      width: 60%;
    }
    .title{
      color: rgba(0, 0, 0, 1);
      font-size: 1rem;
      font-weight: bold;
    }
    .examine_fail_step1{
      margin-top: 30px;
      margin-bottom: 40px;
      .fail_icon{
        display: inline-block;
        width: 2rem;
        background: url("../assets/img/examine_fail_icon.png") no-repeat center center/1.2rem 1.2rem;
      }
    }
    .examine_step1{
      color: rgba(250, 103, 52, 1);
      .icon{
        display: inline-block;
        width: 1.5rem;
        background: url("../assets/img/examine_success.png") no-repeat center center/1rem 1rem;
      }
    }
    .info{
      padding:0 1rem;
      box-sizing: border-box;
      font-size: 0.95rem;
      color:rgba(111, 113, 118, 1)
    }
    .fail_info{
      color: rgba(111, 113, 118, 1);
      text-align: left;
      font-size:0.9rem;
      box-sizing: border-box;
      padding: 0 2rem 5px;
    }
  }
  .examine_step2{
    padding: 0.8rem;
    .img_box{
      overflow: hidden;
      /*background: #ccc;*/
      p{
        text-align: left;
        color:#6F7176;
        height: 2.4rem;
        line-height: 2.4rem;
        font-size: 0.95rem;
        border-bottom: 1px solid #DFDFE5;
        margin-bottom: 0.6rem;
      }
      .img_item{
        box-sizing: border-box;
          width: 50%;
          float: left;
          padding: 0.3rem;
          height: 6.5rem;
          img{
            box-sizing: border-box;
            border: 1px dotted #DFDFE5;
            border-radius: 8px;
            padding: 0.3rem;
            width: 100%;
            max-height: 5.8rem;
            overflow: hidden;
          }
          input{
            text-align: right;
            outline: none;
            border: none;
            font-size: 0.95rem;
          }
      }
      .center{
        margin: 0 auto;
        float: none;
      }
    }
    .center{text-align: center}
    .content_box{
      .head{
        font-size: 0.95rem;
        text-align: left;
        color:#6F7176;
        height: 2.4rem;
        line-height: 2.4rem;
        color:rgba(111, 113, 118, 1);
        border-bottom: 1px solid #DFDFE5;
        .router_icon{
          padding-left: 0.6rem;
          display: inline-block;
          width: 2rem;
          background: url("../assets/img/edit.png") no-repeat center center/1.8rem 1.8rem;
        }
      }
      .item_box{
        overflow: hidden;
        font-size: 0.95rem;
        color: #000000;
        padding: 1rem 0;
        border-bottom:1px solid #DFDFE5;
        .title{
          width: 35%;
          float: left;
          text-align: left;
        }
        .logo_title{
          height: 2.5rem;
          line-height: 2.5rem;
        }
        .content{
          float: right;
          width: 65%;
          text-align: right;
          .logo_label_box{
            height: 2.5rem;
            line-height: 2.5rem;
            }
          .logo_box{
            display: inline-block;
            height: 2.5rem;
            width: 2.5rem;
            img{
              height: 2.5rem;
              width: 2.5rem;
              box-sizing: border-box;
              border-radius: 50%;
            }
          }
          input{
            text-align: right;
            width: 100%;
            outline: none;
            border: none;
          }
          input::-webkit-input-placeholder{
            color:rgba(181, 181, 191, 1);
          }
          input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:rgba(181, 181, 191, 1);
          }
          input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color:rgba(181, 181, 191, 1);
          }
        }
      }
    }
  }
=======
  export default {
    name: 'RenZheng'
  }
</script>

<style scoped>

>>>>>>> 70fcb7d3231032b627f910c92869a8534e33646c
</style>
