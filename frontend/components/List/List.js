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
    page: 0
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
          name: "书",
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
    list_init() {
      let that = this;
      this.setData({
        list: that.data.list.concat({
          "id": 1,
          "name": "通常攻撃が全体攻撃で二回攻撃のお母さんは好きですか?",
          "description": "日本轻小说"})
      })
    }
  },
  attached() {
  }
})