// pages/register/register.js
import { $wuxToast } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ["男", "女"],
    index: 0
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
      url: 'http://localhost:8080/user',
      header: {
        'cookie': wx.getStorageSync("session")
      },
      data: e.detail.value,
      method: "POST", 
      success: res => {
        if (res.data.errorCode == 0) {
          that.showSuccessToast("用户创建成功");
          wx.setStorageSync('userid', res.data.data.id);
        } else {
          that.showErrorToast(res.data.msg);
          console.log(res);
        }
      }
    })
  },

  formReset: function () {
  },

  formValidate: function(e) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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