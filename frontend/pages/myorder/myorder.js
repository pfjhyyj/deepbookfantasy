// pages/myorder/myorder.js
const app = getApp()
import { $wuxToast } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // name:"书名",
    // order_time:"下单时间",
    // exchange_time:"交换时间",
    // exchange_to:"交换至",
    page: 0,
    showMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  loadMore() {
    let that = this;
    wx.request({
      url: app.globalData.address +'/list',
      data: {
        page: that.data.page
      },
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        console.log(res);
        if (res.data.data.length == 0) {
          this.setData({
            showMore: false
          })
          that.showInfoToast("沒有更多了");
        }
        this.setData({
          list: that.data.list.concat(res.data.data),
          page: that.data.page + 1
        })
      }
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      page: 0
    });
    wx.request({
      url: app.globalData.address +'/list',
      data: {
        page: that.data.page
      },
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        if (res.data.data.length == 0) {
          that.setData({
            showMore: false
          })
          that.showInfoToast("沒有更多了");
          wx.hideLoading();
        } else {
          console.log(res);
          console.log(that);
          that.setData({
            list: res.data.data,
            page: that.data.page + 1,
            showMore: true
          })
          wx.hideLoading();
        }
      },
      fail: () => {
        wx.hideLoading();
      }
    });
  },
  showInfoToast(message) {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => {
      }
    })
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