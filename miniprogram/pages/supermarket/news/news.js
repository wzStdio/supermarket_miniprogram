var config = require('../../../config.js')
var utils = require('../../../utils/json.js')
var change_token = require('../../../utils/change_token.js')
// pages/supermarket/news/news.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    adlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 检查用户是否授权
    // 如果没有授权，则跳转到授权页面
    wx.getSetting({
      success: function(response) {
        if (!response.authSetting['scope.userInfo']) {
          console.log('news.js: user have not authorized yet: ' + response.errMsg)
          wx.navigateTo({
            url: '../authorize/authorize',
          })
        }
      }
    })


    
    this.getAd()

    this.setData({
      adlist: wx.getStorageSync('AD')
    })

  },

  getAd: function(){
    var that = this
    //获取广告列表
    wx.request({
      url: config.service.getAdvertisement,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        var res = utils.format(res)
        if (res.code == "9999") {
          console.log('new.js: 获取广告列表失败')
        } else {
          console.log('news.js: 获取广告列表成功')
          wx.setStorage({
            key: 'AD',
            data: res.data,
          })
          that.setData({
            adlist: res.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getAd(wx.getStorageSync('token'))
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})