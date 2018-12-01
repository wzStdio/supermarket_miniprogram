var changeToken = (res) => {
  wx.request({
    url: config.service.changeToken,
    data: {
      uuid: wx.getStorageSync('userid')
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var res = utils.format(res)
      console.log("app.js: token change success: " + res.msg)
      if (res.code == 9999) {
        wx.showToast({
          title: '更换token时发生了错误,错误信息:' + response.msg,
        })
      }
      wx.setStorage({
        key: 'token',
        data: res.data.token,
      })
      wx.setStorage({
        key: 'session_key',
        data: res.data.session_key,
      })
      return res.data.token
    },
    fail: function (res) {
      console.error("app.js: token change fail ")
    }
  })
}

module.exports = {changeToken}