<template>
  <div class="search_box">
    <div class="title"><span class="search_icon" @click="change_rule_box(true)">搜索</span><span v-if="rule_box_state" class="close_icon" @click="change_rule_box(false)">&nbsp;</span></div>
    <div class="rule_box" v-if="rule_box_state">
      <div class="alert_items">
        <div class="fl item" @click="openPicker(2)">请选择日期</div>
        <div class="fl item" @click="openPicker(3)">请选择时段</div>
        <div class="fl item" @click="openPicker(1)">请选择时间</div>
        <div class="fl item" @click="openPicker(4)">请选择地址</div>
      </div>
      <div class="input_box">
        <div class="input_item"><input type="text" v-model="SearchData.or_shou_name" placeholder="请输入收花人姓名"></div>
        <div class="input_item"><input type="text" v-model="SearchData.or_shou_phone" placeholder="请输入收花人电话"></div>
        <div class="input_item"><input type="text" v-model="SearchData.or_fl_username" placeholder="请输入接单人用户名"></div>
        <div class="input_item"><input type="text" v-model="SearchData.or_delivery_time" placeholder="请输入送达时间"></div>
        <div class="input_item" style="width: 100%">当前搜索地址：{{addressShow.province}}{{addressShow.city}}{{addressShow.area}}<span class="clear" @click="clearaddress()">清空</span></div>
      </div>
      <div class="address_box" v-if="addressBox.state">
        <div class="radio_box" v-if="addressBox.step==1">
          <div class="box" @click="gonext()">
            <p>请选择省份 <span class="close_icon" @click="closePicker(4)">&nbsp;</span></p>
            <div class="item" v-for="(val,key) in addressDate.province">
              <label :for="key"><span class="wai" :class="{active:SearchData.or_shou_province==key}" ><span class="nei">&nbsp;</span></span>{{val}}</label><input type="radio" v-show="false" :id="key" :value="key" v-model="SearchData.or_shou_province" name="provice" @change="addradio_change(1)">
            </div>
          </div>
        </div>
        <div class="radio_box" v-if="addressBox.step==2">
          <div class="box">
            <p>请选择城市 <span class="close_icon" @click="closePicker(4)">&nbsp;</span></p>
            <div class="item" v-for="(val,key) in addressDate.city">
              <label :for="key"><span class="wai" :class="{active:SearchData.or_shou_city==key}" ><span class="nei">&nbsp;</span></span>{{val}}</label><input type="radio" v-show="false" :id="key" :value="key" v-model="SearchData.or_shou_city" name="city" @change="addradio_change(2)">
            </div>
          </div>
        </div>
        <div class="radio_box" v-if="addressBox.step==3">
          <div class="box">
            <p>区域 <span class="close_icon" @click="closePicker(4)">&nbsp;</span></p>
            <div class="item" v-for="(val,key) in addressDate.area">
              <label :for="key"><span class="wai" :class="{active:SearchData.or_shou_area==key}" ><span class="nei">&nbsp;</span></span>{{val}}</label><input type="radio" v-show="false" :id="key" :value="key" v-model="SearchData.or_shou_area" name="area" @change="addradio_change(3)">
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center"> <mt-button class="begin_search" @click="begin_search()">开始搜索</mt-button></div>
    </div>
    <!--日期选择器-->
    <div class="time_box">
      <mt-datetime-picker
          ref="picker2"
          v-model="pickerVisible"
          type="date"
          year-format="{value}年"
          month-format="{value}月"
          date-format="{value}日"
          @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <!--时间选择器-->
    <div class="picker_box_bg" v-if="picker_box_state">
      <div class="picker_box">
        <mt-picker ref="picker1" :slots="slots" @change="onValuesChange"></mt-picker>
        <mt-button class="time_ok" @click="closePicker(1)">确定</mt-button>
      </div>
    </div>
    <!--时段选择器-->
    <div class="radio_box" v-show="pickerState">
      <div class="box">
        <p>请选择时段 <span class="close_icon" @click="closePicker(2)">&nbsp;</span></p>
        <div class="item" v-for="(item,index) in shiduan.data">
          <label :for="index"><span class="wai" :class="{active:shiduan.value==item}" ><span class="nei">&nbsp;</span></span>{{item}}</label><input type="radio" v-show="false" :id="index" :value="item" v-model="shiduan.value" name="shiduan" @change="radio_change()">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'orderSearch',
    data(){
      return{
        rule_box_state:false,
        //日期选择
        pickerVisible:new Date(),
        //时间选择
        picker_box_state:false,
        picker_box_date:"",
        slots: [
          {
            flex: 1,
            values: ['8', '9', '10', '11', '12', '13','13','14','15','16','17','18','19','20','21','22'],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '时',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['0','5','10','15','20','25','30','35','40','45','50','55'],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '分',
            className: 'slot4'
          }
        ],
        //时段选择
        pickerState:"",
        shiduan:{
          value:"08:00~10:00",
          //时段配送选择数据
          data:['08:00-10:00', '10:00-12:00','12:00-14:00', '14:00-16:00', '16:00-18:00','18:00-20:00','20:00-22:00'],
        },
        //地址选择
        addressBox:{
          state:false,
          step:1
        },
        addressDate:{
          province:{},
          city:{},
          area:{}
        },
        addressShow:{
          province:"",
          city:"",
          area:""
        },
        SearchData:{
          or_shou_name:"",
          or_shou_phone:"",
          or_delivery_time:"",
          or_fl_username:"",
          create_time1:"",
          create_time2:"",
          or_shou_province:"",
          or_shou_city:"",
          or_shou_area:""
        }
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      clearaddress(){
        this.SearchData.or_shou_province="";
        this.SearchData.or_shou_city="";
        this.SearchData.or_shou_area="";
        this.addressShow.province="";
        this.addressShow.city="";
        this.addressShow.area="";
      },
      //获取城市
      getCity(id){
        this.$http({method:'post',url:"/api/home/get_city",data:{token:this.userInfo.token,province:id}})
          .then(
            res=>{
              if(res.data.code==200){
                const data=res.data.data;
                this.addressDate.city=data;
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //获取省份
      getProvince(){
        console.log("provice")
        this.$http({method:'post',url:"/api/home/province_list",data:{}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res)
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
        this.$http({method:'post',url:"/api/home/get_area",data:{city:id}})
          .then(
            res=>{
              if(res.data.code==200){
                const data=res.data.data;
                this.addressDate.area=data;
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
    //  切换显示隐藏
      change_rule_box(state){
        this.rule_box_state=state
      },
      //打开选择器
      openPicker(type){
        if(type==1){
          this.picker_box_state=true;
          return
        }
        if(type==2){
          this.$refs.picker2.open();
          return;
        }
        if(type==3){
          this.pickerState=true;
          return;
        }
        if(type==4){
          this.addressBox.state=true;
        }
      },
      //关闭picker
      closePicker(type){
        //关闭时间选择器
        if(type==1){
          this.picker_box_state=false;
          const _this=this;
          if(_this.pickerVisible){
            this.SearchData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+this.picker_box_date
          }else {
            this.SearchData.or_delivery_time=this.picker_box_date
          }
          return
        }
      //关闭时段选择器
        if(type==2){
          this.pickerState=false
        }
        if(type==4){
          this.addressBox.state=false;
          this.addressBox.step=1
        }
      },
    //  时间选择器change事件
      //picker change事件
      onValuesChange(picker, values) {
        console.log(values)
        this.picker_box_date=values.map(function (item) {
          if(item.length==1){
            return "0"+item
          }else {
            return item
          }
        }).join(":")
      },
      //时段选择
      radio_change(){
        this.closePicker(2)
        const _this=this;
        if(_this.pickerVisible){
          this.SearchData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+this.shiduan.value;
        }else {
          this.SearchData.or_delivery_time=this.shiduan.value;
        }
      },
    //  地址选择
      addradio_change(step){
        switch (step) {
          case 1:
            this.addressBox.step=2;
            this.getCity(this.SearchData.or_shou_province)
            this.addressShow.province=this.addressDate.province[this.SearchData.or_shou_province]
            break;
          case 2:
            this.addressBox.step=3;
            this.getArea(this.SearchData.or_shou_city)
            this.addressShow.city=this.addressDate.city[this.SearchData.or_shou_city]
            break;
          case 3:
            this.addressBox.step=1;
            this.closePicker(4)
            this.addressShow.area=this.addressDate.area[this.SearchData.or_shou_area]
            break;
          default:
            break;
        }
      },
    //点击空白跳往下一步
      gonext(){
        let step=this.addressBox.step;
        switch (step) {
          case 1:
            if(this.SearchData.or_shou_province){
              this.addressBox.step=2;
              this.getCity(this.SearchData.or_shou_province)
            }
            break;
          case 2:
            if(this.SearchData.or_shou_city){
              this.addressBox.step=3;
              this.getCity(this.SearchData.or_shou_city)
            }
            break;
          case 3:
            if(this.SearchData.or_shou_area){
              this.addressBox.step=1;
              this.closePicker(4)
            }
            break;
          default:
            break;
        }
      },
    // 提交搜索数据
      begin_search(){
        console.log(this.addressShow,"show")
        this.$emit("beginSearch",this.SearchData)
      },
      //日期选择器选择后把time转换字符串存入提交数据
      handleConfirm(){
        const _this=this;
        this.SearchData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]
       /* if(!_this.pickerVisible){
          _this.pickerVisible=new Date(new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString())
        }
        if(this.WriterOrderData.or_delivery_type==2){
          this.WriterOrderData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+'8:00~10:00'
        }
        if(this.WriterOrderData.or_delivery_type==1){
          this.WriterOrderData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+'08:00'
        }*/
      },
      //时间戳转换时间函数
      TimeToDate(shijianchuo){
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return `${y}-${m<10?'0'+m:m}-${d<10?'0'+d:d} ${h<10?'0'+h:h}:${mm<10?'0'+mm:mm}`
      },
    },
    created () {
      this.getProvince()
    }
  }
</script>

<style lang="scss" scoped>
  .search_box{
    text-align: left;
    font-size: 1rem;
    padding: 0 15px 0;
    .title{
      padding-left: 5px;
      font-weight: bold;
      .search_icon{
        display: inline-block;
        padding-right: 2rem;
        background: url("../../assets/img/search.png") no-repeat right center/1.5rem 1.5rem;
      }
      .close_icon{
        float: right;
        width: 2rem;
        background: url("../../assets/img/login_close.png") no-repeat center center/1rem 1rem;
      }
    }
    .rule_box{
      box-sizing: border-box;
      .alert_items{
        overflow: hidden;
        padding: 10px 0;
        .fl{
          float: left;
        }
        .item{
          color: #ffffff;
          background: #fa6734;
          box-sizing: border-box;
          border: 1px solid #fa6734;
          border-radius: 5px;
          font-size: 0.8rem;
          padding: 5px 0;
          width: 24%;
          margin-right: 1%;
          text-align: center;
        }
        item:last-child{
          margin-right: 0;
        }
      }
      .input_box{
        overflow: hidden;
        .input_item{
          float: left;
          width: 50%;
          box-sizing: border-box;
          padding: 5px;
          input{
            width: 100%;
            font-size: 0.95rem;
            padding: 5px 10px;
            box-sizing: border-box;
            border-radius: 5px;
            outline: none;
            box-shadow: none;
            border: 1px solid #b5b5bf;
          }
          .clear{
            float: right;
            color: #6f7176;
          }
        }
      }
      .begin_search{
        color: #ffffff;
        width: 50%;
        background:#fa6734;
        border-radius: 5px;
        font-size: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
    /*时间选择*/
    .picker_box_bg{
      position: fixed;
      z-index: 9999;
      width:100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      box-sizing: border-box;
      top: 0;
      left: 0;
      .picker_box{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 40px;
        height: 40%;
        background: #ffffff;
        text-align: center;
        .time_ok{
          margin-top: 20px;
          background:#FA6734;
          width: 50%;
          height:36px;
          line-height: 36px;
          color: #ffffff;
          border-radius: 18px;
          font-size: 1rem;
        }
      }
    }
    /*时段选择*/
    .radio_box{
      position: fixed;
      width:100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      box-sizing: border-box;
      top: 0;
      left: 0;
      z-index: 999;
      .box{
        border-radius: 8px;
        text-align: left;
        background: #fff;
        margin: 50% 1rem 0;
        padding: 1rem;
        p{
          color: #000000;
          padding: 0.5rem 0;
          .close_icon{
            float: right;
            width: 1rem;
            background: url("../../assets/img/addprice_close.png") no-repeat center center/1rem;
          }
        }
        .item{
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #EEEEEE;
          height: 1rem;
          line-height: 1rem;
          .wai{
            text-align: center;
            margin-right: 0.7rem;
            display: inline-block;
            background: #ffffff;
            width: 1rem;
            height: 1rem;
            vertical-align:middle;
            border-radius: 50%;
            border: 1px solid #999999 ;
            position: relative;
          }
          .active{
            border: 1px solid #FA6734;
            .nei{
              vertical-align: middle;
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              background:#FA6734;
              position: absolute;
              left: 0.25rem;
              top: 0.25rem;
            }
          }
        }
        .item:last-child{
          border-bottom: none;

        }
      }
    }
    /*地址选择*/
    .address_box{
      .radio_box{
        position: fixed;
        width:100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        box-sizing: border-box;
        top: 0;
        left: 0;
        z-index: 999;
        .box{
          border-radius: 8px;
          text-align: left;
          background: #fff;
          margin: 10% 1rem 0;
          height: 80%;
          overflow: auto;
          padding: 1rem;
          p{
            color: #000000;
            padding: 0.5rem 0;
            .close_icon{
              float: right;
              width: 1rem;
              background: url("../../assets/img/addprice_close.png") no-repeat center center/1rem;
            }
          }
          .item{
            padding: 1rem 0.5rem;
            border-bottom: 1px solid #EEEEEE;
            height: 1rem;
            line-height: 1rem;
            .wai{
              text-align: center;
              margin-right: 0.7rem;
              display: inline-block;
              background: #ffffff;
              width: 1rem;
              height: 1rem;
              vertical-align:middle;
              border-radius: 50%;
              border: 1px solid #999999 ;
              position: relative;
            }
            .active{
              border: 1px solid #FA6734;
              .nei{
                vertical-align: middle;
                display: inline-block;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                background:#FA6734;
                position: absolute;
                left: 0.25rem;
                top: 0.25rem;
              }
            }
          }
          .item:last-child{
            border-bottom: none;

          }
        }
      }
    }
  }
</style>
