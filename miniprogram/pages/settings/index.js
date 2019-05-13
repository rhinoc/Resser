// pages/settings/index.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onClear: function(){
    wx.removeStorage({
      key: 'rss_list',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'rss_pool',
      success: function (res) { },
    })
    wx.removeStorage({
      key: 'history',
      success: function (res) { },
    })
  },

  onClearAll: function(){
    wx.lin.showDialog({
      type: "confirm",
      title: "确认清空所有缓存吗",
      content: "这将会清空收藏集和稍后阅读",
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage();
        } else if (res.cancel) {
        }
      }
    })
  }

})