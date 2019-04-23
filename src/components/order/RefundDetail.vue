<template>
  <div>
    <ReturnHead head_name="退款详情"></ReturnHead>
    <template v-if="type==1">
      <template v-if="orderDetail.status==12">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
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
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <mt-button class="bt marright" @click="agress()">同意退款</mt-button>
          <mt-button class="bt" @click="gorefuse()">拒绝退款</mt-button>
        </div>
        <div class="result_img agree">&nbsp;</div>
      </template>
     <template v-if="orderDetail.status==13">
       <div class="info_box">
         <div class="title">花材信息</div>
         <div class="dec">
           <div class="img_box" @click="showpic(true)">
             <img :src="orderDetail.img" alt="">
           </div>
           <div class="right_content">
             <p class="font_dec">{{orderDetail.or_flower_info}}</p>
             <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                 {{orderDetail.or_number}}
               </p>
             </div>
           </div>
           <div class="item_box">
             <div class="left">
               下单时间:
             </div>
             <div class="right">
               <p>
                 {{orderDetail.create_time}}
               </p>
             </div>
           </div>
           <div class="item_box">
             <div class="left">
               送达时间:
             </div>
             <div class="right">
               <p class="send_time">
                 {{orderDetail.or_delivery_time}}
               </p>
             </div>
           </div>
           <div class="item_box">
             <div class="left">
               详细地址:
             </div>
             <div class="right">
               <p>
                 {{orderDetail.dizhi}}
               </p>
               <p>
                 {{orderDetail.or_shou_address}}
               </p>
             </div>
           </div>
           <div class="item_box">
             <div class="left">
               接单花店
             </div>
             <div class="right">
               <p>
                 {{orderDetail.fl_name}}
               </p>
             </div>
           </div>
           <div class="item_box">
             <div class="left">
               配送完成:
             </div>
             <div class="right">
               <p class="send_time send_suc_time">
                 {{orderDetail.songda_time}}
               </p>
             </div>
           </div>
           <div class="price">￥{{orderDetail.or_flower_total}}</div>
           <div class="bg_icon after_sale">
             已退款
           </div>
         </div>
         <div class="reason_box">
           <div class="reason">
             <div class="left">
               退款原因:
             </div>
             <div class="right">
               <p>
                 {{refundDetail.content}}
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
                   <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                   <img  :src="item" alt="">
                 </div>
               </div>
             </div>
             <div class="img_show_box" v-if="!imgArray.length">
               <p class="info">未有图片上传！</p>
             </div>
           </div>
         </div>
         <div class="apply_time">
           申请时间：{{refundDetail.create_time}}
         </div>
         <div class="result_img agree">&nbsp;</div>
       </div>
       <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
       <div class="btnbox">
         <div class="btn left"><span>联系买家</span></div>
         <div class="btn"><span>在线联系</span></div>
       </div>
     </template>
      <template v-if="orderDetail.status==14||orderDetail.status==15">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已拒绝
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img refuse">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left"><span><a :href="'tel:'+refundDetail.or_shou_phone">联系买家</a></span></div>
          <div class="btn"><span>在线联系</span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==16">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                平台仲裁:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.plat_content}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已退款
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img agree" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn small left"><span><a :href="'tel:'+refundDetail.or_shou_phone">联系买家</a></span></div>
          <div class="btn small"><span>在线联系</span></div>
          <div class="btn small"><span>平台退款</span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==17">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                平台仲裁:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.plat_content}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已拒绝
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img refuse" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left small"><span><a :href="'tel:'+refundDetail.or_shou_phone">联系买家</a></span></div>
          <div class="btn left small"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+refundDetail.flows.fl_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
          <div class="btn small"><span>平台完成</span></div>
        </div>
      </template>
    </template>
    <template v-if="type==2">
      <template v-if="orderDetail.status==12">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              处理中
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left"><span><a :href="'tel:'+refundDetail.or_shou_phone">联系买家</a></span></div>
          <div class="btn"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==13">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
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
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img agree" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left"><span>联系店铺</span></div>
          <div class="btn"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==14">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已拒绝
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img refuse" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left small"><span>联系店铺</span></div>
          <div class="btn left small"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
          <div class="btn small" @click="helpPingTai"><span>平台介入</span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==15">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已介入
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img refuse" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left small"><span>联系店铺</span></div>
          <div class="btn left small"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
          <div class="btn small"><span>平台已介入</span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==16">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                平台仲裁:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.plat_content}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
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
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img agree" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn small left"><span>联系店铺</span></div>
          <div class="btn small"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
          <div class="btn small"><span>平台退款</span></div>
        </div>
      </template>
      <template v-if="orderDetail.status==17">
        <div class="info_box">
          <div class="title">花材信息</div>
          <div class="dec">
            <div class="img_box" @click="showpic(true)">
              <img :src="orderDetail.img" alt="">
            </div>
            <div class="right_content">
              <p class="font_dec">{{orderDetail.or_flower_info}}</p>
              <p class="num">x{{orderDetail.or_flower_num}}</p>
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
                  {{orderDetail.or_number}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                下单时间:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.create_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                送达时间:
              </div>
              <div class="right">
                <p class="send_time">
                  {{orderDetail.or_delivery_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                详细地址:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.dizhi}}
                </p>
                <p>
                  {{orderDetail.or_shou_address}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                接单花店
              </div>
              <div class="right">
                <p>
                  {{orderDetail.fl_name}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                配送完成:
              </div>
              <div class="right">
                <p class="send_time send_suc_time">
                  {{orderDetail.songda_time}}
                </p>
              </div>
            </div>
            <div class="item_box">
              <div class="left">
                平台仲裁:
              </div>
              <div class="right">
                <p>
                  {{orderDetail.plat_content}}
                </p>
              </div>
            </div>
            <div class="price">￥{{orderDetail.or_flower_total}}</div>
            <div class="bg_icon after_sale">
              已拒绝
            </div>
          </div>
          <div class="reason_box">
            <div class="reason">
              <div class="left">
                退款原因:
              </div>
              <div class="right">
                <p>
                  {{refundDetail.content}}
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
                    <!--<span class="close_icon" @click="close(index)">&nbsp;</span>-->
                    <img  :src="item" alt="">
                  </div>
                </div>
              </div>
              <div class="img_show_box" v-if="!imgArray.length">
                <p class="info">未有图片上传！</p>
              </div>
            </div>
          </div>
          <div class="apply_time">
            申请时间：{{refundDetail.create_time}}
          </div>
          <div class="result_img refuse" @click="gorefunddetail()">&nbsp;</div>
        </div>
        <mt-button style="width: 50%;margin-bottom: 15px;" @click="add_black">加入黑名单</mt-button>
        <div class="btnbox">
          <div class="btn left small"><span>联系店铺</span></div>
          <div class="btn left small"><span><a :href="'http://wpa.qq.com/msgrd?v=3&uin='+orderDetail.or_qq+'&site=qq&menu=yes'">在线联系</a></span></div>
          <div class="btn small"><span>平台完成</span></div>
        </div>
      </template>
    </template>
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
  export default {
    name: 'RefundDetail',
    data(){
      return{
        id:"",
        //图片框状态
        picbox_state:false,
        picbox_img:{
          src:"",
          index:"",
          length:""
        },
        picbox_arry:[],
        type:"",
        imgArray:[],
        refundDetail:{},
        orderDetail:{}
      }
    },
    computed:{
      ...mapState(['userInfo']),
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
      //平台介入
      helpPingTai(){
        this.$http({method:'post',url:'/api/order/plat',data:{token:this.userInfo.token,id:this.orderDetail.id}})
          .then(
            res=>{
              if(res.data.code==200){
                this.getdetail()
                this.$toast(res.data.msg)
              }else {
                this.$toast(res.data.msg)
              }
            }
          )
      },
      agress(){
        this.$http({method:"post",url:'/api/order/do_sale',data:{token:this.userInfo.token,id:this.orderDetail.id,step:13,refu_id:this.refundDetail.id}})
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
      },
      gorefuse(){
        this.$router.push({path:'/refuserefund',query:{id:this.orderDetail.id}})
      },
      getdetail(){
        this.$http({method:"post",url:"/api/index/order_info",data:{token:this.userInfo.token,id:this.$route.query.id}})
          .then(
            res=>{
              console.log(res)
              if(res.data.code==200){
                this.refundDetail=res.data.data.refund
                this.orderDetail=res.data.data.orderinfo
                this.imgArray=this.refundDetail.img1;
                this.picbox_arry=res.data.data.orderinfo.images;
                this.picbox_img.src=this.picbox_arry[0]
                this.picbox_img.length=this.picbox_arry.length;
                this.picbox_img.index=1;
              }
            }
          )
      }
    },
    created () {
      this.id=this.$route.query.id;
      this.getdetail()
      this.type=this.$route.query.type
    }
  }
</script>

<style lang="scss" scoped>
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
    position: relative;
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
      .sending{
        background: url("../../assets/img/order_sending.png") no-repeat center 0.3rem/2.5rem auto;
      }
      .after_sale{
        background:url("../../assets/img/after_sale.png") no-repeat center 0rem/2.5rem auto; ;
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
          .send_suc_time{
            color: rgba(13, 127, 232, 1);
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
            width: 32vw;
            padding: 0.3rem;
            text-align: center;
            height: 32vw;
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
    .result_img{
      position: absolute;
      left: 4rem;
      top:4rem;
      width: 6rem;
      height: 6rem;
    }
    .refuse{
      background: url("../../assets/img/refuse_refund.png") center center/cover;
    }
    .agree{
      background: url("../../assets/img/agree_refund.png") center center/cover;
    }
  }
  .btnbox{
    box-sizing: border-box;
    border-top: 8px solid #F2F3F5;
    border-bottom: 8px solid #F2F3F5;
    overflow: hidden;
    padding: 15px 1rem 15px;
    .bt{
      width: 40%;
      color: #354236;
      border: 1px solid #354236;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.95rem;
    }
    .marright{
      margin-right: 1rem;
    }
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
    .small{
      width: 33%;
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
  .apply_time{
    text-align: left;
    font-weight: bold;
    margin: 0 0.8rem;
    padding: 0.8rem 0;
    font-size: 0.95rem;
    border-top: 1px solid rgba(223, 223, 229, 1);
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
</style>
