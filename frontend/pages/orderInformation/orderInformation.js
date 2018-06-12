// pages/orderInformation/orderInformation.js
const app = getApp()
import { $wuxToast } from '../../components/wux'
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
      url: app.globalData.address +'/book/' + that.data.id,
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        this.setData({
          bookInfo: res.data.data
        });
        wx.request({
          url: app.globalData.address + '/book/' + that.data.id +'/owner',
          header: {
            'cookie': wx.getStorageSync("session")
          },
          method: "GET",
          success: res => {
            if (res.data.data.id == that.data.userid) {
              this.setData({
                editable: true
              });
              wx.hideLoading();
            }
          }
        });
      },
      fail: () => {
        wx.hideLoading();
      }
    });
  },
  deleteBook: function() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success: function(sm) {
        if (sm.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            url: app.globalData.address + '/book/' + that.data.id,
            header: {
              'cookie': wx.getStorageSync("session")
            },
            method: "DELETE",
            success: res => {
              wx.hideLoading();
              if (res.data.errorCode == 0) {
                that.showSuccessToast("图书信息删除成功");
              }
            },
            fail: () => {
              wx.hideLoading();
              that.showErrorToast("图书信息删除失败");
            }
          });
        }
      }
    });
  },
  navigateToUpdate: function() {
    let that = this;
    wx.navigateTo({
      url: '../bookrelease/update/bookrelease?id='+that.data.bookInfo.id,
    })
  },
  showSuccessToast(message) {
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => {
        wx.switchTab({
          url: "../myorder/myorder",
        })
      }
    })
  },
  showErrorToast: function (message) {
    $wuxToast.show({
      type: 'forbidden',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => console.log('禁止操作')
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