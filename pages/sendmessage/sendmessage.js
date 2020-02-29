const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duifangNickname:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      duifangNickname:app.globalData.currentCardNickname
    })
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
    if (data.detail.value.content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1500
      })
    } else {
      console.log(app.globalData.currentCardOpedID)
      console.log(app.globalData.currentCardNickname)
      console.log(data.detail.value)
      console.log(app.globalData.userInfo.nickName,)
      var Util = require('../../utils/util')
      var jsonObj = Util.json2Form({
        content: data.detail.value.content,
        nickname: app.globalData.userInfo.nickName,
        openid: app.globalData.openid,
        time: Util.formatTime(new Date()),
        destinationOpenId: app.globalData.currentCardOpedID,
        destinationNickname: app.globalData.currentCardNickname,
      })
      wx.request({
        url: 'https://www.luban123.club/message',
        method: "POST",
        data: jsonObj,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1500
          })
        }
      })}
  }
})