const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    showModel: true,
    showModel2: false,
    showModel3:true,
    showModel4:false,
    review:false
  },

  onLoad: function () {
    // 检测用户是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            showModel:false,
            showModel2:true,
            showModel3:false,
            showModel4:true,
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
              });
            }
          })
        } 
      }
    })
    if (app.globalData.openid =='okz-25B8leoi0TUMvSAWDG9iFpSA') {
      this.setData({
        review:true
      })
    }
  },

  getUserInfo: function (e) {  //获取用户信息
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        showModel: false,
        showModel2: true,
        showModel3: false,
        showModel4: true,
      });
    } 
  },

  toMailbox: function() {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    } else {
    wx.navigateTo({
      url: '../mailbox/mailbox',
    })}
  },

  toMyRelease: function() {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    } else {
    wx.navigateTo({
      url: '../myrelease/myrelease',
    })}
  },

  toAboutLuban: function () {
    wx.navigateTo({
      url: '../aboutluban/aboutluban',
    })
  },

  toReview: function () {
    wx.navigateTo({
      url: '../review/review',
    })
  }

})
