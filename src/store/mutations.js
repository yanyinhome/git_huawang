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
    console.log('setmutations', userInfo)
    state.userInfo = userInfo
  },
  setActiveIndex:(state, index) => {
    console.log('setActiveIndex', index)
    state.activeIndex = index
  }
}
