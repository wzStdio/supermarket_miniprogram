let App = getApp();
var config = require('../../../config.js')
var utils = require('../../../utils/json.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false,    // 快捷导航
    region: '',

    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 表单提交
   */
  saveData: function (e) {
    console.log('create.js: 开始添加新用户地址操作')

    let _this = this
    var values = e.detail.value
    values.region = this.data.region;

    // 表单验证
    if (!_this.validation(values)) {
      wx.showToast({
        image: '../image/error.png',
        title: _this.data.error,
      })
      return false; 
    }

    // 按钮禁用
    _this.setData({ disabled: true });

    //显示保存中
    wx.showLoading({
      title: '保存中'
    })

    var data = {
      address: values.detail,
      area: values.region[2],
      city: values.region[1],
      fullAddress: values.region[0]+values.region[1]+values.region[2]+values.detail,
      province: values.region[0],
      telephone: values.phone,
      token: wx.getStorageSync('token'),
      userName: values.name,
      uuid: wx.getStorageSync('userid')
    }

    // 提交到后端
    wx.request({
      url: config.service.saveOrUpdateUserAddress,
      data: data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //保存完成
        wx.hideLoading()
        var res = utils.format(res)
        if(res.code == '0000') {
          wx.showToast({
            icon: 'success',
            title: '保存成功',
            duration: 1500
          })
          wx.request({
            url: config.service.getUserAddressList,
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              token: wx.getStorageSync('token'),
              uuid: wx.getStorageSync('userid')
            },
            success: function (res) {
              var res = utils.format(res)
              if (res.code == 9999) {
                wx.showToast({
                  image: '../image/error.png',
                  title: '获取地址列表错误:' + res.msg,
                })
                console.log('address.js: 获取用户地址列表失败, ' + res.msg)
              } else {
                wx.setStorage({
                  key: 'addresslist',
                  data: res.data,
                })
                  wx.setStorage({
                    key: 'default_address_id',
                    data: res.data[0].addressId,
                  })
                console.log('address.js: 获取用户地址列表成功, ' + res.msg)
                //返回上一级一面
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else {
          wx.showToast({
            image: '../image/error',
            title: '保存失败，' + res.msg,
            duration: 1500
          })
        }
        console.log('create.js: 添加新用户地址操作完成，服务器信息：' + res.msg)
      },
      fail: function(res) {
        console.log('create.js: 添加用户新地址失败，与服务器通信失败')
      }
    })

    // App._post_form('address/add', values, function (result) {
    //   if (result.code === 1) {
    //     App.showSuccess(result.msg, function () {
    //       wx.navigateBack();
    //     });
    //   } else {
    //     App.showError(result.msg);
    //   }
    // });

    // 解除禁用
    _this.setData({ disabled: false });


  },

  /**
   * 表单验证
   */
  validation: function (values) {
    if (values.name === '') {
      this.data.error = '收件人不能为空';
      return false;
    }
    if (values.phone.length < 1) {
      this.data.error = '手机号不能为空';
      return false;
    }
    if (values.phone.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }
    if (!this.data.region) {
      this.data.error = '省市区不能空';
      return false;
    }
    if (values.detail === '') {
      this.data.error = '详细地址不能为空';
      return false;
    }
    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },


  /**
   * 快捷导航 显示/隐藏
   */
  commonNav: function () {
    this.setData({
      nav_select: !this.data.nav_select
    });
  },

  /**
   * 快捷导航跳转
   */
  nav: function (e) {
    let url = '';
    switch (e.currentTarget.dataset.index) {
      case 'home':
        url = '../index/index'; break;
      case 'fenlei':
        url = '../category/index'; break;
      case 'cart':
        url = '../flow/index'; break;
      case 'profile':
        url = '../user/index'; break;
    }
    wx.switchTab({ url });
  },

})