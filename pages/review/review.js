// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allContent: null,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.luban123.club/reviewcontent',
      success: res => {
        this.setData({
          allContent: res['data'], //数据源
        })
      },
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

  passCard: function(e){
    var Util = require('../../utils/util')
    var jsonObj = Util.json2Form({
      passId: e.currentTarget.dataset.id,
    })
    wx.showModal({
      title: '提示',
      content: '确定通过吗？通过后，会在首页显示',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'https://www.luban123.club/passcontent',
            method: "POST",
            data: jsonObj,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res => {
              wx.showToast({
                title: '已通过',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else if (sm.cancel) {
          console.log('点击取消')
        }
      }
    })
  },

  deleteCard: function (e) {
    var Util = require('../../utils/util')
    var jsonObj = Util.json2Form({
      deleteId: e.currentTarget.dataset.id,
    })
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'https://www.luban123.club/deletecontent',
            method: "POST",
            data: jsonObj,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res => {
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else if (sm.cancel) {
          console.log('点击取消')
        }
      }
    })
  },
})