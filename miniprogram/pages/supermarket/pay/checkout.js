//let App = getApp();
var config = require('../../../config.js')
var utils = require('../../../utils/json.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_select: false, // 快捷导航
    options: {}, // 当前页面参数

    address: null, // 默认收货地址
    exist_address: false, // 是否存在收货地址
    goods: {}, // 商品信息

    disabled: false,

    hasError: false,
    error: '',
    resultType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 当前页面参数
    // this.data.options = options;
    // console.log(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取当前订单信息
    this.getOrderData();
  },

  /**
   * 获取当前订单信息
   */
  getOrderData: function() {
    var addresslist = wx.getStorageSync('addresslist')
    var default_address_id = wx.getStorageSync('default_address_id')
    var address = addresslist[0]
    var exist = false
    for (var i=0; i<addresslist.length; i++) {
      if (addresslist[i].addressId == default_address_id) {
        address = addresslist[i]
        exist = true
        break
      }
    }
    this.setData({
      goods: wx.getStorageSync('order'),
      address: address,
      exist_address: exist
    })
    // let _this = this,
    //   options = _this.data.options;

    // // 获取订单信息回调方法
    // let callback = function(result) {
    //   if (result.code !== 1) {
    //     App.showError(result.msg);
    //     return false;
    //   }

    //   // 收货地址不在配送范围内
    //   if (result.data.address !== null && !result.data.intra_region) {
    //     _this.data.hasError = true;
    //     _this.data.error = result.data.intra_region_error;
    //     App.showError(_this.data.error);
    //   }
    //   _this.setData(result.data);
    // };

    // // 立即购买
    // if (options.order_type === 'buyNow') {
    //   App._get('order/buyNow', {
    //     goods_id: options.goods_id,
    //     goods_num: options.goods_num,
    //     goods_spec_id: options.goods_spec_id,
    //   }, function(result) {
    //     callback(result);
    //   });
    // }

    // // 购物车结算
    // else if (options.order_type === 'cart') {
    //   App._get('order/cart', {}, function(result) {
    //     callback(result);
    //   });
    // }

  },

  /**
   * 选择收货地址
   */
  selectAddress: function() {
    wx.navigateTo({
      url: '../address/' + (this.data.exist_address ? 'address' : 'create')
    });
  },

  /**
   * 订单提交
   */
  submitOrder: function() {
    console.log('checkout.js: 开始提交订单')
    var that = this.data

    // 按钮禁用, 防止二次提交
    that.disabled = true;

    var list = []
    for (var i=0; i<that.goods.list.length; i++) {
      var obj = {
        commodityId: that.goods.list[i].commodityId,
        orderNum: that.goods.list[i].num
      }
      list.push(obj)
    }

    // 显示loading
    wx.showLoading({
      title: '正在处理...'
    });

    //提交订单
    wx.request({
      url: config.service.order,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        addressId: that.address.addressId,
        orderReqList: list,
        token: wx.getStorageSync('token'),
        uuid: wx.getStorageSync('userid')
      },
      success: function(res) {
        wx.hideLoading()
        var res = utils.format(res)
        if (res.code == '9999') {
          console.log('checkout.js: 提交订单失败,服务器回传信息:'+res.msg+',code:'+res.code)
          wx.showToast({
            image: '../image/error.png',
            title: '提交失败,'+res.msg,
          })
          that.resultType = 'warn'
          wx.navigateTo({ url: './pay?resultType=' + that.resultType })
        } else {
          console.log('checkout.js: 提交订单成功,服务器回传信息:'+res.msg)
          wx.showToast({
            icon: 'success',
            title: '提交成功',
          })
          that.resultType = 'success'
          //清空订单信息
          wx.removeStorageSync('order')
          wx.redirectTo({
            url: './pay?resultType=' + that.resultType,
          })
        }
      },
      fail: function(res) {
        console.log('checkout.js: 提交订单失败,网络原因')
        wx.hideLoading()
        wx.showToast({
          image: '../image/error.png',
          title: '网络原因,提交失败',
        })
      }
    })

    // wx.navigateTo({url: './pay?resultType=' + that.resultType})

    //关闭按钮禁用
    that.disabled = false
  },

  /**
   * 快捷导航 显示/隐藏
   */
  commonNav: function() {
    this.setData({
      nav_select: !this.data.nav_select
    });
  },

  /**
   * 快捷导航跳转
   */
  nav: function(e) {
    let url = '';
    switch (e.currentTarget.dataset.index) {
      case 'home':
        url = '../index/index';
        break;
      case 'fenlei':
        url = '../category/index';
        break;
      case 'cart':
        url = '../flow/index';
        break;
      case 'profile':
        url = '../user/index';
        break;
    }
    wx.switchTab({
      url
    });
  }


});