// pages/goods/goods.js
var config = require('../../../config.js')
var utils = require('../../../utils/json.js')
Page({
    data: {
        goods: [
            {
                "categoryName": "搞事情",
                // "type": -1,
                "foods": [
                    {
                        "commodityName": "剪刀",
                        "commodityPrice": 10,
                        "oldPrice": "",
                        "commoditySpecification": "剪刀",
                        "sellCount": 229,
                        "commodityNum": 0,
                        "rating": 100,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680618&di=01bbf98be4f99b3e66b8a1c6ce53c7fc&imgtype=0&src=http%3A%2F%2Fwww.photophoto.cn%2Fm69%2F071%2F056%2F0710560038.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680618&di=01bbf98be4f99b3e66b8a1c6ce53c7fc&imgtype=0&src=http%3A%2F%2Fwww.photophoto.cn%2Fm69%2F071%2F056%2F0710560038.jpg"
                    },
                    {
                        "commodityName": "时钟",
                        "commodityPrice": 14,
                        "oldPrice": "",
                        "commoditySpecification": "",
                        "sellCount": 188,
                        "commodityNum": 0,
                        "rating": 96,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680617&di=4891538e21839aa4f85c4ead7bfe8b0b&imgtype=0&src=http%3A%2F%2Fpic1.cxtuku.com%2F00%2F04%2F16%2Fb97810459649.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680617&di=4891538e21839aa4f85c4ead7bfe8b0b&imgtype=0&src=http%3A%2F%2Fpic1.cxtuku.com%2F00%2F04%2F16%2Fb97810459649.jpg"
                    },
                    {
                        "commodityName": "舒肤佳肥皂",
                        "commodityPrice": 10,
                        "oldPrice": "",
                        "commoditySpecification": "",
                        "sellCount": 124,
                        "commodityNum": 0,
                        "rating": 85,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680617&di=77ae8b2639dfd6e1b403c3c98aa6fff8&imgtype=0&src=http%3A%2F%2Fimg005.hc360.cn%2Fm8%2FM06%2FF3%2F55%2FwKhQpVcsOLGEEviVAAAAALTuJeE834.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709680617&di=77ae8b2639dfd6e1b403c3c98aa6fff8&imgtype=0&src=http%3A%2F%2Fimg005.hc360.cn%2Fm8%2FM06%2FF3%2F55%2FwKhQpVcsOLGEEviVAAAAALTuJeE834.jpg"
                    }
                ]
            },
            {
                "categoryName": "厕所用品",
                // "type": 2,
                "foods": [
                    {
                        "commodityName": "纸巾盒",
                        "commodityPrice": 29,
                        "oldPrice": 36,
                        "commoditySpecification": "",
                        "sellCount": 17,
                        "commodityNum": 0,
                        "rating": 100,
                        "info": "",
                        "icon": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3348534866,2751621753&fm=26&gp=0.jpg",
                        "image": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3348534866,2751621753&fm=26&gp=0.jpg"
                    }
                ]
            },
            {
                "categoryName": "冰爽饮品",
                // "type": 1,
                "foods": [
                    {
                        "commodityName": "VC无限橙果汁",
                        "commodityPrice": 8,
                        "oldPrice": 10,
                        "commoditySpecification": "",
                        "sellCount": 15,
                        "commodityNum": 0,
                        "rating": 100,
                        "info": "",
                        "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "categoryName": "洗漱用品",
                // "type": -1,
                "foods": [
                    {
                        "commodityName": "牙膏",
                        "commodityPrice": 17,
                        "oldPrice": "",
                        "commoditySpecification": "",
                        "sellCount": 43,
                        "commodityNum": 0,
                        "rating": 92,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540304654&di=c02fe1548497c3dd719bc15fee0a1d3b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bf3d55440ceb0000019ae97ad98f.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540304654&di=c02fe1548497c3dd719bc15fee0a1d3b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bf3d55440ceb0000019ae97ad98f.jpg"
                    },
                    {
                        "commodityName": "洗发水",
                        "commodityPrice": 16,
                        "oldPrice": "",
                        "commoditySpecification": "",
                        "sellCount": 29,
                        "commodityNum": 0,
                        "rating": 100,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709934172&di=cad001a30e45d537264534d8e3709a57&imgtype=0&src=http%3A%2F%2Fimg.go007.com%2F2016%2F10%2F04%2F32fe909a88822820_0.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709934172&di=cad001a30e45d537264534d8e3709a57&imgtype=0&src=http%3A%2F%2Fimg.go007.com%2F2016%2F10%2F04%2F32fe909a88822820_0.jpg"
                    },
                    {
                        "commodityName": "脸盆",
                        "commodityPrice": 11,
                        "oldPrice": "",
                        "commoditySpecification": "",
                        "sellCount": 15,
                        "commodityNum": 0,
                        "rating": 100,
                        "info": "",
                        "icon": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709934169&di=055924b1f02562fb5363f216701cef93&imgtype=0&src=http%3A%2F%2Fimages.yiwufair.com%2FProductImage%2F2013%2F08%2F719216085217536.jpg",
                        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539709934169&di=055924b1f02562fb5363f216701cef93&imgtype=0&src=http%3A%2F%2Fimages.yiwufair.com%2FProductImage%2F2013%2F08%2F719216085217536.jpg"
                    }
                ]
            },
        ],
        toView: "order0",
        scrollTop: 100,
        foodCounts: 0,
        totalPrice: 0,// 总价格
        totalCount: 0, // 总商品数
        carArray: [],
        minPrice: 0,//起送價格
        payDesc: '',
        deliveryPrice: 0,//配送費
        fold: true,
        selectFoods: [{ price: 20, count: 2 }],
        cartShow: 'none',
        status: 0,
    },
    //左侧商品分类切换函数
    selectMenu: function (e) {
        var index = e.currentTarget.dataset.itemIndex;
        this.setData({
            toView: 'order' + index.toString()
            // toView: index.toString()
        })
        console.log('goods.js: 商品类型切换');
    },
    //移除商品
    decreaseCart: function (e) {
        var index = e.currentTarget.dataset.itemIndex;
        var parentIndex = e.currentTarget.dataset.parentindex;
        this.data.goods[parentIndex].foods[index].Count--
        var num = this.data.goods[parentIndex].foods[index].Count;
        var mark = 'a' + index + 'b' + parentIndex
        var price = this.data.goods[parentIndex].foods[index].price;
        var name = this.data.goods[parentIndex].foods[index].name;
        var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
        var carArray1 = this.data.carArray.filter(item => item.mark != mark);
        carArray1.push(obj);
        console.log(carArray1);
        this.setData({
            carArray: carArray1,
            goods: this.data.goods
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
    decreaseShopCart: function (e) {
        console.log('1');
        this.decreaseCart(e);
    },
    //添加到购物车
    addCart(e) {
        var index = e.currentTarget.dataset.itemIndex;
        var parentIndex = e.currentTarget.dataset.parentindex;
        this.data.goods[parentIndex].foods[index].Count++;
        var mark = 'a' + index + 'b' + parentIndex
        var price = this.data.goods[parentIndex].foods[index].price;
        var num = this.data.goods[parentIndex].foods[index].Count;
        var name = this.data.goods[parentIndex].foods[index].name;
        var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
        var carArray1 = this.data.carArray.filter(item => item.mark != mark)
        carArray1.push(obj)
        console.log(carArray1);
        this.setData({
            carArray: carArray1,
            goods: this.data.goods
        })
        this.calTotalPrice();
        this.setData({
            payDesc: this.payDesc()
        })
    },
    addShopCart: function (e) {
        this.addCart(e);
    },
    //计算总价
    calTotalPrice: function () {
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

      if (this.data.totalPrice === 0) {
          wx.showToast({
            title: '请选择商品下单',
            icon: 'success',
            // duration: 2000
          });
        } else {
           //确认支付逻辑
          var resultType = "success";
          wx.navigateTo({
              url: '../pay/pay?resultType=' + resultType
          })

        var that = this.data
        for (var i = 0; i < that.carArray.length; i++) {
          var index = that.carArray[i].index
          var parentIndex = that.carArray[i].parentIndex
          this.data.goods[parentIndex].foods[index].Count = 0
          this.setData({
            goods: this.data.goods
          })
        }
        this.setData({ carArray: [], totalCount: 0, totalPrice: 0 });
        this.setData({ payDesc: this.payDesc() })
        }

      
        // window.alert('支付' + this.totalPrice + '元');
       
    },
    //彈起購物車
    toggleList: function () {
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
    cartShow: function (fold) {
        console.log(fold);
        if (fold == false) {
            this.setData({
                cartShow: 'block',
            })
        } else {
            this.setData({
                cartShow: 'none',
            })
        }
        console.log(this.data.cartShow);
    },
    tabChange: function (e) {
      console.log('good.js: tabChange function: ' + e.target.dataset.type)
        var showtype = e.target.dataset.type;
        this.setData({
            status: showtype,
        });
    },
    onLoad: function (options) {
        var that = this
        wx.showLoading({
          title: '加载中',
        })
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            payDesc: this.payDesc()
        });
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
              for (var i=0; i<res.data.length; i++){
                categoryList.push(res.data[i].categoryId)
              }
              console.log(categoryList)
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
                success: function(response){
                  var response = utils.format(response)
                  if(response.code == "9999") {
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
              icon: 'none',
              title: '加载失败',
            })
            console.log('goods.js: 获取商品分类失败，无法与服务器通信')
          }
        })
        wx.hideLoading()
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
      // 检查用户是否授权
      // 如果没有授权，则跳转到授权页面
      wx.getSetting({
        success: function (response) {
          if (!response.authSetting['scope.userInfo']) {
            console.log('goods.js: user have not authorized yet: ' + response.errMsg)
            wx.navigateTo({
              url: '../authorize/authorize',
            })
          }
        }
      })
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    //清空购物车
    empty: function (e) {
      var that = this.data
      for (var i=0; i<that.carArray.length; i++)
      {
        var index = that.carArray[i].index
        var parentIndex = that.carArray[i].parentIndex
        this.data.goods[parentIndex].foods[index].Count = 0
        this.setData({
          goods: this.data.goods
        })
      }
      this.setData({ carArray: [], totalCount: 0, totalPrice : 0 });
      this.cartShow(true);
      this.setData({ payDesc: this.payDesc() })
    }
})
