const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allReceiveContent: null,
    allSendContent: null,
    showAll:true,
    showSingle:false,
    currentXinContent:null,
    yourOpenid: null,
    heightList: null,
    currentHeight: null,
    currentXinId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yourOpenid: getApp().globalData.openid,
      })
    wx.request({
      url: 'https://www.luban123.club/loadallmessage',
      data: {openid: app.globalData.openid
      },
      success: res => {
         this.setData({
          allReceiveContent: res.data,
        })
      },
        // var Array = res.data
        // var a = Array.filter((p)=>{
        //   return p.destinationNickname==app.globalData.openid
        // var b = Array.filter((p) => {
        //   return p.sourceNickname == 'Feeling'
        // });
  
        // var zzz = []
        // zzz[0] = a.length * 204
        // zzz[1] = b.length * 204
       
          // heightList: zzz,
          // currentHeight:zzz[0],
          // allSendContent:b,
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

  openXin: function(e) {
    //这里发邮件给谁，和看卡片发私信是一样的，就用同样的变量名
    console.log(app.globalData.currentCardOpedID)
    app.globalData.currentCardOpedID = e.currentTarget.dataset.openid
    app.globalData.currentCardNickname = e.currentTarget.dataset.name
    console.log(app.globalData.currentCardNickname)
    this.setData({
      showAll: false,
      showSingle: true,
      currentXinContent: e.currentTarget.dataset.content,
      currentXinId:e.currentTarget.dataset.id
    })
  },

  closeMessage: function () {
    this.setData({
      showAll: true,
      showSingle: false,
    })
  },

  // toResponse: function() {
  //   if (app.globalData.userInfo == null) {
  //     wx.showToast({
  //       title: '请先登录',
  //       icon: 'none',
  //       duration: 1500
  //     })
  //   }else{
  //   wx.navigateTo({
  //     url: '../sendmessage/sendmessage',
  //   })}
  // },

  deleteMessage: function (e) {
    var Util = require('../../utils/util')
    var jsonObj = Util.json2Form({
      deleteId: this.data.currentXinId,
    })
    console.log(this.data.currentXinId)
    wx.showModal({
      title: '提示',
      content: '确定要删除该邮件吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'https://www.luban123.club/deletemessage',
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
          console.log('用户点击取消')
        }
      }
    })
  },

  swiperchange: function (e) {
    console.log(e.detail.current)
    console.log(this.data.heightList)

    this.setData({
      currentHeight: this.data.heightList[e.detail.current]
    })
    console.log(this.data.currentHeight)
   
  },
})