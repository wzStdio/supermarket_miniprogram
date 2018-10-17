let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {},
    listCont_status: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {
  //   // 获取当前用户信息
  //   this.getUserDetail();
  //   wx.setData({
  //     listCont_status : -1
  //   });
  // },

  // //生命周期函数--监听页面隐藏
  // onHide: function () {
  //   wx.setData({
  //     listCont_status : -1
  //   })
  // },

  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      if (result.code === 1) {
        _this.setData(result.data);
      } else {
        App.showError(result.msg);
      }
    });
  },

  //点击字体高亮
  listCont_change: function(e){
    console.log(e)
    var showtype = e.target.dataset.type;
    this.setData({
      listCont_status: showtype,
    });
  },


})