// pages/goods/goods.js
var config = require('../../../config.js')
var utils = require('../../../utils/json.js')
Page({
  data: {
    goods: [],
    toView: "order0",
    scrollTop: 100,
    //foodCounts: 0,
    totalPrice: 0, // 总价格
    totalCount: 0, // 总商品数
    carArray: [], //购物车中的商品
    minPrice: 0, //起送價格
    payDesc: '', //还有多少元起送
    deliveryPrice: 0, //配送費
    fold: true,
    //selectFoods: [{ price: 20, count: 2 }],
    cartShow: 'none',
    status: 0,
  },
  //左侧商品分类切换函数
  selectMenu: function(e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
      // toView: index.toString()
    })
    console.log('goods.js: 商品类型切换');
  },
  //移除商品的函数
  decreaseCart: function(e) {
    console.log('goods.js: 从购物车删除')
    var index = e.currentTarget.dataset.itemIndex; //商品在类目中的顺序
    var parentIndex = e.currentTarget.dataset.parentindex; //商品在列表中的顺序
    //this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex //商品在购物车列表中的识别码
    var num = 0; //商品在购物车中的数量，默认是1，下面如果在购物车中找到了就赋值给num
    for (var i = 0; i < this.data.carArray.length; i++) {
      if (this.data.carArray[i].mark == mark) {
        num = this.data.carArray[i].num - 1
        break;
      }
    }
    var price = this.data.goods[parentIndex].commodityList[index].commodityPrice;
    var name = this.data.goods[parentIndex].commodityList[index].commodityName;
    var commodityId = this.data.goods[parentIndex].commodityList[index].commodityId;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      commodityId: commodityId
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark);
    //如果商品数减到0，则从购物车删除
    if (num != 0) {
      carArray1.push(obj);
    }
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
    })
    this.calTotalPrice()
    this.setData({
      payDesc: this.payDesc(),
    })
    //关闭弹起
    var count1 = 0
    for (let i = 0; i < carArray1.length; i++) {
      if (carArray1[i].num == 0) {
        count1++;
      }
    }
    //console.log(count1)
    if (count1 == carArray1.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none'
        })
      }
    }
  },
  //与从购物车删除按钮绑定
  decreaseShopCart: function(e) {
    console.log('goods.js: 从购物车删除')
    this.decreaseCart(e);
  },
  //添加到购物车的操作函数
  addCart(e) {
    console.log('goods.js: 添加到购物车')
    var index = e.currentTarget.dataset.itemIndex; //商品在类目中的顺序
    var parentIndex = e.currentTarget.dataset.parentindex; //商品在列表中的顺序
    //this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex //商品在购物车列表中的识别码
    var num = 1; //商品在购物车中的数量，默认是1，下面如果在购物车中找到了就赋值给num
    for (var i = 0; i < this.data.carArray.length; i++) {
      if (this.data.carArray[i].mark == mark) {
        num += this.data.carArray[i].num
        break;
      }
    }
    var price = this.data.goods[parentIndex].commodityList[index].commodityPrice;
    var name = this.data.goods[parentIndex].commodityList[index].commodityName;
    var commodityId = this.data.goods[parentIndex].commodityList[index].commodityId;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      commodityId: commodityId
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark) //去除了当前要加入购物车的商品，避免重复
    carArray1.push(obj) //添加到购物车列表中
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
    })
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },
  //与添加到购物车按钮绑定
  addShopCart: function(e) {
    console.log('goods.js: 添加到购物车')
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function() {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      //payDesc: this.payDesc()
    });
  },
  //差几元起送
  payDesc() {
    if (this.data.totalPrice === 0) {
      // return `￥${this.data.minPrice}元起送`;
      return `请选择商品`;
    } else if (this.data.totalPrice < this.data.minPrice) {
      let diff = this.data.minPrice - this.data.totalPrice;
      // return '还差' + diff + '元起送';
    } else {
      return '下单';
    }
    // return '去结算';
  },
  //結算
  pay() {
    if (this.data.totalPrice < this.data.minPrice) {
      return;
    }

    var that = this
    console.log(that.data.carArray)
    if (this.data.totalPrice === 0) {
      wx.showToast({
        title: '请选择商品下单',
        icon: 'none',
        // duration: 2000
      });
    } else {
      //确认支付逻辑
      //var resultType = "success";
      wx.setStorage({
        key: 'order',
        data: {
          list: that.data.carArray,
          totalCount: that.data.totalCount,
          totalPrice: that.data.totalPrice
        },
      })
      wx.navigateTo({
        url: '../pay/checkout'
      })

      this.setData({
        carArray: [],
        totalCount: 0,
        totalPrice: 0
      });
      this.setData({
        payDesc: this.payDesc()
      })
    }
  },
  //彈起購物車
  toggleList: function() {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },
  //弹起购物车
  cartShow: function(fold) {
    // console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
      console.log('goods.js: 弹起购物车')
    } else {
      this.setData({
        cartShow: 'none',
      })
      console.log('goods.js: 不弹起购物车')
    }
    // console.log(this.data.cartShow);
  },
  //清空购物车
  empty: function(e) {
    console.log('goods.js: 清空购物车')
    this.setData({
      carArray: [],
      totalCount: 0,
      totalPrice: 0
    });
    this.cartShow(true);
    this.setData({
      payDesc: this.payDesc(),
      fold: true
    })
  },
  //超市，评论，商家标签切换
  // tabChange: function (e) {
  //   console.log('good.js: tabChange function: ' + e.target.dataset.type)
  //     var showtype = e.target.dataset.type;
  //     this.setData({
  //         status: showtype,
  //     });
  // },

  //刷新商品列表
  refreshgoods: function() {
    var that = this
    //获取商品分类
    wx.request({
      url: config.service.getAllCategory,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        var res = utils.format(res)
        if (res.code == "9999") {
          console.log('goods.js: 获取商品分类失败，服务器回传信息:' + res.msg)
        } else {
          console.log('goods.js: 获取商品分类成功，服务器回传信息:' + res.msg)
          wx.setStorage({
            key: 'category',
            data: res.data,
          })
          var categoryList = []
          for (var i = 0; i < res.data.length; i++) {
            categoryList.push(res.data[i].categoryId)
          }
          //获取商品分类后，获取商品列表
          wx.request({
            url: config.service.getCommodityList,
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              categoryIds: categoryList,
              token: wx.getStorageSync('token')
            },
            success: function(response) {
              var response = utils.format(response)
              if (response.code == "9999") {
                console.log('goods.js: 获取商品列表失败，服务器信息:' + response.msg)
              } else {
                console.log('goods.js: 获取商品列表成功,服务器信息:' + response.msg)
                wx.setStorage({
                  key: 'commoditylist',
                  data: response.data,
                })
                that.setData({
                  goods: response.data
                })
              }
            }
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          image: '../image/error.png',
          title: '加载失败',
        })
        console.log('goods.js: 获取商品分类失败，无法与服务器通信')
      }
    })
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      payDesc: this.payDesc()
    });
    this.refreshgoods()
    wx.hideLoading()
  },
  onReady: function() {
    // 页面渲染完成
    wx.showToast({
      icon: 'success',
      title: '加载完成',
    })
  },
  onShow: function() {
    // 检查用户是否授权
    // 如果没有授权，则跳转到授权页面
    wx.getSetting({
      success: function(response) {
        if (!response.authSetting['scope.userInfo']) {
          console.log('goods.js: user have not authorized yet: ' + response.errMsg)
          wx.navigateTo({
            url: '../authorize/authorize',
          })
        }
      }
    })
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  //下拉刷新
  onPullDownRefresh: function() {
    this.refreshgoods()
    wx.showToast({
      icon: 'success',
      title: '刷新成功',
    })
    wx.stopPullDownRefresh()
  }
})