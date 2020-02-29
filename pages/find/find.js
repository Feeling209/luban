const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allContent: null,
    rest_cishu:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo  //存储用户信息
            }
          })
        }
      }
    })

    wx.request({
      url: 'https://www.luban123.club/loadhomecontent',
      success : res => {
        let dataList = res['data']; //获取到的数据
        dataList.forEach((item) => {
          item.time = item.time.substring(0, 10); //要截取字段的字符串
        })
        this.setData({
          allContent: dataList, //数据源
        })
        console.log(this.data.allContent)
        app.globalData.currentCardOpedID = this.data.allContent[0].openid
        app.globalData.currentCardNickname = this.data.allContent[0].nickname
        app.globalData.currentLianxi = this.data.allContent[0].lianxi
      },
    })
    // app.globalData.openid ='wxeaaa9520b5346a00'
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: 'https://www.luban123.club/loadhomecontent',
      success: res => {
        let dataList = res['data']; //获取到的数据
        dataList.forEach((item) => {
          item.time = item.time.substring(0, 10); //要截取字段的字符串
        })
        this.setData({
          allContent: dataList //数据源
        })
        console.log(this.data.allContent)
        app.globalData.currentCardOpedID = this.data.allContent[0].openid
        app.globalData.currentCardNickname = this.data.allContent[0].nickname
        app.globalData.currentLianxi = this.data.allContent[0].lianxi
      },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toSendMessage: function () {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }else{
    wx.navigateTo({
      url: '../sendmessage/sendmessage',
    })}
  },

  toRelease: function() {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }else{
    wx.navigateTo({
      url: '../release/release',
    })}
  },

  swiperchange: function (e) {
    app.globalData.currentCardOpedID = this.data.allContent[e.detail.current].openid
    app.globalData.currentCardNickname = this.data.allContent[e.detail.current].nickname
    app.globalData.currentLianxi = this.data.allContent[e.detail.current].lianxi
    console.log(app.globalData.currentCardNickname)
    console.log(app.globalData.currentLianxi)
  },

  callta: function(e){
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    } else{
      wx.request({
        url: 'https://www.luban123.club/get_cishu',
        data: { openid: app.globalData.openid },
        success: res => {
          this.setData({
            rest_cishu: res.data
          })
        },
      })
      if (true === (parseInt(this.data.rest_cishu) <= 1)){
        wx.showToast({
          title: '今日次数已用完',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '每天只有3次联系他人的机会，确定要联系吗？确定后，对方所提供的联系方式将发送到您的邮箱',
          success: function (sm) {
            if (sm.confirm) {
              var Util = require('../../utils/util')
              var jsonObj = Util.json2Form({
                nickname: 'Feeling',
                openid: 'okz-25B8leoi0TUMvSAWDG9iFpSA',
                content: app.globalData.currentCardNickname+'的联系方式是：\n'+app.globalData.currentLianxi+'\n尽快与ta联系哟',
                lianxi:'用来发送联系方式',
                time: Util.formatTime(new Date()),
                destinationOpenId: app.globalData.openid,
                destinationNickname: app.globalData.userInfo.nickName,
              })
              wx.request({
                url: 'https://www.luban123.club/message',
                method: "POST",
                data: jsonObj,
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: res => {
                  wx.showToast({
                    title: '已发送到邮箱，快和对方联系吧',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
              wx.request({
                url: 'https://www.luban123.club/delete_cishu',
                method: "POST",
                data: {openid:app.globalData.openid},
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: res => {
                  console.log('cishu减1')
                }
              })
            } else if (sm.cancel) {
              console.log('用户点击取消')
            }
          }
        })}}
  }

})