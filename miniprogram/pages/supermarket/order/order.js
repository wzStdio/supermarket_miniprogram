// let App = getApp();
var config = require('../../../config.js')
var utils = require('../../../utils/json.js')
var time = require('../../../utils/time.js')
var change_token = require('../../../utils/change_token.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType: 'all',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.dataType = options.type || 'all';
    this.setData({
      dataType: this.data.dataType
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取订单列表
    this.setData({
      list: wx.getStorageSync('orderlist')
    })
    this.getOrderList(this.data.dataType)
  },

  /**
   * 获取订单列表
   */
  getOrderList: function(dataType) {
    // let _this = this;
    // wx.request('', { dataType }, function (result) {
    //   if (result.code === 1) {
    //     _this.setData(result.data);
    //     result.data.list.length && wx.pageScrollTo({
    //       scrollTop: 0
    //     });
    //   } else {
    //     App.showError(result.msg);
    //   }
    // });
    var that = this
    wx.request({
      url: config.service.getOrderList,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        token: wx.getStorageSync('token'),
        uuid: wx.getStorageSync('uuid')
      },
      success: function(res) {
        var res = utils.format(res)
        if (res.code == '9999') {
          console.log('detail.js: 获取订单信息失败，错误信息：' + res.msg)
          return false
        } else {
          console.log('detail.js: 获取订单信息成功，' + res.msg)
          var data = []
          if (dataType == 'received') {
            console.log('detail.js: 查找已完成的订单')
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].orderStatus == '1') {
                data.push(res.data[i])
              }
            }
          } else {
            data = res.data
          }
          for (var i = 0; i < data.length; i++) {
            data[i].createTime = time.formatTime(data[i].createTime, 'Y/M/D h:m:s')
          }
          wx.setStorage({
            key: 'orderlist',
            data: data,
          })
          that.setData({
            list: data
          })
          return true
        }
      }
    })
  },

  /**
   * 切换标签
   */
  bindHeaderTap: function(e) {
    this.setData({
      dataType: e.target.dataset.type
    });
    // 获取订单列表
    this.getOrderList(e.target.dataset.type);
  },

  /**
   * 取消订单
   */
  cancelOrder: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确认取消订单？",
      success: function(o) {
        if (o.confirm) {
          App._post_form('user.order/cancel', {
            order_id
          }, function(result) {
            if (result.code === 1) {
              _this.getOrderList(_this.data.dataType);
            } else {
              App.showError(result.msg);
            }
          });
        }
      }
    });
  },

  /**
   * 确认收货
   */
  receipt: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确认收到商品？",
      success: function(o) {
        if (o.confirm) {
          App._post_form('user.order/receipt', {
            order_id
          }, function(result) {
            if (result.code === 1) {
              _this.getOrderList(_this.data.dataType);
            } else {
              App.showError(result.msg);
            }
          });
        }
      }
    });
  },

  /**
   * 发起付款
   */
  payOrder: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;

    // 显示loading
    wx.showLoading({
      title: '正在处理...',
    });
    App._post_form('user.order/pay', {
      order_id
    }, function(result) {
      if (result.code === -10) {
        App.showError(result.msg);
        return false;
      }
      // 发起微信支付
      wx.requestPayment({
        timeStamp: result.data.timeStamp,
        nonceStr: result.data.nonceStr,
        package: 'prepay_id=' + result.data.prepay_id,
        signType: 'MD5',
        paySign: result.data.paySign,
        success: function(res) {
          // 跳转到已付款订单
          wx.navigateTo({
            url: '../order/detail?order_id=' + order_id
          });
        },
        fail: function() {
          App.showError('订单未支付');
        },
      });
    });
  },

  /**
   * 跳转订单详情页
   */
  detail: function(e) {
    let order_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../order/detail?order_id=' + order_id
    });
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  }


});