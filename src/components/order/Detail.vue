<template>
<div>
<ReturnHead head_name="订单详情"></ReturnHead>
<div v-if="order.type==1">
<template v-if="order.step==0">
  <div class="info_box">
    <div class="title">花材信息</div>
    <div class="dec">
      <div class="img_box" @click="showpic('true')">
        <img :src="orderdetail.img" alt="">
      </div>
      <div class="right_content">
        <p class="font_dec">{{orderdetail.or_flower_info}}</p>
        <p class="num">x{{orderdetail.or_flower_num}}</p>
      </div>
    </div>
  </div>
  <div class="order_detail_box">
    <div class="title">
      订单信息
    </div>
    <div class="conten_box">
      <div class="item_box">
        <div class="left">
          订单编号:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_number}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          下单时间:
        </div>
        <div class="right">
          <p>
            {{orderdetail.create_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          收花信息:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_buy_name}}
          </p>
          <p>
            {{orderdetail.or_shou_phone}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          详细地址:
        </div>
        <div class="right">
          <p>
            {{orderdetail.dizhi}}
          </p>
          <p>
            {{orderdetail.or_shou_address}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          送达时间:
        </div>
        <div class="right">
          <p class="time">
            {{orderdetail.or_delivery_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          订单备注:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_flower_content}}
          </p>
        </div>
      </div>
      <div class="price">￥{{orderdetail.or_flower_total}}</div>
      <div class="bg_icon">
        待接单
      </div>
    </div>
  </div>
  <div class="btn_box">
    <mt-button class="receive" @click="">确定接单</mt-button>
    <mt-button class="cancle" @click="refuseorder()">拒绝接单</mt-button>
  </div>
</template>
<template v-if="order.step==3">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_buy_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            送达时间:
          </div>
          <div class="right">
            <p class="time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_flower_content}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          待配送
        </div>
      </div>
    </div>
    <div class="btn_box peisong">
      <mt-button class="receive" @click="beginSend()">开始配送</mt-button>
      <mt-button class="cancle" @click="quxiao(orderdetail.id)">取消订单</mt-button>
    </div>
  </template>
<template v-if="order.step==1">
  <div class="info_box">
    <div class="title">花材信息</div>
    <div class="dec">
      <div class="img_box" @click="showpic('true')">
        <img :src="orderdetail.img" alt="">
      </div>
      <div class="right_content">
        <p class="font_dec">{{orderdetail.or_flower_info}}</p>
        <p class="num">x{{orderdetail.or_flower_num}}</p>
      </div>
    </div>
  </div>
  <div class="order_detail_box">
    <div class="title">
      订单信息
    </div>
    <div class="conten_box">
      <div class="item_box">
        <div class="left">
          订单编号:
        </div>
        <div class="right ordernum">
          <p>
            {{orderdetail.or_number}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          下单时间:
        </div>
        <div class="right">
          <p>
            {{orderdetail.create_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          收花信息:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_shou_name}}
          </p>
          <p>
            {{orderdetail.or_shou_phone}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          详细地址:
        </div>
        <div class="right">
          <p>
            {{orderdetail.dizhi}}
          </p>
          <p>
            {{orderdetail.or_shou_address}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          送达时间:
        </div>
        <div class="right">
          <p class="time">
            {{orderdetail.or_delivery_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          订单备注:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_flower_info}}
          </p>
        </div>
      </div>
      <div class="btnbox">
        <div class="btn left"><span><a :href="'tel:'+orderdetail.or_shou_phone">联系送花人</a></span></div>
        <div class="btn"><span><a :href="'tel:'+orderdetail.or_buy_phone">联系收花人</a></span></div>
      </div>
      <div class="price">￥{{orderdetail.or_flower_total}}</div>
      <div class="bg_icon sending">
        配送中
      </div>
    </div>
  </div>
  <div class="upload_box">
    <div class="title">
      上传送达照片
    </div>
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
  <div class="btn_box complate">
    <mt-button class="receive" @click="complete">完成配送</mt-button>
    <mt-button class="cancle" @click="quxiao(orderdetail.id)">取消订单</mt-button>
  </div>
</template>
<template v-if="order.step==2">
  <div class="info_box">
    <div class="title">花材信息</div>
    <div class="dec">
      <div class="img_box">
        <img :src="orderdetail.img" alt="" @click="showpic('true')">
      </div>
      <div class="right_content">
        <p class="font_dec">{{orderdetail.or_flower_info}}</p>
        <p class="num">x{{orderdetail.or_flower_num}}</p>
      </div>
    </div>
  </div>
  <div class="order_detail_box">
    <div class="title">
      订单信息
    </div>
    <div class="conten_box">
      <div class="item_box">
        <div class="left">
          订单编号:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_number}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          下单时间:
        </div>
        <div class="right">
          <p>
            {{orderdetail.create_time}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          收花信息:
        </div>
        <div class="right">
          <p>
            {{orderdetail.or_shou_name}}
          </p>
          <p>
            {{orderdetail.or_shou_phone}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          详细地址:
        </div>
        <div class="right">
          <p>
            {{orderdetail.dizhi}}
          </p>
          <p>
            {{orderdetail.or_shou_address}}
          </p>
        </div>
      </div>
      <div class="item_box">
        <div class="left">
          派送时间:
        </div>
        <div class="right">
          <p class="send_time">
            {{orderdetail.or_delivery_time}}
          </p>
        </div>
      </div>
      <div class="btnbox">
        <div class="btn one"><span><a :href="'tel:'+orderdetail.or_shou_phone">联系收花人</a></span></div>
      </div>
      <div class="price">￥{{orderdetail.or_flower_total}}</div>
      <div class="bg_icon after_sale">
        待处理
      </div>
    </div>
    <div class="reason_box">
      <div class="reason">
        <div class="left">
          退款原因:
        </div>
        <div class="right">
          <p>
            花束包装破损，有个别花朵已经破损了，要求退款。
          </p>
        </div>
      </div>
    </div>
    <div class="evidemce">
      <p class="title_name">
        退款凭证：
      </p>
      <div class="imgs_box">
        <div class="img_show_box" v-if="imgArray.length">
          <div class="item_fun" v-for="(item,index) in imgArray" :key="index">
            <div class="item">
              <span class="close_icon" @click="close(index)">&nbsp;</span>
              <img  :src="item" alt="">
            </div>
          </div>
        </div>
        <div class="img_show_box" v-if="!imgArray.length">
          <p class="info">未有图片上传！</p>
        </div>
      </div>
    </div>
  </div>
  <div class="btn_box btn_aftersale">
    <mt-button class="refund">同意退款</mt-button>
    <mt-button class="refund" @click="go('/refuserefund')">拒绝退款</mt-button>
  </div>
</template>
  <template v-if="order.step==2.5">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon complate">
          已完成
        </div>
        <mt-button class="add_blackOrder" @click="add_black">加入黑名单</mt-button>
      </div>
    </div>
  </template>
  <template v-if="order.step==5">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box">
          <img :src="orderdetail.img" alt="" @click="showpic('true')">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          已拒绝
        </div>
      </div>
    </div>
  </template>
  <template v-if="order.step==6">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon complate">
          已拒绝
        </div>
      </div>
    </div>
  </template>
  <template v-if="order.step==4">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon complate">
          已取消
        </div>
      </div>
    </div>
  </template>
</div>
<div v-if="order.type==2">
  <template v-if="order.step==0">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box">
          <img :src="orderdetail.img" alt="" @click="showpic('true')">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            送达时间:
          </div>
          <div class="right">
            <p class="time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_flower_content}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon unpay" style="text-align: center">
          未付款
        </div>
      </div>
    </div>
    <div class="upload_box" v-if="orderdata.flows">
      <div class="title">
        店铺信息
      </div>
      <div class="flower_shop_info">
        <div class="img_box">
          <img :src="orderdata.flows.fl_logo" alt="">
        </div>
        <div class="font_box">
          <p class="shop_name">{{orderdata.flows.fl_name}}</p>
          <p class="shop_address">
            {{orderdata.flows.fl_address}}
          </p>
        </div>
      </div>
      <div class="btnbox">
        <div class="btn left"><span><a :href="'tel:'+orderdata.flows.fl_phone">联系店铺</a></span></div>
        <div class="btn qq"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderdata.flows.fl_qq+'&site=qq&menu=yes'">在线联系</a> </span></div>
      </div>
    </div>
    <div class="btn_box upay" :class="{noshop:!orderdata.flows}">
      <mt-button class="receive" @click="openpay(orderdetail.id)">立即支付</mt-button>
      <mt-button class="cancle" @click="quxiao(item.id)">取消订单</mt-button>
    </div>
  </template>
  <template v-if="order.step==1">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            送达时间:
          </div>
          <div class="right">
            <p class="time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_flower_content}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          待接单
        </div>
      </div>
    </div>
    <div class="add_price_box">
      <div class="title">追加金额申请</div>
      <div class="items_box">
        <div v-show="!shopsArray.length" style="padding-top: 15px">暂无记录</div>
        <div class="item" v-for="(item,index) in shopsArray" v-show="shopsArray.length" v-bind:key="index">
          <div class="input_radio_box"><input type="radio" :id="index"  @change="getinput(item.id,item.order_id)" name="shop"></div>
          <label :for="index">
            <div class="left">
              <p class="shop_name">
                {{item.fl_name}}
              </p>
              <p class="shop_address">
                {{item.fl_address}}
              </p>
              <p class="shop_address">
                {{item.create_time}}
              </p>
            </div>
            <div class="right">
                <p class="totalorder">
                  <span class="num">{{item.fl_order_num}}</span>总接单
                </p>
              <p class="addprice">
                +{{item.maprice}}￥
              </p>
            </div>
          </label>
        </div>
      </div>
      <div class="page_box">
        <mt-button class="page_btn" :class="{un_use:pageDate.page==1}" @click="uppage()">上一页</mt-button>
        <span class="page_show" >{{pageDate.page}}/{{pageDate.pages}}</span>
        <mt-button class="page_btn" :class="{un_use:pageDate.pages==pageDate.page}" @click="downpage()">下一页</mt-button>
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="receive" @click="agreeAddprice()">确定加价</mt-button>
      <mt-button class="cancle" @click="quxiao(orderdetail.id)">取消订单</mt-button>
    </div>
    <div class="addprice_Ok" v-if="addpriceOk">
      <div class="bg">
        <h3>同意加价</h3>
        <div class="item_box">
          <div class="left">
            请输入密码：
          </div>
          <div class="right">
            <input type="password" placeholder="请输入您的安全密码" v-model="shopCheckdPass">
          </div>
        </div>
        <mt-button class="sub" @click="submit_addprice_OK">提交请求</mt-button>
        <span class="close_icon" @click="change_addprice_OK(false)">&nbsp;</span>
      </div>
    </div>
  </template>
  <template v-if="order.step==2">
<!--    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="aftersale_item">
      <div class="left"><b>退款金额：</b></div>
      <div class="right tl"><span>￥{{orderdetail.or_flower_total}}</span></div>
    </div>
    <div class="aftersale_item">
      <div class="left"><b>退款理由：</b></div>
      <div class="right tr"><input type="text" v-model="xia_aftersaleDate.content" placeholder="请输入退款理由"></div>
    </div>
    <div class="upload_box">
      <div class="title">
        上传凭证
      </div>
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
          <div class="fun_up_box" @click="openInput('upload')" v-show="input_show_state">
            <div class="up_box">
              <input  ref="upload" type="file" v-show="false" accept="image/*" @change="change($event)" multiple>
            </div>
          </div>
        </div>
        <div class="info">
          *最多上传三张图片
        </div>
      </div>
      <div class="btn_asksale_box">
        <mt-button class="btn" @click="xia_ask_refund">
          确定
        </mt-button>
      </div>
    </div>-->
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            接单花店:
          </div>
          <div class="right">
            <p >
              {{orderdata.flows.fl_name}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            送达时间:
          </div>
          <div class="right">
            <p class="time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_flower_content}}
            </p>
          </div>
        </div>
        <div class="receipt" v-if="yuji">预计在<span style="color: #0d7fe8">{{orderdetail.yj_time}}</span>自动确认收货</div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon sending">
          配送中
        </div>
      </div>
    </div>
    <div class="btn_box">
      <mt-button class="receive" @click="querenshouhuo(id)">确认收货</mt-button>
      <mt-button class="cancle" @click="asktuikuan(id)">申请退款</mt-button>
    </div>
  </template>
  <template v-if="order.step==3">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            送达时间:
          </div>
          <div class="right">
            <p class="time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            接单花店:
          </div>
          <div class="right">
            <p >
              {{orderdata.flows.fl_name}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            订单备注:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_flower_content}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          已接单
        </div>
      </div>
    </div>
   <!-- <div class="btn_box yijiedan">
      <mt-button class="cancle bg" @click="quxiao(orderdetail.id)">取消订单</mt-button>
    </div>-->
  </template>
  <template v-if="order.step==5">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            接单花店:
          </div>
          <div class="right">
            <p>
              {{orderdata.flows.fl_name}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          已完成
        </div>
        <mt-button class="add_blackOrder" @click="add_black">加入黑名单</mt-button>
      </div>
    </div>
  </template>
  <template v-if="order.step==6">
    <div class="info_box">
      <div class="title">花材信息</div>
      <div class="dec">
        <div class="img_box" @click="showpic('true')">
          <img :src="orderdetail.img" alt="">
        </div>
        <div class="right_content">
          <p class="font_dec">{{orderdetail.or_flower_info}}</p>
          <p class="num">x{{orderdetail.or_flower_num}}</p>
        </div>
      </div>
    </div>
    <div class="order_detail_box">
      <div class="title">
        订单信息
      </div>
      <div class="conten_box">
        <div class="item_box">
          <div class="left">
            订单编号:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_number}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            下单时间:
          </div>
          <div class="right">
            <p>
              {{orderdetail.create_time}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            收花信息:
          </div>
          <div class="right">
            <p>
              {{orderdetail.or_shou_name}}
            </p>
            <p>
              {{orderdetail.or_shou_phone}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            详细地址:
          </div>
          <div class="right">
            <p>
              {{orderdetail.dizhi}}
            </p>
            <p>
              {{orderdetail.or_shou_address}}
            </p>
          </div>
        </div>
        <div class="item_box">
          <div class="left">
            派送时间:
          </div>
          <div class="right">
            <p class="send_time">
              {{orderdetail.or_delivery_time}}
            </p>
          </div>
        </div>
        <div class="price">￥{{orderdetail.or_flower_total}}</div>
        <div class="bg_icon">
          已取消
        </div>
      </div>
    </div>
  </template>
</div>
<div class="message_box">
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
<div class="pic_box_bg" v-if="picbox_state">
  <div class="pic_box">
    <div class="title">查看图片({{picbox_img.index}}/{{picbox_img.length}}) <span class="close_icon" @click="showpic(false)">&nbsp;</span></div>
    <div class="img_box">
      <img :src="picbox_img.src" alt="" @click="changeimg()">
    </div>
    <div>点击图片切换下一张</div>
  </div>
</div>
</div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from "axios"
  export default {
    name: 'Detail',
    data(){
      return{
        yuji:false,
        id:"",
        //图片框状态
        picbox_state:false,
        picbox_img:{
          src:"",
          index:"",
          length:""
        },
        picbox_arry:[],
        //同意加价div状态
        addpriceOk:false,
        pageDate:{
          pages:3,
          page:1
        },
        xia_aftersaleDate:{
          content:"",
          img:""
        },
        order_id:"",
        resultMsg:{
          result:"支付失败",
          info:"账户余额不足，无法完成支付，请充值",
          btnMsg:"去充值",
          path:"/rechange"
        },
        pay:{
          number:"",
          account:'',
          type:'余额',
          password:"",
          yuer:"0",
          id:""
        },
        payWindow:{
          show:false,
          state:1
        },
        orderdata:{},
        orderdetail:{},
        pagestate:true,
        order:{
          step:0,
          type:2,
        },
        imgArray:[],
        imgIdArray:[],
        inputShow:true,
        shopsArray:[
        ],
        shopCheckd:"",
        shopCheckdID:"",
        shopCheckdPass:""
      }
    },
    computed:{
      ...mapState(['userInfo']),
      input_show_state(){
        if(this.imgArray.length>=3){
          return false;
        }else {
          return true
        }
      }
    },
    methods:{
      //设置图片框状态
      showpic(state){
        console.log(2)
        this.picbox_state=state;
      },
      //切换图片
      changeimg(){
        if(this.picbox_img.index==this.picbox_img.length){
          this.picbox_img.index=1
          this.picbox_img.src=this.picbox_arry[0]
          this.$toast({
            message:"已切换到第一张",
            duration:500
          })
        }else {
          this.picbox_img.src=this.picbox_arry[this.picbox_img.index]
          this.picbox_img.index+=1;
          if(this.picbox_img.index==this.picbox_img.length){
            this.$toast({
              message:"已到最后一张",
              duration:500
            })
          }
        }
      },
      //添加黑名单
      add_black(){
        this.$http({method:"post",url:"/api/user/add_blacklist",data:{token:this.userInfo.token,order_id:this.id}})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //跳转到退款
      asktuikuan(id){
        this.$router.push({path:"/applyrefund",query:{id:id,type:"2"}})
      },
      //确认收货
      querenshouhuo(id){
        this.$http({method:"post",url:'/api/order/confirm',data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.getorderdetail()
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //开始配送
      beginSend(id){
        this.$http({method:"post",url:"/api/order/peisong",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.back(-1)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
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
      //立即付款事件
      openpay(id){
        this.openPay();
        this.getorderinfo(id)
      },
      //关闭付款窗口
      closePay(){
        this.payWindow.show=false;
      },
      // 打开付款窗口
      openPay(){
        this.payWindow.show=true;
      },
      //获取订单信息函数
      getorderinfo(id){
        this.pay.id=id;
        this.$http({method:"post",url:"/api/index/pay_view",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              console.log(res,"123")
              if(res.data.code==200){
                // this.orderInfo=res.data.data.orderinfo
                this.pay.account=res.data.data.pay_num
                this.pay.number=res.data.data.total
                this.pay.yuer=res.data.data.money
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      // 改变付款窗口状态
      changeState(){
        this.payWindow.state=2;
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
                this.closePay()
                this.pay.password=""
                this.getorderdetail()
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
      //下单申请退款
      xia_ask_refund(){
        this.xia_aftersaleDate.img=this.imgIdArray.join(',')
        if(!this.xia_aftersaleDate.content){
          this.$toast("请输入退款原因")
          return
        }
        if(!this.xia_aftersaleDate.img){
          this.$toast("请上传凭证")
          return
        }
        this.$http({method:"post",url:"/api/order/after_sale",data:Object.assign({},{token:this.userInfo.token,id:this.$route.query.id},this.xia_aftersaleDate)})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.push({path:'/refunddetail',query:{id:this.orderdetail.id,type:2}})
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //取消订单操作
      quxiao(id){
        this.$http({method:"post",url:"/api/order/cancel_order",data:{token:this.userInfo.token,id:id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.back(-1)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      //完成配送操作
      complete(){
        if(!this.imgIdArray.length){
          this.$toast("请先上传图片")
          return
        }
        let songda_img=this.imgIdArray.join(',')
        this.$http({method:"post",url:"/api/order/finish",data:{token:this.userInfo.token,id:this.$route.query.id,songda_img:songda_img}})
          .then(
            res=>{
              if(res.data.code==200){
                this.$toast(res.data.msg)
                this.$router.back(-1)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
        console.log(this.imgIdArray)
        console.log(this.imgArray)
      },
      //获取订单信息
      getorderdetail(){
        console.log(this.$route.query.id,"id")
        this.$http({method:'post',url:"/api/index/order_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              if(res.data.code==200){
                console.log(res,"orderdetail")
                this.orderdata=res.data.data;
                this.orderdetail=res.data.data.orderinfo;
                this.picbox_arry=res.data.data.orderinfo.images;
                this.picbox_img.src=this.picbox_arry[0]
                this.picbox_img.length=this.picbox_arry.length;
                this.picbox_img.index=1;
                this.shopsArray=res.data.data.maprice;
                if(this.shopsArray.length){
                  this.pageDate.pages=this.shopsArray[0].pages
                }else {
                  this.pageDate.pages=1
                }
                let status=res.data.data.orderinfo.status
                console.log(status,"status")
                let is_pay=res.data.data.orderinfo.is_pay
                switch (status) {
                  case 8 :
                    if(this.order.type==1){
                      this.order.step=1;
                      break;
                    }else {
                      this.order.step=2;
                      break;
                    }
                  case 1 :
                    if(is_pay==0){
                      this.order.step=0
                      break
                    }
                    if(is_pay==1){
                     this.order.step=1
                      break
                    }
                  case 5:
                    if(this.order.type==1){
                      this.order.step=3;
                    }
                    if(this.order.type==2){
                      this.order.step=3;
                    }
                    break
                  case 10:
                    if(this.order.type==1){
                      this.order.step=2.5
                    }
                    if(this.order.type==2){
                      this.order.step=2;
                      this.yuji=true;
                    }
                    break
                  case 11:
                    if(this.order.type==2){
                      this.order.step=5
                    }
                    if(this.order.type==1){
                      this.order.step=2.5
                    }
                    break
                  case 6:
                      if(this.order.type==2){
                        //取消
                        this.order.step=6
                      }
                    if(this.order.type==1){
                      //取消
                      this.order.step=5
                    }
                    break
                  default:
                    break
                }
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      cancle_order(){
        this.$messagebox.confirm('',{
          message: '<div style="color:rgba(51, 51, 51, 1);line-height: 1.5em">确定取消订单编号为'+this.orderdetail.or_number+'的订单吗？</div>',
          title: '取消订单',
          cancelButtonClass:'cancelButton',
          confirmButtonClass:'confirmButton',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            this.quxiao(this.orderdetail.id)
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        })
      },
      refuseorder(){
        this.$messagebox.confirm('',{
          message: '<div style="color:rgba(51, 51, 51, 1);line-height: 1.5em">确定接收订单编号为12312344567的订单吗？</div>',
          title: '拒绝接单',
          cancelButtonClass:'cancelButton',
          confirmButtonClass:'confirmButton',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            console.log(1);
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        })
      },
      openInput(ref){
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
      },
      //图片上传
      change(e){
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
              this.imgArray.push(res.data.data.imgurl)
              this.imgIdArray.push(res.data.data.img_id)
            }else {
              this.$toast(res.data.msg)
            }
          })
      },
      //同意加价
      agreeAddprice(){
        if(!this.shopCheckd){
          this.$toast('请选择花店')
          return
        }
        this.change_addprice_OK(true)
      },
      //同意加价提交
      submit_addprice_OK(){
        if(this.shopCheckdPass){
          this.$http({method:"post",url:"/api/index/agree_makeup",data:{token:this.userInfo.token,id:this.shopCheckd,order_id:this.shopCheckdID,saltword:this.shopCheckdPass}})
            .then(
              res=>{
                this.change_addprice_OK(false)
                if(res.data.code==200){
                  this.$toast(res.data.msg)
                  this.$router.back(-1)
                }else {
                  this.$toast(res.data.msg)
                }
              }
            )
        }
      },
      //更改同意加价状态
      change_addprice_OK(state){
        this.addpriceOk=state
      },
      close(index){
        this.imgArray.splice(index,1);
        this.imgIdArray.splice(index,1);
        // this.inputShow=true;
      },
      go(path){
        this.$router.push({path:path})
      },
      getinput(id,order_id){
        this.shopCheckd=id;
        this.shopCheckdID=order_id;
      }
    },
    created () {
      this.id=this.$route.query.id;
      this.order.type=this.$route.query.type;
      this.getorderdetail()
      console.log(this.order)
    }
  }
</script>

<style lang="scss" scoped>
  .ordernum{
    font-size: 0.85rem;
  }
.info_box{
  .title{
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    font-size: 1rem;
    text-align: left;
    background: rgba(242, 243, 245, 1);
    height: 2.4rem;
    line-height: 2.4rem;
    padding-left: 0.9rem;
  }
  .dec{
    padding:0.9rem;
    background: #ffffff;
    overflow: hidden;
    .img_box{
      width: 4rem;
      height: 4rem;
      float: left;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .right_content{
      float: right;
      width: calc(100% - 6rem);
      text-align: left;
      box-sizing: border-box;
      padding-left: 0.6rem;
      overflow: hidden;
      .font_dec{
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        width: 78.5%;
        float: left;
        height: 4rem;
        overflow: hidden;
      }
      .num{
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        width: 18.5%;
        float: right;
        text-align: right;
        height: 4rem;
      }
    }
  }
}
.order_detail_box{
  .title{
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    font-size: 1rem;
    text-align: left;
    background: rgba(242, 243, 245, 1);
    height: 2.4rem;
    line-height: 2.4rem;
    padding-left: 0.9rem;
  }
  .conten_box{
    position: relative;
    .price{
      color: rgba(227, 0, 0, 1);
      font-size: 1.1rem;
      font-weight: bold;
      position: absolute;
      right:0.6rem;
      top:0.4rem;
    }
    .bg_icon{
      position: absolute;
      right: 1rem;
      top:3rem;
      width: 3rem;
      height: 4rem;
      font-size: 0.8rem;
      color: rgba(181, 181, 191, 1);
      box-sizing: border-box;
      padding-top: 2.5rem;
      text-align: center;
      background: url("../../assets/img/wait_order.png") no-repeat center top/2rem auto;
    }
    .after_sale{
      background: url("../../assets/img/after_sale.png") no-repeat center 0rem/2.5rem auto;
    }
    .refuse{
      background: url("../../assets/img/order_refuse.png") no-repeat center 0rem/2.5rem auto;
    }
    .sending{
      background: url("../../assets/img/order_sending.png") no-repeat center 0.3rem/2.5rem auto;
    }
    .complate{
      background: url("../../assets/img/complete.png") no-repeat center 0/2.5rem auto;
      width: 5rem;
    }
    .unpay{
      background: url("../../assets/img/unpaid.png") no-repeat center top/2.5rem auto;
    }
    .item_box{
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
      overflow: hidden;
      color:rgba(0, 0, 0, 1);
      .left{
        display: inline-block;
        width: 24%;
        text-align: left;
        vertical-align: top;
        color: rgba(111, 113, 118, 1);
      }
      .right{
        display: inline-block;
        width: 74%;
        text-align: left;
        .time{
          color: rgba(13, 127, 232, 1);
        }
        .send_time{
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .btnbox{
      box-sizing: border-box;
      border-top: 1px solid rgba(223, 223, 229, 1);
      margin: 0.5rem 0.4rem 0;
      padding: 0.9rem 0;
      overflow: hidden;
      .btn{
        width: 50%;
        box-sizing: border-box;
        float: left;
        color: rgba(68, 68, 68, 1);
        font-size: 0.95rem;
        span{
          display: inline-block;
          padding-left: 1.8rem;
          background: url("../../assets/img/phone_receiver.png") no-repeat left center/1.3rem auto;
        }
      }
      .one{
        width: 100%;
      }
      .left{
        border-right: 1px solid rgba(223, 223, 229, 1);
        span{
          background: url("../../assets/img/phone_sender.png") no-repeat left center/1.3rem auto;
        }
      }
    }
  }
  .reason_box{
   background: rgba(242, 243, 245, 1);
    padding: 0.6rem 0;
    .reason{
      background: #ffffff;
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
      overflow: hidden;
      color:rgba(0, 0, 0, 1);
      .left{
        display: inline-block;
        width: 24%;
        text-align: left;
        vertical-align: top;
        color: rgba(0, 0, 0, 1);
      }
      .right{
        display: inline-block;
        width: 74%;
        text-align: left;
        .time{
          color: rgba(13, 127, 232, 1);
        }
        .send_time{
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  .evidemce{
    background: #ffffff;
    padding: 0.4rem 0.4rem;
    .title_name{
      text-align: left;
    }
    .imgs_box{
      overflow: hidden;
      .img_show_box{
        overflow: hidden;
        text-align: left;
        float: left;
        .info{
          color: rgba(111, 113, 118, 1);
          padding-left: 0.4rem;
        }
        .item_fun{
          float: left;
          width: 33.3vw;
          padding: 0.3rem;
          text-align: center;
          height: 33.3vw;
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
    }
  }
}
.add_price_box{
  .title{
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    font-size: 1rem;
    text-align: left;
    background: rgba(242, 243, 245, 1);
    height: 2.4rem;
    line-height: 2.4rem;
    padding-left: 0.9rem;
  }
  .items_box{
    .item{
      padding: 0.8rem 0;
      box-sizing: border-box;
      overflow: hidden;
      border-bottom: 1px solid rgba(223, 223, 229, 1);
      margin: 0 0.8rem;
      .input_radio_box{
        width: 8%;
        float: left;
        height:3.6rem;
        line-height: 3.6rem;
       input{
         vertical-align: middle;
       }
      }
      label{
        height: 3.6rem;
        width: 89%;
        display: block;
        overflow: hidden;
        float: left;
        .left{
          float: left;
          width: 68%;
          text-align: left;
          .shop_name{
            color: rgba(0, 0, 0, 1);
          }
          .shop_address{
            color: rgba(111, 113, 118, 1);
            font-size: 0.8rem;
          }
        }
        .right{
          float: left;
          width: 29%;
          .totalorder{
            text-align: right;
            color: rgba(111, 113, 118, 1);
            font-size: 0.7rem;
            .num{
              color: rgba(250, 103, 52, 1);
            }
          }
          .addprice{
            padding-top: 1rem;
            text-align: right;
            font-weight: bold;
            color: rgba(227, 0, 0, 1);
          }
        }
      }
    }
  }
  .page{
    margin: 1rem 0;
    .page_info{
      display: inline-block;
      padding: 0 1rem;
    }
    .pageclass{
      color: rgba(0, 0, 0, 1);
      height: 1.8rem;
      line-height: 1.8rem;
      border: 1px solid rgba(223, 223, 229, 1);
      background: #ffffff;
    }
  }
}
.upload_box{
  .img_upload_box{
    overflow: hidden;
    margin-top: 0.3rem;
    .img_show_box{
      overflow: hidden;
      text-align: left;
      float: left;
      .item_fun{
        float: left;
        width: 33.3vw;
        padding: 0.3rem;
        text-align: center;
        height: 33.3vw;
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
      width: 33.3vw;
      height: 33.3vw;
      padding: 0.3rem;
      box-sizing: border-box;
      .up_box{
        width: 100%;
        height: 100%;
        border: 1px dotted #ccc;
        box-sizing: border-box;
        background: url("../../assets/img/up_load_bg.png") no-repeat center center/2.1rem 1.7rem;
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
  .flower_shop_info{
    overflow: hidden;
    padding: 1rem 0;
    .img_box{
      width: 20%;
      float: left;
      img{
        width: 2.35rem;
        height: 2.35rem;
        border: 2px solid rgba(53, 66, 54, 1);
        border-radius: 50%;
      }
    }
    .font_box{
      width: 80%;
      float: left;
      text-align: left;
      .shop_name{
        color: rgba(0, 0, 0, 1);
        font-size: 0.85rem;
      }
      .shop_address{
        color: rgba(111, 113, 118, 1);
        font-size: 0.75rem;
      }
    }
  }
  .info{
    color: rgba(111, 113, 118, 1);
    font-size: 0.7rem;
    text-align: left;
  }
  .btnbox{
    box-sizing: border-box;
    border-top: 1px solid rgba(223, 223, 229, 1);
    margin: 0.5rem 0.4rem 0;
    padding: 0.9rem 0;
    overflow: hidden;
    .btn{
      width: 50%;
      box-sizing: border-box;
      float: left;
      color: rgba(68, 68, 68, 1);
      font-size: 0.95rem;
      span{
        display: inline-block;
        padding-left: 1.8rem;
        background: url("../../assets/img/phone_qq.png") no-repeat left center/1.3rem auto;
      }
    }
    .left{
      border-right: 1px solid rgba(223, 223, 229, 1);
      span{
        background: url("../../assets/img/phone_sender.png") no-repeat left center/1.3rem auto;
      }
    }
  }
}
.btn_box{
  padding-top: 3rem;
  padding-bottom: 1rem;
  .receive{
    height: 2.4rem;
    line-height: 2.4rem;
    background: rgba(250, 103, 52, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.8rem;
    width: 40%;
    margin-right: 1rem;
  }
  .cancle{
    line-height: 2.4rem;
    height: 2.4rem;
    color: rgba(53, 66, 54, 1);
    border: 1px solid rgba(53, 66, 54, 1);
    font-size: 0.8rem;
    width: 40%;
  }
  .refund{
    width: 43%;
    box-sizing: border-box;
    color: rgba(53, 66, 54, 1);
    font-size: 0.95rem;
    border: 1px solid rgba(53, 66, 54, 1);
  }
  .refund:first-child{
    margin-right: 0.5rem;
  }
}
.yijiedan{
  background: #f2f3f5;
  padding-bottom: 10rem;
}
.upay{
  background: #f2f3f5;
}
.noshop{
  padding-top: 5rem;
  padding-bottom: 10rem;
}
.btn_aftersale{
  padding-top: 4rem;
  background: rgba(242, 243, 245, 1);
}
@media screen and (max-width: 320px){
  .addprice{
    font-size: 4vw;
  }
}
  .message_box{
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
  }
  .aftersale_item{
    overflow: hidden;
    padding: 0 1rem;
    border-top: 8px solid #F2F3F5;
    .left{
      text-align:left;
      height: 2.6rem;
      line-height: 2.6rem;
      float: left;
      width: 30%;
    }
    .right{
      height: 3rem;
      line-height: 3rem;
      float: right;
      width: 70%;
      font-size: 1rem;
    }
    .tl{
      text-align: left;
      span{
        color: #E30000;
      }
    }
    .tr{
      input{
        font-size: 1rem;
        border: none;
        outline: none;
        width: 100%;
        text-align: right;
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
  .btn_asksale_box{
    background: #F2F3F5;
    padding: 6rem 1rem 7rem;
    .btn{
      background: #FA6734;
      color: #ffffff;
      font-size: 0.85rem;
      width: 100%;
      height: 2.6rem;
      line-height: 2.6rem;
      border-radius: 1.3rem;
    }
  }
  .page_box{
    margin-top: 1.5rem;
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
  /*开始配送*/
  .peisong{
    background: #f2f3f5;
    padding-bottom: 10rem;
    padding-left:1rem;
    padding-right:1rem;
    text-align:justify;
    .receive{
      width: 45%;
      margin-right: 1.5rem;
    }
    .cancle {
      width: 45%;
    }
  }
  /*完成配送*/
  .complate{
    margin-top: 1rem;
    background: #f2f3f5;
    padding-bottom: 6rem;
    padding-left:1rem;
    padding-right:1rem;
    text-align:justify;
    .receive{
      width: 45%;
      margin-right: 1.5rem;
    }
    .cancle {
      width: 45%;
    }
  }
  /*加价*/
  .addprice_Ok{
    position: fixed;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    box-sizing: border-box;
    top: 0;
    left: 0;
    .bg{
      position: absolute;
      background: #fff;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 0 0.8rem;
      .close_icon{
        display: block;
        width: 2rem;
        background: url("../../assets/img/addprice_close.png") no-repeat center center/2.5rem 2.5rem;
        position: absolute;
        right: 0.8rem;
        top:0.8rem;
      }
      h3{
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        padding: 1.5rem 0 0.9rem 0;
        font-weight: bold;
      }
      .sub{
        background: rgba(250, 103, 52, 1);
        color: #fff;
        height: 2.5rem;
        width: 30%;
        line-height: 2.5rem;
        border-radius: 1.25rem;
        font-size: 0.9rem;
        margin: 3rem 0 1rem 0;
      }
      .item_box{
        padding: 1rem 0.8rem;
        box-sizing: border-box;
        overflow: hidden;
        color:rgba(0, 0, 0, 1);
        border-bottom: 1px solid rgba(223, 223, 229, 1);
        .left{
          display: inline-block;
          width: 30%;
          text-align: left;
          vertical-align: top;
          color: rgba(111, 113, 118, 1);
        }
        .right{
          display: inline-block;
          width: 67%;
          text-align: left;
          .price{
            color: rgba(227, 0, 0, 1);
          }
          input{
            outline: none;
            border: none;
          }
        }
      }
    }
  }
  .add_blackOrder{
    margin-top: 4rem;
    width: 50%;
  }
  .pic_box_bg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    box-sizing: border-box;
    padding: 15px;
    .pic_box{
      margin-top: 25%;
      background: #ffffff;
      padding-bottom: 20px;
      font-size: 1rem;
      border-radius: 8px;
      .title{
        padding: 15px;
        .close_icon{
          float: right;
          width: 2rem;
          background: url("../../assets/img/login_close.png") no-repeat center center/1rem 1rem;
        }
      }
      .img_box{
        width: 100%;
        border-radius: 8px;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
    }
  }
  .receipt{
    text-align: left;
    padding: 0.4rem 0.8rem;
    color:#6f7176;
  }
</style>
