//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    hidden1: true,
    chosen: '',
    //插入推荐图书图片，以swiper形式展示
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    
  indicatorDots: true,
  autoplay: true,
  interval: 3000,
  duration: 3000
  },

  bindViewTap: function () {
    console.log('222')
  },
  tap1: function (e) {
    let obj = {}
    obj['hidden1'] = false
    this.setData(obj)
  },
  navigateToSearch: function (e) {
    wx.navigateTo({
      url: './search/search'
    })
  },

  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  wxSerchFocus: function (e) {
  },
  bindFocus: function () {
    wx.navigateTo({
      url: './search/search'
    })
  },

  changeIndicatorDots:function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay:function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange:function (e) {
    this.setData({
      interval: e.data.value
    })
  },
  durationChange:function (e) {
    this.setData({
      duration: e.data.value
    })
  },
  onLoad: function () {
  },


})
