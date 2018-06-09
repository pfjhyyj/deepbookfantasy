// pages/bookrelease/bookrelease.js
const app = getApp()
import { $wuxToast } from '../../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ["求借", "借出"],
    index: 0,
    date: '2016-09-01',
    start: "",
    end: "",
    imagePath: "",
    tempFile: "",
    bookInfo: null
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
    wx.uploadFile({
      url: app.globalData.address +'/upload',
      filePath: that.data.tempFile,
      name: 'image',
      header: {
        'cookie': wx.getStorageSync("session")
      },
      success: function (res) {
        console.log(res);
        let json_res = JSON.parse(res.data);
        that.setData({
          imagePath: json_res.data.image
        });
      },
      fail: res => {
        console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail);
    let that = this;
    if (!that.formValidate(e.detail.value)) {
      return;
    }
    wx.request({
      url: app.globalData.address +'/book/'+that.data.bookInfo.id,
      header: {
        'cookie': wx.getStorageSync("session")
      },
      data: e.detail.value,
      method: "PUT",
      success: res => {
        if (res.data.errorCode == 0) {
          that.showSuccessToast("图书信息更新成功");
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
      that.showErrorToast("昵称不能为空");
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
        wx.navigateBack();
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
    wx.request({
      url: app.globalData.address +'/book/' + options.id,
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        console.log(res);
        this.setData({
          bookInfo: res.data.data,
          tempFile: res.data.data.image,
          imagePath: res.data.data.image,
          start: res.data.data.start,
          end: res.data.data.end
        })
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
      }
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