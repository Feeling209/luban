const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardDisplay: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid == 'okz-25B8leoi0TUMvSAWDG9iFpSA') {
      this.setData({
        cardDisplay:1
      })
    }
    console.log(this.data.cardDisplay)
    
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

  formSubmit: function (data) {
    if(data.detail.value.content==''){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
    }else{
      if(data.detail.value.lianxi==''){
        wx.showToast({
          title: '请输入联系方式',
          icon: 'none',
          duration: 1500
        })
      }else{
      var Util = require('../../utils/util')
      var jsonObj = Util.json2Form({
        content: data.detail.value.content,
        lianxi:data.detail.value.lianxi,
        time: Util.formatTime(new Date()),
        nickname: app.globalData.userInfo.nickName,
        openid: app.globalData.openid,
        display: this.data.cardDisplay,   //如果是管理员本人点击，则直接可以显示在主页面
      })

        wx.request({
          url: 'https://www.luban123.club/savecontent',
          method: "POST",
          data: jsonObj,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 1500
            })
          }
        })
      }
    }
  }
})