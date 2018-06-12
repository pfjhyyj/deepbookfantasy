//index.js
//获取应用实例
const app = getApp()
import { $wuxToast } from '../../components/wux'

Page({
  data: {
    hidden1: true,
    chosen: '',
    //插入推荐图书图片，以swiper形式展示
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 3000,
    list: [],
    page: 0,
    showMore: false,
  },

  changeIndicatorDots:function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay:function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange:function (e) {
    this.setData({
      interval: e.data.value
    })
  },
  durationChange:function (e) {
    this.setData({
      duration: e.data.value
    })
  },
  onLoad: function () {
  },
  onShow: function() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      page: 0
    });
    wx.request({
      url: app.globalData.address + '/book/all',
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
    })
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
  loadMore() {
    let that = this;
    wx.request({
      url: app.globalData.address + '/book/search',
      data: {
        name: that.data.wxSearchData,
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
})
