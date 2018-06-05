// components/List/List.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的方法列表
   */

  data: {
    list: [],
    page: 0,
    showMore: false,
    keyWord: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      let that = this;
      wx.request({
        url: 'http://localhost:8080/book/search',
        data: {
          name: that.properties.input,
          page: that.data.page
        },
        header: {
          'cookie': wx.getStorageSync("session")
        },
        method: "GET",
        success: res => {
          console.log(res);
          this.setData({
            list: that.data.list.concat(res.data.data),
            page: that.data.page+1
          })
        }
      })
    },
    init(keyWord) {
      let that = this;
      this.setData({
        keyWord: keyWord
      })
      that.loadMore();
    }
  },
  attached() {
  }
})
