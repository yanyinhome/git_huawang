export default {
/*   showLoading: (state) => {
    state.isShow = true
  },
  hideLoading: (state) => {
    state.isShow = false
  },
  showNav: (state) => {
    state.isNavShow = true
  },
  hideNav: (state) => {
    state.isNavShow = false
  }, */
  setUserInfo: (state, userInfo) => {
    window.localStorage.userInfo=JSON.stringify(userInfo);
    state.userInfo = userInfo
  },
  setActiveIndex:(state, index) => {
    state.activeIndex = index
    window.sessionStorage.activeIndex=index;
  },
  setOrderActiveIndex:(state, index) => {
    state.orderActiveIndex = index
    window.sessionStorage.orderActiveIndex=index;
  },
  setOrderType:(state, index) => {
    state.orderType = index
    window.sessionStorage.orderType=index;
  },
//  修改按钮状态
  buttonFalse:(state) => {
    state.buttonState = false
  },
  buttonTrue:(state) => {
    state.buttonState = true
  },
 //显示底部菜单
  BottomNavStateShow:(state)=>{
    state.BottomNavState=true
  },
 //隐藏底部菜单
  BottomNavStateHide:(state)=>{
    state.BottomNavState=false
  },
  //设置定时器
  setTimer:(state,timer)=>{
    state.timer=timer
  },
//  取消定时器
  clearTimer:(state)=>{
    clearInterval(state.timer)
  },
//  设置重新认证的地址信息
  SetagainRenzheng:(state,data)=>{
    state.againRenzheng=data
  }
}
