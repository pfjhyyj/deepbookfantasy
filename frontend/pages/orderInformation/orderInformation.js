// pages/orderInformation/orderInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null,
    id: 0,
    userid: 0,
    editable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
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
    this.setData({
      userid: wx.getStorageSync("userid")
    });
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:8080/book/' + that.data.id,
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        console.log(res);
        this.setData({
          bookInfo: res.data.data
        });
        if (res.data.data.user.id == that.data.userid) {
          this.setData({
            editable: true
          });
        }
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
      }
    });
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
  
  }
})