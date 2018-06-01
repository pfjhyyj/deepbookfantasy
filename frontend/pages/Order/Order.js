const app = getApp()
Page({
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
  onLoad: function () { }
})
