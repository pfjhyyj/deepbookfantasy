var config = require('../../config')

const app = getApp()
Page({
  data: {
    nickName: '',
    avatarUrl: ''
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
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
  }
})
