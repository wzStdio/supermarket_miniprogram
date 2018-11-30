var config = require('./config.js')
var utils = require('./utils/json.js')
//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    //show login loading to user
    wx.showLoading({
        title: 'Loading',
      }),

    //check userid,session_key,token exist or not
    //while not exist, do wx.login
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        console.log('app.js: check userid success: ' + res.data)
      },
      fail: function(res) {
        console.log('app.js: check userid fail, start to login')
        wx.login({
          success: function(res) {
            console.log("code: " + res.code)
            wx.setStorage({
              key: 'code',
              data: res.code,
            })
            wx.request({
              url: config.service.login,
              data: {
                code: res.code
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              success: function(response) {
                var response = utils.format(response)
                console.log('app.js: get userid success: ' + response.msg)
                if (response.code == 9999) {
                  wx.showToast({
                    title: '登录时发生了错误,错误信息:' + response.msg,
                  })
                }
                wx.setStorage({
                  key: 'userid',
                  data: response.data.userId,
                })
                wx.setStorage({
                  key: 'session_key',
                  data: response.data.session_key,
                })
                wx.setStorage({
                  key: 'token',
                  data: response.data.token,
                })
              },
              fail: function(response) {
                console.log('app.js: get userid fail: ')
                console.log(response)
              }
            })
          }
        })
      },
      complete: function(res) {
        console.log('app.js: check userid complete')
      },
    })

    //change token
    wx.request({
      url: config.service.changeToken,
      data: {
        uuid: wx.getStorageSync('userid')
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var res = utils.format(res)
        console.log("app.js: token change success: " + res.msg)
        if (res.code == 9999) {
          wx.showToast({
            title: '更换token时发生了错误,错误信息:' + response.msg,
          })
        }
        wx.setStorage({
          key: 'token',
          data: res.data.token,
        })
        wx.setStorage({
          key: 'session_key',
          data: res.data.session_key,
        })
      },
      fail: function(res) {
        console.error("app.js: token change fail ")
      }
    })

    //save user info to local
    wx.getUserInfo({
      success: function(res) {
        console.log('app.js: get user info success')
        var userInfo = res.userInfo
        var info = {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender, //性别 0：未知、1：男、2：女
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          language: userInfo.language
        }
        wx.setStorage({
          key: 'userinfo',
          data: info,
        })
      },
      fail: function(res) {
        console.log('app.js: get user info fail: ' + res.errMsg)
      }
    })

    //save user info to server
    wx.getStorage({
        key: 'userinfo',
        success: function(res) {
          console.log("app.js: start to save userinfo to server")
          var info = {
            avatarUrl: res.data.avatarUrl,
            city: res.data.city,
            country: res.data.country,
            gender: res.data.gender,
            language: res.data.language,
            nickname: res.data.nickName,
            province: res.data.province,
            sessionKey: wx.getStorageSync('session_key'),
            token: wx.getStorageSync('token'),
            uuid: wx.getStorageSync('userid')
          }
          wx.request({
            url: config.service.saveUserInfo,
            data: info,
            header: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            success: function(res) {
              var res = utils.format(res)
              console.log("app.js: save user info to server success: " + res.msg)
            },
            fail: function(res) {
              var res = utils.format(res)
              console.error('app.js: save user info to server fail: ' + res.msg)
            }
          })
        },
        fail: function(res) {
          console.log('app.js: save user info to server fail, maybe unauthorize')
        }
      }),

      wx.hideLoading()
  },

  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData:{
  //   userInfo:null
  // }
})