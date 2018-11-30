/**
 * 小程序配置文件
 */

//host
var host = 'https://www.zzh1019.cn/supermarket/api';
//var host = 'http://47.106.14.214:9033/api'

var config = {
  service: {
    host,

    //更换token接口
    changeToken: `${host}/user/changeTokenByUserId`,

    //登录接口
    login: `${host}/user/login`,

    //保存或更新用户信息接口
    saveUserInfo: `${host}/user/saveOrUpdateUserInfo`,

    //删除用户地址接口
    deleteUserAddress: `${host}/user/deleteUserAddress`,

    //获取用户地址详情接口
    getUserAddressDetails: `${host}/user/getUserAddressDetails`,

    //获取用户地址列表接口
    getUserAddressList: `${host}/user/getUserAddressList`,

    //保存或更新用户地址接口
    saveOrUpdateUserAddress: `${host}/user/saveOrUpdateUserAddress`,

    //获取全部商品分类
    getAllCategory: `${host}/category/getAllCategory`,

    //获取商品列表
    getCommodityList: `${host}/commodity/getCommodityListToApp`,

    //提交订单
    order: `${host}/order/order`,

    //完成订单
    finishOrder: `${host}/order/finishOrder`,

    //获取订单列表接口
    getOrderList: `${host}/order/getOrderList`,

    //获取广告列表接口
    getAdvertisement: `${host}/advertising/getAllAdvertising`
  }
}

module.exports = config;