// miniprogram/pages/favorite/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    author: '',
    pubTime: '',
    article: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const favors = wx.getStorageSync('favors');
    const id = options.id;
    var favor = favors[id];
    console.log(favors,favor);
    this.setData({
      title: favor.title,
      author: favor.author,
      pubTime: favor.pubTime,
      article: favor.article,
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