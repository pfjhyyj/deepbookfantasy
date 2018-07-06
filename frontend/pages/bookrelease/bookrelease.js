// pages/bookrelease/bookrelease.js
const app = getApp()
var util = require('../../utils/util.js'); 
import { $wuxToast } from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ["求借", "借出"],
    index: 0,
    date: '2016-09-01',
    imagePath: "",
    tempFile: "",
    start: "2016-09-01",
    end: "2016-09-01",
    reset: false
  },
  bindTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindStartChange: function (e) {
    this.setData({
      start: e.detail.value
    })
  },
  bindEndChange: function (e) {
    this.setData({
      end: e.detail.value
    })
  },
  selectImage: function(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFile: res.tempFilePaths[0]
        })
        console.log(res.tempFilePaths)

        wx.setStorage({ key: "card", data: tempFilePaths[0] })
      }
    })
  },
  uploadImage: function() {
    let that = this;
    wx.showLoading({
      title: '上传图片中',
    });
    wx.uploadFile({
      url: app.globalData.address +'/upload',
      filePath: that.data.tempFile,
      name: 'image',
      header: {
        'cookie': wx.getStorageSync("session")
      },
      success: function (res) {
        let json_res = JSON.parse(res.data);
        that.setData({
          imagePath: json_res.data.image
        });
        wx.hideLoading();
        that.showSuccessToast("图片上传成功");
      },
      fail: res => {
        wx.hideLoading();
        console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    let that = this;
    if (!that.formValidate(e.detail.value)) {
      return;
    } else {
      wx.showLoading({
        title: '创建图书中',
      })
      wx.request({
        url: app.globalData.address +'/book',
        header: {
          'cookie': wx.getStorageSync("session")
        },
        data: e.detail.value,
        method: "POST",
        success: res => {
          if (res.data.errorCode == 0) {
            that.showEndToast("图书信息创建成功");
            that.setData({
              reset: true
            });
          } else {
            that.showErrorToast(res.data.msg);
            console.log(res);
          }
          wx.hideLoading();
        },
        fail: res => {
          console.log(res);
          wx.hideLoading();
        }
      })
    }
  },

  formReset: function () {
    this.setData({
      reset: false,
      tempFile: null,
      start: "2016-09-01",
      end: "2016-09-01",
    });
  },
  formValidate: function (e) {
    console.log(e);
    let that = this;
    if (e.name == "") {
      that.showErrorToast("书名不能为空");
      return false;
    }
    if (e.start > e.end) {
      that.showErrorToast("借阅时间不能迟于归还时间");
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
      }
    })
  },
  showEndToast(message) {
    this.formReset();
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