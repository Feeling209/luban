const app = getApp()
Page({
  data: {
    kindList: ['大四班', '大三班', '上二休二'],
    kindIndex: 0,
    date: null,
    kindA: ['白班', '夜班', '下夜', '大休'],
    kindB: ['第一天早班', '第二天早班', '第一天中班', '第二天中班', '第一天休息', '第二天休息'],
    kindC: ['第一天班', '第二天班', '第一天休', '第二天休'],
    kindZ: null,
    currentKind: ['白班', '夜班', '下夜', '大休'],
    curIndex: 0,
    imageUrl: null,
    result_display:false,
    pickerViewShow: true,
    searchKind:false
  },

  onLoad: function () {
    var Util = require('../../utils/util')
    var data_str = Util.formatTime(new Date())
    this.setData({ date: data_str.substring(0,4)+'-'+data_str.substring(5,7) + '(本月)'})
  },

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kindIndex: e.detail.value,
      curIndex: 0,
    })
    if (e.detail.value == 0) {
      this.setData({ currentKind: ['白班', '夜班', '下夜', '大休']})
    }
    if (e.detail.value == 1) {
      this.setData({ currentKind: ['第一天早班', '第二天早班', '第一天中班', '第二天中班', '第一天休息', '第二天休息'], })
    }
    if (e.detail.value == 2) {
      this.setData({ currentKind: ['第一天班', '第二天班', '第一天休', '第二天休'] })
    }
  },

  bindPickerChange2: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      curIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDisplayChange: function (e) {
    this.setData({
      pickerViewShow: true,
      result_display: false,
      searchKind:false
    })
  },

  formSubmit: function (e) {
    if (app.globalData.userInfo==null) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500
        })
    }else{
    var submitKind = this.data.kindList[e.detail.value.kind]
    var submitStatus = this.data.currentKind[e.detail.value.status]
    var submitSearchDate = e.detail.value.searchDate
    console.log(submitStatus)
    wx.request({
      url: 'https://www.luban123.club/getworkhours',
      data: {
        kind: submitKind,
        todayStatus: submitStatus,
        searchDate: submitSearchDate,
        nickname: app.globalData.userInfo.nickName,
      },
      success: res => {
        var data_ = res.data
        this.setData({
          // imageUrl: 'https://www.luban123.club/getworkhours' + '?kind=' + submitKind + '&todayStatus=' + submitStatus + '&searchDate=' + submitSearchDate + '&nickname=' + app.globalData.userInfo.nickName,
          imageUrl: "data:image/PNG;base64," + res.data,
          result_display: true,
          pickerViewShow: false,
          searchKind: submitKind
        })
        // wx.showToast({
        //   title: '提交成功',
        //   icon: 'none',
        //   duration: 1500
        // })
      }
    })}
  }
})
