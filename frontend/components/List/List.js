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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      let that = this;
      this.setData({
        list: that.data.list.concat({ "id": 1 })
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
    this.list_init();
  }
})