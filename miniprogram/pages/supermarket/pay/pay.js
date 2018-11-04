Page({
  data: {
    resultType: "",
    resultContent: ""
  },
  onLoad: function(options) {
    console.log(options)
    console.log('pay.js: 从订单提交页面传来的参数：' + options.resultType)
    var resultType = options.resultType;
    if (resultType == "success") {
      this.setData({
        resultType: "success",
        resultContent: "支付成功"
        // url:'../../order/list/list?status=tosend'
      });
    } else {
      this.setData({
        resultType: "warn",
        resultContent: "支付失败",
        url: '../../order/list/list'
      });
    }
  },
  to_index: function() {
    wx.navigateBack({
      delta: 2
    })
  }
});