// pages/personalinfo/person.js
const app = getApp()
import { $wuxToast } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderRange: ["男", "女"],
    disabled: true
  },

  editProfile: function (e) {
    if (this.data.disabled) {
      this.setData({
        disabled: false
      });
      this.showSuccessToast("已可编辑");
    }
  },

  bindGenderChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail);
    let that = this;
    if (!that.formValidate(e.detail.value)) {
      return;
    }
    wx.request({
      url: app.globalData.address +'/user/'+that.data.userInfo.id,
      header: {
        'cookie': wx.getStorageSync("session")
      },
      data: e.detail.value,
      method: "PUT",
      success: res => {
        if (res.data.errorCode == 0) {
          that.showSuccessToast("用户更新成功");
          this.setData({
            disabled: true
          });
        } else {
          that.showErrorToast(res.data.msg);
          console.log(res);
        }
      }
    })
  },

  formReset: function () {
  },

  formValidate: function (e) {
    let that = this;
    if (e.name == null) {
      that.showErrorToast("用户名不能为空");
      return false;
    }
    return true;
  },
  showSuccessToast(message) {
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => {
        wx.switchTab({
          url: "../personalinfo/personalinfo",
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
  showInfoToast: function (message) {
    $wuxToast.show({
      type: 'text',
      timer: 1500,
      color: '#fff',
      text: message,
      success: () => console.log('禁止操作')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.address +'/user',
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        console.log(res.data.data);
        that.setData({
          userInfo: res.data.data
        });
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