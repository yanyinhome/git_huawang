<template>
  <div>
    <ReturnHead head_name="填写订单"></ReturnHead>
    <div class="order_mes">
      <div class="get_order_mes">
        <OrderTitle title="收花人信息"></OrderTitle>
        <div class="send_input">
          <input type="text" class="name" placeholder=" 输入姓名" v-model="WriterOrderData.or_shou_name">
          <input type="text" class="phone" placeholder=" 输入11位手机号码" v-model="WriterOrderData.or_shou_phone">
        </div>
      </div>
      <div class="send_order_mes">
        <OrderTitle :must=false title="订花人信息"></OrderTitle>
        <div class="send_input">
          <input type="text" class="name" placeholder=" 输入姓名" v-model="WriterOrderData.or_buy_name">
          <input type="text" class="phone" placeholder=" 输入11位手机号码" v-model="WriterOrderData.or_buy_phone">
        </div>
      </div>
      <div class="address">
        <OrderTitle class="address_title" title="地址选择"></OrderTitle>
        <AddressChoice class="address_set" @addressToParent="getAddress"></AddressChoice>
        <input type="text" placeholder="输入详细收货地址" class="detail_address" v-model="WriterOrderData.or_shou_address">
      </div>
      <div class="send_time">
        <OrderTitle title="送达时间"></OrderTitle>
        <div class="select_type">
          <div class="button_box padding_right">
            <mt-button class="setTime" :class="{active:WriterOrderData.or_delivery_type=='2'}" @click="changeTimeType('2')">
              时段配送
            </mt-button>
          </div>
          <div class="button_box padding_left">
            <mt-button class="setTime" :class="{active:WriterOrderData.or_delivery_type=='1'}" @click="changeTimeType('1')">
              定时配送
            </mt-button>
          </div>
        </div>
        <div class="select_time bord" v-if="WriterOrderData.or_delivery_type=='1'"><span class="wid" :class="{sjactive:sjstate==0}" @click="openPicker(2)">选择配送日期</span><span class="wid" :class="{sjactive:sjstate==1}" @click="openPicker(1)">选择配送时间</span></div>
        <div class="select_time" v-if="WriterOrderData.or_delivery_type=='2'"><span class="wid" :class="{sjactive:sjstate==0}" @click="openPicker(2)">选择配送日期</span><span @click="openPicker(3)" class="wid" :class="{sjactive:sjstate==1}">选择配送时段</span></div>
        <div class="timeshow">{{WriterOrderData.or_delivery_time}}</div>
        <div class="radio_box" v-show="pickerState">
          <div class="box">
            <p>请选择时段 <span class="close_icon" @click="closeRadio_box">&nbsp;</span></p>
            <div class="item" v-for="(item,index) in shiduan.data">
              <label :for="index"><span class="wai" :class="{active:shiduan.value==item}" ><span class="nei">&nbsp;</span></span>{{item}}</label><input type="radio" v-show="false" :id="index" :value="item" v-model="shiduan.value" name="shiduan" @change="radio_change()">
            </div>
          </div>
        </div>
        <div class="picker_box_bg" v-if="picker_box_state">
         <div class="picker_box">
           <mt-picker ref="picker1" :slots="slots" @change="onValuesChange"></mt-picker>
           <mt-button class="time_ok" @click="closePicker()">确定</mt-button>
         </div>
        </div>
        <div class="time_box">
          <mt-datetime-picker
              class="data_pick"
              ref="picker2"
              v-model="pickerVisible"
              :startDate="DataStart"
              type="date"
              year-format="{value}年"
              month-format="{value}月"
              date-format="{value}日"
              @confirm="handleConfirm">
          </mt-datetime-picker>
        </div>
      </div>
      <div class="describe">
        <OrderTitle title="花材描述"></OrderTitle>
        <input type="text" placeholder="输入需要配送的花材" class="flower_dec" v-model="WriterOrderData.or_flower_info">
      </div>
      <div class="photo">
        <OrderTitle title="花材照片"></OrderTitle>
        <div class="upload_box">
          <div class="up_load">
            <div class="img_upload_box">
              <div class="img_show_box" v-if="imgArray.length">
                <div class="item_fun" v-for="(item,index) in imgArray" :key="index">
                  <div class="item">
                    <span class="close_icon" @click="close(index)">&nbsp;</span>
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="fun_up_box" @click="openInput('upload')" v-show="imgArray.length<3">
                <div class="up_box">
                  <input  ref="upload" type="file" v-show="false" accept="image/*" @change="change($event)" multiple>
                </div>
              </div>
            </div>
            <div class="info">
              *最多上传三张图片
            </div>
          </div>
        </div>
      </div>
      <div class="number">
        <div class="num_box">
          <OrderTitle title="购买数量/成交价"></OrderTitle>
          <!--<input type="text" placeholder="输入购买数量" v-model="WriterOrderData.or_flower_num">-->
          <div class="input">
            <span>x&nbsp;</span><input type="text" placeholder="请输入数量" v-model="WriterOrderData.or_flower_num" >
          </div>
          <div class="input">
            <span>￥&nbsp;</span><input type="text" placeholder="请合理出价" v-model="WriterOrderData.or_flower_price" >
          </div>
        </div>
      </div>
      <div class="msg">
        <OrderTitle :must=false title="订单备注"></OrderTitle>
        <input type="text" placeholder="输入备注信息" class="add_msg" v-model="WriterOrderData.or_flower_content">
      </div>
      <div class="msg nopa">
        <div @click="change_textarea()" class="heka" :class="{upicon:textarea_state}">添加贺卡</div>
        <textarea v-show="textarea_state" name=""  id="" cols="30" rows="10" style="width: 100%;padding: 0.5rem;box-sizing: border-box;outline: none;border-radius: 5px;border: 1px solid #dfdfe5;font-size: 1rem;margin-bottom: 10px;" v-model="WriterOrderData.card" placeholder="如有需要，请输入贺词！"></textarea>
      </div>
      <div class="setorder">
        <OrderTitle title="是否指定花店下单"></OrderTitle>
        <div class="btn_box">
          <mt-button class="shop marginright" :class="{typeactive:xiadan_type=='1'}" @click="changType('1')">下单到平台</mt-button>
          <mt-button class="shop" :class="{typeactive:xiadan_type=='2'}" @click="changType('2')">指定到花店</mt-button>
        </div>
      </div>
      <template v-if="xiadan_type==2">
        <div class="search">
          <span class="search_icon" @click="search()">&nbsp;</span><input type="text" placeholder="QQ号、花店名称、手机号" v-model="keyword">
        </div>
        <div class="flow_shop_box">
          <template v-if="shopLists.length">
            <div class="shop_item" :class="{active_shop:activeshopid==item.id}" v-for="(item,index) in shopLists" :key="index" @click="setShopActive(item.id)">
              <div class="img_box">
                <img :src="item.fl_logo?item.fl_logo:defaullogo" alt="">
              </div>
              <div class="message_box">
                <span class="orders_info"><span class="num_color">{{item.fl_order_num}}</span>&nbsp;总接单</span>
                <p class="head">{{item.fl_name}}</p>
                <p class="address">地址：{{item.dizhi}}</p>
                <span class="phone_box">{{item.fl_phone}}</span>
                <span class="qq_box">{{item.fl_qq}}</span>
              </div>
            </div>
          </template>
          <template v-if="!shopLists.length">
            <p style="color: #6f7176">无搜索结果，请重新输入搜索内容！</p>
          </template>
        </div>
        <div class="page_box">
          <mt-button class="page_btn" :class="{un_use:pageDate.page==1}" @click="uppage()">上一页</mt-button>
          <span class="page_show" >{{pageDate.page}}/{{pageDate.pages}}</span>
          <mt-button class="page_btn" :class="{un_use:pageDate.pages==pageDate.page}" @click="downpage()">下一页</mt-button>
        </div>
      </template>
    </div>
    <div class="sub_order">
      <mt-button :class="sub_btn" @click="submit()">确认下单</mt-button>
    </div>
    <div class="pay_window_box" v-if="payWindow.show">
      <div class="pay_window_bg" v-if="payWindow.state==1">
        <span class="close_icon" @click="closePay">&nbsp;</span>
        <h3>支付</h3>
        <p class="num">￥{{pay.number}}</p>
        <div class="item_box">
          <span class="title">付款账户</span>
          <span class="content">{{pay.account}}</span>
        </div>
        <div class="item_box">
          <span class="title">付款方式</span>
          <span class="content">{{pay.type}}</span>
        </div>
        <div class="item_box">
          <span class="title">账户余额</span>
          <span class="content">{{pay.yuer}}</span>
        </div>
        <div class="item_box">
          <span class="title">安全密码</span>
          <input type="password" placeholder="请输入安全密码" v-model="pay.password">
        </div>
        <div class="btn_box">
          <mt-button @click="paymoney()">确定付款</mt-button>
        </div>
      </div>
      <div class="pay_window_bg" v-if="payWindow.state==2">
        <span class="close_icon" @click="closePay">&nbsp;</span>
        <h3>支付</h3>
        <p class="num">&nbsp;</p>
        <p class="result">{{resultMsg.result}}</p>
        <p class="info">{{resultMsg.info}}</p>
        <div class="btn_box">
          <mt-button @click="go(resultMsg.path)">{{resultMsg.btnMsg}}</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  Recommendation from '../publicComponents/RecommendDation';
  import {mapState,mapActions} from "vuex";
  import axios from  'axios';
  export default {
    name: 'WriteOrders',
    data(){
      return{
        textarea_state:false,
        picker_box_state:false,
        picker_box_date:"",
        defaullogo:require('../../assets/img/example.png'),
        //button state
        btnstate:true,
        //时间选择
        sjstate:0,
        //下单类型
        xiadan_type:1,
        activeshopid:'',
        pageDate:{
          pages:3,
          page:1
        },
        shopLists:[],
        pickerState:false,
        keyword:"",
        shiduan:{
          value:"08:00~10:00",
          //时段配送选择数据
          data:['08:00-10:00', '10:00-12:00','12:00-14:00', '14:00-16:00', '16:00-18:00','18:00-20:00','20:00-22:00',"22:00-24:00",'08:00-12:00',"12:00-18:00","18:00-22:00"],
        },
        WriterOrderData:{
          card:"",
          or_buy_name:"",
          or_buy_phone:"",
          or_shou_name:"",
          or_shou_phone:"",
          or_shou_province:"",
          or_shou_city:"",
          or_shou_area:"",
          or_shou_address:"",
          or_delivery_type:"2",
          or_delivery_time:"",
          or_flower_info:"",
          or_flower_img:"",
          or_flower_num:"1",
          or_flower_price:"",
          or_flower_content:""
        },
        pay:{
          number:"",
          account:'',
          type:'余额',
          password:"",
          yuer:"0.00",
          id:""
        },
        payWindow:{
          show:false,
          state:1
        },
        resultMsg:{
          result:"支付失败",
          info:"账户余额不足，无法完成支付，请充值",
          btnMsg:"去充值",
          path:"/rechange"
        },
        sub_btn:"sub_btn",
        pickerVisible:"",
        imgArray:[],
        imgIdArray:[],
        imgDateArray:[],
        inputShow:true,
        slots: [
          {
            flex: 1,
            values: ['1','2','3','4','5','6','7','8', '9', '10', '11', '12', '13','13','14','15','16','17','18','19','20','21','22',"23","24"],
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
        ]
      }
    },
    watch:{
      pageDate:{
        handler(value){
          this.search()
        },
        deep: true
      },
     /* WriterOrderData:{
        handler (value) {
          window.sessionStorage.WriterOrderData=JSON.stringify(value)
        },
        deep:true
      },*/
      imgArray:{
        handler (value) {
          window.sessionStorage.imgArray=value.join(' ')
        },
      },
      imgIdArray:{
        handler (value) {
          window.sessionStorage.imgIdArray=value.join(" ")
        },
      }
    },
    computed:{
      ...mapState(['userInfo']),
      DataStart(){
        return new Date(new Date())
      }
    },
    methods:{
      ...mapActions(['setUserInfo','setActiveIndex']),
      //切换贺卡显示
      change_textarea(){
        this.textarea_state=!this.textarea_state;
      },
      //关闭picker
      closePicker(){
        this.picker_box_state=false;
        if(!this.WriterOrderData.or_delivery_time){
          this.$toast("请先选择日期")
          return
        }
        const _this=this;
        this.WriterOrderData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+this.picker_box_date
      },
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
      //设置选中店铺id
      setShopActive(id){
        this.activeshopid=id;
      },
      //上一页
      uppage(){
        if(1<this.pageDate.page){
          this.pageDate.page--;
          return
        }else {
          this.$toast("已经是第一页")
        }
      },
      // 下一页
      downpage(){
        if(this.pageDate.pages>this.pageDate.page){
          this.pageDate.page++;
          return
        }else {
          this.$toast("没有下一页啦！")
        }
      },
      //时段选择
      radio_change(){
        this.closeRadio_box()
        console.log(this.WriterOrderData.or_delivery_time)
        if(!this.WriterOrderData.or_delivery_time){
          this.$toast("请先选择配送日期")
          return;
        }
        this.WriterOrderData.or_delivery_time=this.WriterOrderData.or_delivery_time.split(" ")[0]+" "+this.shiduan.value;
      },
      //搜索
      search(){
        this.$http({method:"post",url:"/api/flower/serch_flower",data:Object.assign({},{token:this.userInfo.token},{province:this.WriterOrderData.or_shou_province,city:this.WriterOrderData.or_shou_city},{keyword:this.keyword},{page:this.pageDate.page})})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                if(res.data.data.list.length==0){
                  this.shopLists=[]
                }else {
                  this.shopLists=res.data.data.list
                  this.pageDate.pages=parseInt(res.data.data.pages)
                }
              }else {
                this.$toast(res.data.msg)
                this.shopLists=[]
              }
            }
          )
      },
      //获取花店详情
      getFlowerShopDetail(id){
        this.$http({method:"post",url:"/api/flower/serch_info"})
          .then(
            res=>{
              console.log(res)
            }
          )
      },
      //跳转
      go(path){
        this.$router.push({path:path})
      },
      //修改下单类型
      changType(type){
        this.xiadan_type=type;
        if(type==2){
          this.search();
        }
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
      xiadantoFlower(){
        if(this.btnstate){
          this.btnstate=false;
          this.$http({method:'post',url:"/api/index/place_order",data:Object.assign({},{token:this.userInfo.token},{fl_id:this.activeshopid},{point:"1"},this.WriterOrderData)})
            .then(
              res=>{
                this.btnstate=true;
                if(res.data.code==200){
                  this.WriterOrderData={
                    or_buy_name:"",
                    or_buy_phone:"",
                    or_shou_name:"",
                    or_shou_phone:"",
                    or_shou_address:"",
                    or_delivery_type:"2",
                    or_delivery_time:"",
                    or_flower_info:"",
                    or_flower_img:"",
                    or_flower_num:"1",
                    or_flower_price:"",
                    or_flower_content:""
                  }
                  this.$router.push('/addorders')
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
        }
      },
      //提交订单
      submit(){
        this.WriterOrderData.or_flower_img=this.imgIdArray.join(',')
        if(!this.WriterOrderData.or_shou_name){
          this.$toast('请选择收货人姓名')
          return;
        }
        if(this.WriterOrderData.or_shou_name.length<2){
          this.$toast("收货人姓名太短")
          return;
        }
        if(!this.WriterOrderData.or_shou_phone){
          this.$toast('请输入收货人电话')
          return;
        }else if(
          /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.WriterOrderData.or_buy_phone)
        ){
          this.$toast('请输入正确的收货人电话!')
          return
        }
        if(!this.WriterOrderData.or_delivery_time){
          this.$toast('请输入送货时间')
          return;
        }
        if(!this.WriterOrderData.or_flower_img){
          this.$toast('请上传花卉图片')
          return;
        }
        if(!this.WriterOrderData.or_flower_info){
          this.$toast('请输入花卉描述')
          return;
        }
        if(!this.WriterOrderData.or_flower_num){
          this.$toast('请输入花卉数量')
          return;
        }
        if(!this.WriterOrderData.or_flower_price){
          this.$toast('请输入价格')
          return;
        }
        if(!this.WriterOrderData.or_shou_address){
          this.$toast('请输入详细地址')
          return;
        }
        if(!this.WriterOrderData.or_shou_area){
          this.$toast('请选择区域')
          return;
        }
        if(!this.WriterOrderData.or_shou_city){
          this.$toast('请选择城市')
          return;
        }
        if(!this.WriterOrderData.or_shou_province){
          this.$toast('请选择省份')
          return;
        }
        if(this.xiadan_type==1){
          console.log(this.WriterOrderData)
          this.$http({method:'post',url:"/api/index/place_order",data:Object.assign({},{token:this.userInfo.token},this.WriterOrderData)})
            .then(
              res=>{
                console.log('pay',res.data)
                if(res.data.code==200){
                  console.log(res,'xiadan')
                  this.openPay()
                  this.pay.id=res.data.data;
                  /*this.imgArray=[],
                    this.WriterOrderData={
                      or_buy_name:"",
                      or_buy_phone:"",
                      or_shou_name:"",
                      or_shou_phone:"",
                      or_shou_province:"",
                      or_shou_city:"",
                      or_shou_area:"",
                      or_shou_address:"",
                      or_delivery_type:"2",
                      or_delivery_time:"",
                      or_flower_info:"",
                      or_flower_img:"",
                      or_flower_num:"",
                      or_flower_price:"",
                      or_flower_content:""
                    }*/
                  return res.data;
                }else {
                  this.$toast(res.data.msg)
                }
              }
            ).then(
            data=>{
              console.log(data.data)
              this.$http({method:"post",url:"/api/index/pay_view",data:{token:this.userInfo.token,id:data.data}})
                .then(
                  res=>{
                    console.log(res)
                    if(res.data.code==200){
                      this.pay.account=res.data.data.pay_num
                      this.pay.number=res.data.data.total
                      this.pay.yuer=res.data.data.money
                    }
                  }
                )
            }
          )
        }
        if(this.xiadan_type==2){
          console.log(this.WriterOrderData)
          this.$http({method:'post',url:"/api/index/place_order",data:Object.assign({},{token:this.userInfo.token},{fl_id:this.activeshopid},{point:"1"},this.WriterOrderData)})
            .then(
              res=>{
                if(res.data.code==200){
                  this.openPay()
                  this.pay.id=res.data.data;
                 /* this.WriterOrderData={
                    or_buy_name:"",
                    or_buy_phone:"",
                    or_shou_name:"",
                    or_shou_phone:"",
                    or_shou_province:"1",
                    or_shou_city:"1",
                    or_shou_area:"1",
                    or_shou_address:"",
                    or_delivery_type:"2",
                    or_delivery_time:"",
                    or_flower_info:"",
                    or_flower_img:"",
                    or_flower_num:"",
                    or_flower_price:"",
                    or_flower_content:""
                  }*/
                  return res.data;
                }else {
                  this.$toast(res.data.msg)
                }
              }
            ).then(
            data=>{
              console.log(data.data)
              this.$http({method:"post",url:"/api/index/pay_view",data:{token:this.userInfo.token,id:data.data}})
                .then(
                  res=>{
                    console.log(res)
                    if(res.data.code==200){
                      this.pay.account=res.data.data.pay_num
                      this.pay.number=res.data.data.total
                      this.pay.yuer=res.data.data.money
                    }
                  }
                )
            }
          )
        }
      },
      //获取地址
      getAddress(data){
        this.WriterOrderData.or_shou_province=data.province;
        this.WriterOrderData.or_shou_city=data.city;
        this.WriterOrderData.or_shou_area=data.area;
      },
      //时间选择器选择后把time转换字符串存入提交数据
      handleConfirm(){
        const _this=this;
        if(!_this.pickerVisible){
          _this.pickerVisible=new Date(new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString())
        }
        if(this.WriterOrderData.or_delivery_type==2){
          this.WriterOrderData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+'8:00~10:00'
        }
        if(this.WriterOrderData.or_delivery_type==1){
          this.WriterOrderData.or_delivery_time=this.TimeToDate(_this.pickerVisible).split(" ")[0]+" "+'08:00'
        }
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      close(index){
        this.imgArray.splice(index,1);
        this.imgIdArray.splice(index,1);
        this.inputShow=true;
      },
      closePay(){
        this.payWindow.show=false;
        this.$router.push("/XiaWaitSend")
      },
      openPay(){
        this.payWindow.show=true;
      },
      changeState(){
        this.payWindow.state=2;
      },
      //图片上传
      change(e){
        const _this=this;
        let file=e.target.files[0];
        const param=new FormData();
        param.append("imgurl",file);
        param.append("token",this.userInfo.token);
        if(!this.WriterOrderData.or_flower_info){
          this.$toast("请先输入描述")
          return;
        }
        param.append("wenzi",this.WriterOrderData.or_flower_info);
        console.log(this.WriterOrderData.or_flower_content)
        axios.post("http://houtai.huatuan666.com/api/home/water",param,{headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
            if(res.data.code=="200"){
              this.$toast(res.data.msg)
              this.imgIdArray.push(res.data.data.img_id)
              this.imgArray.push(res.data.data.imgurl)
              if(this.imgArray.length>=3){
                this.inputShow=false;
              }
            }else {
              this.$toast(res.data.msg)
            }
          })
        /*const FileReaders=new FileReader();
        FileReaders.readAsDataURL(data);
        FileReaders.onload=function (e) {
          _this.imgArray.push(this.result)
          if(_this.imgArray.length==3){
            _this.inputShow=false
          }
        }*/
      },
      //更改配送时间类型
      changeTimeType(type){
        this.WriterOrderData.or_delivery_type=type;
      },
      //选择时段
      selectShiDuan(){
        this.WriterOrderData.or_delivery_time=this.WriterOrderData.or_delivery_time.split(" ")[0]+" "+this.shiduan.value;
        this.pickerState=false;
      },
      //关闭选择器
      closeRadio_box(){
        this.pickerState=false
      },
      //打开选择器
      openPicker(type){
        if(type==1){
          this.picker_box_state=true;
          return
        }
        if(type==2){
          this.sjstate=0;
          this.$refs.picker2.open();
          return;
        }
        if(type==3){
          this.sjstate=1;
          this.pickerState=true;
          return;
        }
      },
      //支付
      paymoney(){
        console.log(Object.assign({},{token:this.userInfo,saltword:this.pay.password,id:this.pay.id}))
        this.$http({method:"post",url:"/api/index/pay_order",data:{token:this.userInfo.token,saltword:this.pay.password,id:this.pay.id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg);
                this.$router.push({path:'/XiaWaitSend'})
                this.setActiveIndex(1)
              }else {
                this.$toast(res.data.msg);
                if(res.data.code==208){
                  this.changeState();
                  return
                }
                if(res.data.code==207){
                  this.$toast(res.data.msg)
                  return
                }
                if(res.data.code==204){
                  this.$toast(res.data.msg)
                }
              }
            }
          )
      },
      //初始化地址
      initAddress(){
        console.log(this.userInfo)
        if(this.userInfo.other){
          if(this.userInfo.other.province){
            this.WriterOrderData.or_shou_province=this.userInfo.other.province
          }
          if(this.userInfo.other.city){
            this.WriterOrderData.or_shou_city=this.userInfo.other.city
          }
          if(this.userInfo.other.or_shou_area){
            this.WriterOrderData.area=this.userInfo.other.area
          }
        }
      }
    },
    components:{
      Recommendation
    },
    created () {
      this.initAddress();
      /*if(window.sessionStorage.WriterOrderData){
        this.WriterOrderData=JSON.parse(window.sessionStorage.WriterOrderData)
      }*/
      this.WriterOrderData.or_flower_img=""
    },
    mounted () {
      console.log(this.WriterOrderData)
    }
  }
</script>

<style lang="scss" scoped>
.order_mes{
  input{
    text-indent: 0.3rem;
    outline: none;
    border: 1px solid rgba(223, 223, 229, 1);
    font-size: 1rem;
  }
  /*border-top: 5px solid #FFF2F3F5;*/
  .send_order_mes{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .send_input{
      height: 2.4rem;
      .name{
        width: 31%;
        height: 2.4rem;
        border-radius: 3px;
      }
      .phone{
        width: 65%;
        height: 2.4rem;
        border-radius: 3px;
      }
    }
  }
  .get_order_mes{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .send_input{
      height: 2.4rem;
      .name{
        width: 31%;
        height: 2.4rem;
        border-radius: 3px;
      }
      .phone{
        width: 65%;
        height: 2.4rem;
        border-radius: 3px;
      }
    }
  }
  .send_time{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .select_type{
      overflow: hidden;
      .button_box{
        float: left;
        width: 50%;
        box-sizing: border-box;
        .setTime{
          width: 100%;
          border-radius: 6px;
          color: #6F7176;
          border: 1px solid #DFDFE5;
          font-size: 0.95rem;
          background: #ffffff;
        }
        .active{
          border: 1px solid #FA6734;
          color: #000000;
        }
      }
      .padding_left{
        padding-left: 0.25rem;
      }
      .padding_right{
        padding-right: 0.25rem;
      }
    }
    .select_time{
      margin: 0.8rem auto 0;
      color: #B5B5BF;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.95rem;
      border: 1px solid #DFDFE5;
      border-radius: 6px;
      .wid{
        display: inline-block;
        width: 50%;
        box-sizing: border-box;
      }
      .sjactive{
        color: #FA6734;
      }
    }
    .timeshow{
      margin: 0.8rem auto 0;
      color: #B5B5BF;
      text-align: left;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.95rem;
      border: 1px solid #DFDFE5;
      border-radius: 6px;
      padding-left: 0.5rem;
    }
    .select_box{
      height: 2.5rem;
      line-height: 2.5rem;
    }
    .bord{
      border: 1px solid #DFDFE5;
      border-radius: 6px;
    }
  }
  .address{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .address_title{
      padding: 0.7rem 0 0;
    }
    .address_set{
      margin: 0;
    }
    .detail_address{
      width: 99%;
      height: 2.4rem;
      border-radius: 3px;
    }
  }
  .describe{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .flower_dec{
      height: 2.4rem;
      width: 100%;
      border-radius: 3px;
    }
  }
  .msg{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    .add_msg{
      height: 2.4rem;
      width: 100%;
      border-radius: 4px;
    }
    .heka{
      padding: 0.7rem 0;
      font-size: 1rem;
      color: black;
      font-weight: bold;
      text-align: left;
      background: url("../../assets/img/order_down.png") no-repeat right center/0.8rem;
    }
    .upicon{
      background: url("../../assets/img/order_up.png") no-repeat right center/0.8rem;
    }
  }
  .nopa{
    padding: 0 15px 0;
  }
  .num_box{
    padding: 0 15px 10px;
    border-bottom: 5px solid rgba(242, 243, 245, 1);
    input{
      text-indent: 0.3rem;
      width: 48%;
      height: 2.4rem;
      border-radius: 4px;
    }
    .input{
      display: inline-block;
      width: 48%;
      border:1px solid rgba(223, 223, 229, 1);
      border-radius: 4px;
      box-sizing: border-box;
      text-align: left;
      padding-left: 10px;
      input{
        border: none;
        width: 70%;
      }
    }
  }
  .setorder{
    padding: 0 15px 0px;
    .btn_box{
      margin: 0rem 0 1rem;
      .shop{
        width: 45%;
        color: rgba(111, 113, 118, 1);
        border:1px solid rgba(223, 223, 229, 1);
      }
      .marginright{
        margin-right: 1rem;
      }
      .typeactive{
        color: rgba(250, 103, 52, 1);
        border:1px solid rgba(250, 103, 52, 1);
      }
    }
  }

}
.search{
  margin: 0 15px 10px;
  background: #fff;
  background: #fff;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 8px;
  /*box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);*/
  text-align: left;
  box-sizing: border-box;
  border: 1px solid rgba(223, 223, 229, 1);
  .search_icon{
    background: url("../../assets/img/search.png") no-repeat center/1.5rem 1.5rem;
    display: inline-block;
    width: 2rem;
  }
  input{
    text-indent: 0.3rem;
    width: 80%;
    outline: none;
    border: none;
    font-size: 1.1rem;
    color: rgba(181, 181, 191, 1);
  }
}
.sub_order{
  padding-top: 30px;
  border-top: 5px solid rgba(242, 243, 245, 1);
  .sub_btn{
    margin-bottom: 2rem;
    background: rgba(250, 103, 52, 1);
    color: #fff;
    width: 90%;
    height: 2.6rem;
    line-height: 2.6rem;
    border-radius: 1.3rem;
  }
}
.photo{
  padding: 0 15px 10px;
  border-bottom: 5px solid rgba(242, 243, 245, 1);
  .upload_box{
    .info1{
      text-align: left;
      font-size: 0.85rem;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
    }
    .img_upload_box{
      overflow: hidden;
      margin-top: 0.3rem;
      .img_show_box{
        overflow: hidden;
        text-align: left;
        float: left;
        .item_fun{
          float: left;
          width: 30vw;
          padding: 0.3rem;
          text-align: center;
          height: 30vw;
          box-sizing: border-box;
          .item{
            width: 100%;
            height: 100%;
            position: relative;
            border: 1px dotted #ccc;
            box-sizing: border-box;
            border-radius: 8px;
            overflow: hidden;
            padding: 0.3rem;
            .close_icon{
              display: block;
              width: 1.8rem;
              background: url("../../assets/img/close_photo.png") no-repeat center center/1.2rem 1.2rem;
              position: absolute;
              top: 0.5rem;
              right: 0.2rem;
            }
            img{
              width: 100%;
            }
          }
        }
      }
      .fun_up_box{
        float: left;
        width: 30vw;
        height: 30vw;
        padding: 0.3rem;
        box-sizing: border-box;
        .up_box{
          width: 100%;
          height: 100%;
          border: 1px dotted #ccc;
          box-sizing: border-box;
          background: url("../../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
          background-color: rgba(223, 223, 229, 1);
          border-radius: 8px;
        }
      }
    }
    .title{
      color: rgba(0, 0, 0, 1);
      font-size: 1rem;
      text-align: left;
      background: rgba(242, 243, 245, 1);
      height: 2.4rem;
      line-height: 2.4rem;
      padding-left: 0.9rem;
      font-weight: bold;
    }
    .info{
      color: rgba(111, 113, 118, 1);
      font-size: 0.7rem;
      text-align: left;
    }
  }
  /*.img_upload_box{
    overflow: hidden;
    .img_show_box{
      overflow: hidden;
      text-align: left;
      .item{
        position: relative;
        float: left;
        width: 33.3%;
        box-sizing: border-box;
        padding: 0.3rem;
        text-align: center;
        height: 6rem;
        overflow: hidden;
        .close_icon{
          display: block;
          width: 1.8rem;
          background: url("../../assets/img/close_photo.png") no-repeat center center/1.2rem 1.2rem;
          position: absolute;
          top: 0.5rem;
          right: 0.2rem;
        }
        .img_box{
          border: 1px solid #ccc;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0.3rem;
          img{
            width: 100%;
            box-sizing: border-box;
          }
        }
      }
    }
    .up_box{
      float: left;
      width: 33.3%;
      box-sizing: border-box;
      padding: 0.3rem;
      text-align: center;
      height: 6rem;
      overflow: hidden;
      margin: 1rem 0;
      border: 1px dotted #ccc;
      background: url("../../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
      border-radius: 8px;
    }
  }*/
}
.pay_window_box{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  .pay_window_bg{
    padding: 0.8rem;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    .close_icon{
      background: url("../../assets/img/addprice_close.png") no-repeat center/2.5rem 2.5rem;
      width: 3rem;
      display: block;
      position: absolute;
      right: 0.8rem;
      top: 0.8rem;
    }
    h3{
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 1);
      padding-bottom: 0.9rem;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
    }
    .num{
      font-size: 2rem;
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
      padding: 0.8rem 0;
    }
    .result{
      color: rgba(250, 103, 52, 1);
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .info{
      color: rgba(111, 113, 118, 1);
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    .item_box{
      font-size: 1rem;
      height: 3rem;
      box-sizing: border-box;
      line-height: 3rem;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      .title{
        color: rgba(111, 113, 118, 1);
        display: inline-block;
        width: 30%;
      }
      .content{
        display: inline-block;
        width: 68%;
        text-align: right;
      }
      input{
        text-indent: 0.3rem;
        width: 68%;
        text-align: right;
        font-size: 1rem;
        outline: none;
        border: none;
        box-sizing: border-box;
      }
    }
    .btn_box{
      margin: 1.5rem 0;
      .mint-button{
        background: rgba(250, 103, 52, 1);
        color: #fff;
        height: 2.8rem;
        line-height: 2.8rem;
        border-radius: 1.4rem;
        font-size: 0.9rem;
        width: 45%;
      }
    }
  }
}
.radio_box{
  position: fixed;
  width:100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 99;
  .box{
    border-radius: 8px;
    text-align: left;
    background: #fff;
    margin: 15% 1rem 0;
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
.page_box{
  margin-top: 20px;
  margin-bottom: 15px;
  .page_btn{
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    width: 25%;
    color: #000;
  }
  .un_use{
    color: #DFDFE5;
  }
  .page_show{
    display: inline-block;
    font-size: 1rem;
    margin: 0 2rem;
  }
}
.flow_shop_box{
  padding: 0 15px 10px;
  margin-top: 15px;
  .shop_item{
    padding-top: 0.5rem;
    box-sizing: border-box;
    height: 6rem;
    overflow: hidden;
    border: 1px solid #4D242D24;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(36, 45, 36, 0.3);
    .img_box{
      padding-top: 1rem;
      height: 100%;
      float: left;
      width:20%;
      padding-left: 10px;
      box-sizing: border-box;
      overflow: hidden;
      img{
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        box-sizing: border-box;
        border: 2px solid #354236;
      }
    }
    .message_box{
      float: right;
      width: calc(80% - 5px);
      position: relative;
      text-align: left;
      .orders_info{
        font-size: 0.85rem;
        color: rgba(36, 45, 36, 0.5);;
        position: absolute;
        top:5px;
        right: 10px;
        .num_color{
          color: #FA6734;
        }
      }
      p{
        margin: 5px 0px;
      }
      .head{
        font-size: 1rem;
        font-weight: bold;
        text-align: left;
      }
      .address{
        font-size: 0.85rem;
        text-align: left;
        padding: 0;
        border-bottom: 0;
      }
      .phone_box{
        color: rgba(36, 45, 36, 0.5);
        padding-left: 1rem;
        font-size: 0.85rem;
        background: url("../../assets/img/shop-phone.png") no-repeat left/0.8rem 0.8rem;
        margin-right: 0.8rem;
      }
      .qq_box{
        color: rgba(36, 45, 36, 0.5);
        padding-left: 1rem;
        font-size: 0.85rem;
        background: url("../../assets/img/shop-qq.png") no-repeat left/0.8rem 0.8rem;
      }
    }
  }
  .active_shop{
    border: 1px solid rgba(255, 160, 134, 1);
  }
}
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
.data_pick{
  /deep/ .picker{
    .picker-items{
      .picker-slot:first-child{
        display: none;
      }
    }
  }
}
</style>
