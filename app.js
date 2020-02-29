//app.js
App({
  globalData: {
    userInfo: null,  //存储用户信息
    openid: null,     //存储openid
    currentCardOpedID: null,
    currentCardNickname: null,
    currentLianxi:null,
  },
  onLaunch: function () {
    var that = this;

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        var Util = require('/utils/util')
        var jsonObj = Util.json2Form({
          code: res.code,
          time: Util.formatTime(new Date()),
        })
        wx.request({
          url: 'https://www.luban123.club/getopenid',
          method: "POST",
          data: jsonObj,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (result) {
            if (result.data != 'none') {
              that.globalData.openid = result.data;
              console.log('openid:', that.globalData.openid)
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 1500,
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '网络错误',
              icon: 'none',
              duration: 1500
            })
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 1500,
        })
      }
    })
  }
})