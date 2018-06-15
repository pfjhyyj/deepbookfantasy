var app = getApp()
var WxSearch = require('../../components/wxSearch/wxSearch.js')
import { $wuxToast } from '../../components/wux'
Page({
  data: {
    selectHide: false,
    inputValue: '',
    getSearch: [],
    modalHidden: true,
    list: [],
    page: 0,
    showMore: false,
    noResult: true,
    typeList: ["求借", "借出"],
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  goSearch: function (e) {
    console.log(e);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43);
  },
  wxSearchFn: function (e) {
    var that = this
    if (that.data.wxSearchData.value.length > 20) {
      that.showInfoToast("关键字应少于20个字");
      return;
    }
    WxSearch.wxSearchAddHisKey(that);
    console.log(that.data.wxSearchData);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.address +'/book/search',
      data: {
        name: that.data.wxSearchData.value,
        page: that.data.page
      },
      header: {
        'cookie': wx.getStorageSync("session")
      },
      method: "GET",
      success: res => {
        if (res.data.data.length == 0) {
          this.setData({
            showMore: false,
            list: null,
            page: 0
          })
          that.showInfoToast("沒有更多了");
        } else {
          console.log(res);
          console.log(that);
          this.setData({
            list: res.data.data,
            page: that.data.page + 1,
            showMore: true,
            noResult: false,
          })
        }
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
      }
    });
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  loadMore() {
    let that = this;
    wx.request({
      url: app.globalData.address +'/book/search',
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
  onShow: function () {
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
      inputValue: ''
    })
    console.log('search is onshow')
  },
  onHide: function () {
    console.log('search is onHide')
    wx.redirectTo({
      url: '../search/search'
    })
  },
  bindchange: function (e) {
    console.log('bindchange')
  },
  clearInput: function () {
    this.setData({
      inputValue: ''
    })
  }
})