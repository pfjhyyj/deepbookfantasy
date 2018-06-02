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
  goFrontPage: function () {
    wx.redirectTo({
      url: '../FrontPage/FrontPage'
    })
  },
  goBook: function () {
    wx.redirectTo({
      url: '../Book/Book'
    })
  },
  goIssue: function () {
    wx.redirectTo({
      url: '../Issue/Issue'
    })
  },
  goOrder: function () {
    wx.redirectTo({
      url: '../Order/Order'
    })
  },
  goProfile: function () {
    wx.redirectTo({
      url: '../Profile/Profile'
    })
  },
  onLoad: function () {

   }
})
