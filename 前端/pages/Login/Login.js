//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //array: [{message: 'foo',}, {message: 'bar'}]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindContinueTap: function() {
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res2) {
              console.log('res2');
              var encryptedData = res2.encryptedData;
              var iv = res2.iv;
              swagCallback(code, encryptedData, iv);
            }
          })
        }
      }
    })
    wx.redirectTo({
      url: '../Profile/Profile'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      console.log('拒绝授权')
    } else {
      console.log('允许授权')
      app.globalData.userInfo = e.detail.userInfo
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})

function swagCallback(code, encryptedData, iv) {
  wx.showToast({
    title: '正在登录',
    icon: 'loading'
  });
  wx.request({
    url: 'config.service.authUrl',
    data: {
      code: code,
      encryptedData: encryptedData,
      iv: iv
    },
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function(res) {
      wx.hideToast();
      console.log('服务器返回'+res.data);
    },
    fail: function() {
      console.log('服务器返回错误');
    }
  })
}

