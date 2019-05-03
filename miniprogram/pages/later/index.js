var laters = wx.getStorageSync('laters') || ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laters
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    laters = wx.getStorageSync('laters') || '';
    this.setData({ laters });
  },

 

  onTap: (event) => {
    // const sourceIndex = event.currentTarget.dataset.sourceIndex;
    console.log('event', event);
    const articleIndex = event.currentTarget.dataset.articleIndex;
    console.log('articleIndex', articleIndex);
    wx.navigateTo({
      url: `./article?&id=${articleIndex}`,
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

  onDel: function (event) {
    var id = event.currentTarget.dataset.articleIndex;
    console.log(id);
    laters.splice(id, 1);
    this.setData({ laters });
    wx.setStorageSync('laters', laters);
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