<template>
  <div class="hello">
    <div class="selct_box">
      <label for="province">省份</label>
      <select v-model="addressSubmit.province" @change="getC()" id="province" v-show="true">
        <option :value="key" v-for="(value,key) in addressDate.province">{{value}}</option>
      </select>
    </div>
    <div class="selct_box">
      <label for="city">城市</label>
      <select v-model="addressSubmit.city" @change="getA()" id="city" v-show="true">
        <option value="0" disabled>请选择一项</option>
        <option :value="key" v-for="(value,key) in addressDate.city">{{value}}</option>
      </select>
    </div>
    <div class="selct_box">
      <label for="area">地区</label>
      <select v-model="addressSubmit.area" id="area" v-show="true">
        <option value="0" disabled>请选择一项</option>
        <option :value="key" v-for="(value,key) in addressDate.area">{{value}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'AddressChoice',
  data () {
    return {
      addressSubmit:{
        province:"1",
        city:"1",
        area:"1"
      },
      addressDate:{
        province:{},
        city:{},
        area:{},
      }
    }
  },
  computed:{
    ...mapState(['userInfo',"againRenzheng"]),
    cityChange(){
      return this.addressSubmit.city
    }
  },
  props:["state"],
  watch:{
    addressSubmit:{
      handler(val){
        this.$emit('addressToParent',val);
      },
      deep:true
    },
    cityChange:{
      handler (val) {
        this.getA()
      }
    }
  },
  methods:{
    getC(){
      this.getCity(this.addressSubmit.province);
    },
    getA(){
      this.getArea(this.addressSubmit.city);
    },
    //获取城市
    getCity(id){
      this.$http({method:'post',url:"/api/home/get_city",data:{token:this.userInfo.token,province:id}})
        .then(
          res=>{
            if(res.data.code==200){
              const data=res.data.data;
              this.addressDate.city=data;
              for(let i in data){
                if(id==i){
                  this.addressSubmit.city=i;
                  break;
                }
              }
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    },
    //获取省份
    getProvince(){
      this.$http({method:'post',url:"/api/home/province_list",data:{}})
        .then(
          res=>{
            if(res.data.code==200){
              const data=res.data.data;
              this.addressDate.province=data;
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    },
    //获取地区
    getArea(id){
      console.log("city",id)
      this.$http({method:'post',url:"/api/home/get_area",data:{city:id}})
        .then(
          res=>{
            if(res.data.code==200){
              const data=res.data.data;
              this.addressDate.area=data;
              for(let i in data){
                if(id==i){
                  this.addressSubmit.area=i;
                  break;
                }
              }
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    },
    //获取一个对象的key或者value数组
    ObjToArray(obj,type="key"){
      const Array=[];
      if(type=='key'){
        for(let i in obj){
          Array.push(i);
        }
        return Array;
      }
      if(type=='val'){
        for(let i in obj){
          Array.push(obj[i]);
        }
        return Array;
      }
    }
  },
  created() {
    let state=this.state;
    let _this=this;
    console.log(typeof state,state)
    switch ( state) {
      case 1:
        if(this.againRenzheng){
          if(this.againRenzheng.provice){
            this.addressSubmit.province=this.againRenzheng.provice
          }
          if(this.againRenzheng.city){
            this.addressSubmit.city=this.againRenzheng.city
          }
          if(this.againRenzheng.area){
            this.addressSubmit.area=this.againRenzheng.area
          }
        };
        this.getProvince();
        this.getCity(this.addressSubmit.province);
        this.getArea(this.addressSubmit.city);
        break;
      case 2:
        this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
          .then(
            res=>{
              if(res.data.code==200){
                this.addressSubmit.province=res.data.data.fl_province
                this.addressSubmit.city=res.data.data.fl_city
                this.addressSubmit.area=res.data.data.fl_area
                this.getProvince();
                this.getCity(this.addressSubmit.province);
                this.getArea(this.addressSubmit.city);
              }else {
                this.$toast(res.data.msg);
              }
            }
          )
        break;
      case 3:
        this.$http({method:'post',url:"/api/user/upuserview",data:{token:this.userInfo.token,username:this.userInfo.username}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res,"state3 ")
                if(res.data.data.province){
                  this.addressSubmit.province=res.data.data.province
                  this.addressSubmit.city=res.data.data.city
                  this.addressSubmit.area=res.data.data.area
                  this.getProvince();
                  this.getCity(this.addressSubmit.province);
                  this.getArea(this.addressSubmit.city);
                }
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
        break;
      case 4:
        this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res,"state4")
                if(res.data.data.fl_province){
                  console.log(12355555)
                  this.addressSubmit.province=res.data.data.fl_province
                  this.addressSubmit.city=res.data.data.fl_city
                  this.addressSubmit.area=res.data.data.fl_area
                  console.log(this.addressSubmit,1111111111)
                  this.getProvince();
                  this.getCity(this.addressSubmit.province);
                  this.getArea(this.addressSubmit.city);
                }
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
        break;
      default:
        this.$http({method:'post',url:"/api/user/upuserview",data:{token:this.userInfo.token,username:this.userInfo.username}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res,"state0")
                if(res.data.data.province){
                  this.addressSubmit.province=res.data.data.province
                  this.addressSubmit.city=res.data.data.city
                  this.addressSubmit.area=res.data.data.area
                  this.getProvince();
                  this.getCity(this.addressSubmit.province);
                  this.getArea(this.addressSubmit.city);
                }else {
                  this.getProvince();
                  this.getCity(this.addressSubmit.province);
                  this.getArea(this.addressSubmit.city);
                }
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
        break;
    }
   /* if(this.state==1){
      console.log("state1")
      if(this.againRenzheng){
        if(this.againRenzheng.provice){
          this.addressSubmit.province=this.againRenzheng.provice
        }
        if(this.againRenzheng.city){
          this.addressSubmit.city=this.againRenzheng.city
        }
        if(this.againRenzheng.area){
          this.addressSubmit.area=this.againRenzheng.area
        }
      }
      this.getProvince();
      this.getCity(this.addressSubmit.province);
      this.getArea(this.addressSubmit.city);
    }*/
    /*if(this.state==2){
      console.log("state2")
      this.$http({method:"post",url:"/api/flower/flower_message",data:{token:this.userInfo.token}})
        .then(
          res=>{
            if(res.data.code==200){
              this.addressSubmit.province=res.data.data.fl_province
              this.addressSubmit.city=res.data.data.fl_city
              this.addressSubmit.area=res.data.data.fl_area
              this.getProvince();
              this.getCity(this.addressSubmit.province);
              this.getArea(this.addressSubmit.city);
            }else {
              this.$toast(res.data.msg);
            }
          }
        )
    }*/
    /*if(this.state==3){
      console.log("state3")
      this.$http({method:'post',url:"/api/user/upuserview",data:{token:this.userInfo.token,username:this.userInfo.username}})
        .then(
          res=>{
            if(res.data.code==200){
              if(res.data.data.province){
                this.addressSubmit.province=res.data.data.province
                this.addressSubmit.city=res.data.data.city
                this.addressSubmit.area=res.data.data.area
              }
              this.getProvince();
              this.getCity(this.addressSubmit.province);
              this.getArea(this.addressSubmit.city);
            }else {
              this.$toast(res.data.msg)
            }
          }
        )
    }*/
    /*if(this.userInfo.other){
      console.log("state")
      if(this.userInfo.other.province){
        this.addressSubmit.province=this.userInfo.other.province
      }
      if(this.userInfo.other.city){
        this.addressSubmit.city=this.userInfo.other.city
      }
      if(this.userInfo.other.area){
        this.addressSubmit.area=this.userInfo.other.area
      }
    }*/
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  margin-top:15px;
  .selct_box{
    text-align: center;
    padding: 10px 0;
    overflow: hidden;
    display: inline-block;
    width: 32%;
    label{
        font-size: 0.95rem;
        vertical-align: middle;
         float: left;
         text-align: right;
      }
    select{
      width: 70%;
      float: right;
    }
  }
}
</style>
