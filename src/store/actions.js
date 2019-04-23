export default {
/*  showLoading: ({
    commit
  }) => {
    commit('showLoading')
  },
  hideLoading: ({
    commit
  }) => {
    commit('hideLoading')
  },
  showNav: ({
    commit
  }) => {
    commit('showNav')
  },
  hideNav: ({
    commit
  }) => {
    commit('hideNav')
  }, */
  setUserInfo: ({
    commit
  }, userInfo) => {
    commit('setUserInfo', userInfo)
  },
  setActiveIndex: ({
    commit
  }, index) => {
    commit('setActiveIndex', index)
  },
  setOrderActiveIndex: ({
     commit
  }, index) => {
    commit('setOrderActiveIndex', index)
  },
  setOrderType: ({
     commit
  }, index) => {
    commit('setOrderType', index)
  },
//  修改按钮状态
  buttonFalse:({
     commit
   }) => {
    commit('buttonFalse')
  },
  buttonTrue:({
      commit
    }) => {
    commit('buttonTrue')
  },
  //底部导航显示
  BottomNavStateShow:({commit})=>{
    commit('BottomNavStateShow')
  },
  //底部导航隐藏
  BottomNavStateHide:({commit})=>{
    commit('BottomNavStateHide')
  },
//  设置定时器
  setTimer:({commit},timer)=>{
    commit('setTimer',timer)
  },
//  清除定时器
  clearTimer:({commit})=>{
    commit("clearTimer")
    console.log('qingchu')
  },
//  设置重新认证的地址信息
  SetagainRenzheng:({commit},data)=>{
  commit('SetagainRenzheng',data)
  }
}
