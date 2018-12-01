let App = getApp();
var utils = require('../../../utils/json.js')
var config = require('../../../config.js')

Page({
  data: {
    list: [],
    default_id: null,
  },

  onLoad: function(options) {
    // 当前页面参数
    this.data.options = options;
  },

  onShow: function() {
    // 获取收货地址列表
    this.getAddressList();
  },

  /**
   * 获取收货地址列表
   */
  getAddressList: function() {
    var that = this

    that.getAddressListFromServer()

    //获取默认收获地址id
    that.setData({
      default_id: wx.getStorageSync('default_address_id')
    })
    that.setData({
      list: wx.getStorageSync('addresslist')
    })
    console.log('address.js: 成功获取默认收货地址id')
    // wx.getStorage({
    //   key: 'addresslist',
    //   success: function(res) {
    //     console.log('address.js: 成功地从本地获取用户地址列表')
    //     that.setData({
    //       list: res.data
    //     })
    //   },
    //   fail: function(res) {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '从本地获取地址列表失败,'+res.msg,
    //     })
    //   }
    // })
  },
  // getAddressList: function() {
  //   let _this = this;
  //   App._get('address/lists', {}, function(result) {
  //     if (result.code === 1) {
  //       _this.setData(result.data);
  //     } else {
  //       App.showError(result.msg);
  //     }
  //   });
  // },


  //从服务器获取用户地址列表并储存到本地
  getAddressListFromServer: function() {
    var that = this
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
          that.setData({
            list: res.data
          })
          if(wx.getStorageSync('default_address_id')=="" && res.data!=""){
            wx.setStorage({
              key: 'default_address_id',
              data: res.data[0].addressId,
            })
            that.setData({
              default_id: res.data[0].addressId
            })
          }
          console.log('address.js: 获取用户地址列表成功, ' + res.msg)
        }
      }
    })
  },

  
  /**
   * 添加新地址
   */
  // createAddress: function() {
  //   wx.navigateTo({
  //     url: './create'
  //   });
  // },

  /**
   * 编辑地址
   */
  editAddress: function(e) {
    console.log('address.js: 编辑地址: ' + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: './detail?address_id=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 移除收货地址
   */
  removeAddress: function(e) {
    let _this = this
    var address_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "您确定要移除当前收货地址吗?",
      success: function(t) {
        if(address_id == wx.getStorageSync('default_address_id')){
          wx.setStorage({
            key: 'default_address_id',
            data: '',
          })
        }
        wx.request({
          url: config.service.deleteUserAddress,
          method: 'POST',
          header: {
            'Content-Type': "application/json"
          },
          data: {
            addressId: address_id,
            token: wx.getStorageSync('token'),
            uuid: wx.getStorageSync('userid')
          },
          success: function(res) {
            var res = utils.format(res)
            if (res.code == 9999) {
              wx.showToast({
                image: '../image/error.png',
                title: '删除地址失败,'+res.msg,
              })
              console.log('address.js: 删除地址失败:' + res.msg)
            } else {
              wx.showToast({
                icon: 'success',
                title: '删除成功',
              })
              console.log('address.js: 删除地址成功:' + res.msg)
              _this.getAddressList()
            }
          },
          fail: function(res) {
            wx.showToast({
              image: '../image/error.png',
              title: '删除失败，请检查网络设置',
            })
            console.log('address.js: 删除失败，检查网络设置')
          }
        })
        // App._post_form('address/delete', {
        //   address_id
        // }, function(result) {
        //   if (result.code === 1) {
        //     _this.getAddressList();
        //   } else {
        //     App.showError(result.msg);
        //   }
        // });
      }
    });

    //重新刷新地址列表
    _this.getAddressList()
  },

  /**
   * 设置为默认地址
   */
  setDefault: function(e) {
    let _this = this,
      address_id = e.detail.value;
    _this.setData({
      default_id: address_id
    });
    wx.setStorage({
      key: 'default_address_id',
      data: address_id,
    })
    // App._post_form('address/setDefault', {
    //   address_id
    // }, function(result) {
    //   if (result.code === 1) {
    //     _this.data.options.from === 'flow' && wx.navigateBack();
    //   } else {
    //     App.showError(result.msg);
    //   }
    // });
    console.log('address.js: 更改了默认收货地址，id为' + address_id)
    return false;
  },

});