/**
 * 小程序配置文件
 */

//host
//var host = 'https://www.anappointment.xyz/api';
var host = 'http://47.106.14.214:9033/api'

var config = {
  service: {
    host,

    //change token by userid
    changeToken: `${host}/user/changeTokenByUserId`,

    //login
    login: `${host}/user/login`,

    //save or update user info
    saveUserInfo: `${host}/user/saveOrUpdateUserInfo`
  }
}

module.exports = config;