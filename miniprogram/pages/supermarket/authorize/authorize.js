Page({
  data: {
  },
  //授权后返回首页
  to_index: function() {
    wx.getSetting({
      success: function (response) {
        if (response.authSetting['scope.userInfo']) {
          console.log('index.js: user authorized success and back to index: ' + response.errMsg)
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            image: '../image/error.png',
            title: '请先进行授权',
          })
        }
      }
    })
  },
  onShow: function() {
    wx.showToast({
      icon: 'none',
      title: '请进行授权',
    })
  }
})
