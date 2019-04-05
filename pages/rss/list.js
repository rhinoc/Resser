// 导入rss源数据
const rss = require('../../data/rss.js');

// pages/rsslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rssedData: [],
    curSelectId: '', // 当前选中的源id

  },
  /**
   * 从缓存读取数据，初始化数据
   */
  initList: function () {

    const rssedData = wx.getStorageSync('rssedData') || null;
    console.log(rssedData);
    if (rssedData != null) {
      this.setData({
        rssedData,
      });
    }
    else {
      wx.setStorageSync('rssedData', this.data.rssedData);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);

    var launchPage = wx.getStorageSync("launchpage")
    if (launchPage != 0 && !options.from) {
      var launchPageInfo = rss.rssData[launchPage - 1]

      wx.navigateTo({
        url: `../index/index?rssUrl=${encodeURIComponent(launchPageInfo.rssUrl)}`,
      });
    }

    this.initList();
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
    return {
      title: "RSS Reader",
      // path: '/pages/index/index?url=' + that.data.linkurl + '&rssUrl=' + rssUrl,
    }
  },
  /**
   * 点击源，跳转至源内容列表页
   */
  handleRssItemTap: function (event) {
    const rssItemData = event.currentTarget.dataset.rssItemData;
    const { title, favicon, rssUrl, detail } = rssItemData;
    console.log(rssItemData);

    // 关闭取消关注-删除模式
    this.handleRssItemHideDelete();

    wx.navigateTo({
      url: `../index/index?rssUrl=${encodeURIComponent(rssUrl)}`,
    });
  },

  /**
   * 点击添加，跳转到源中心页
   */
  handleRssAdd: function (event) {
    wx.navigateTo({
      url: './center',
    });
  },

  /**
   * 启用rss删除模式
   */
  handleRssItemShowDelete: function (event) {
    const rssId = event.currentTarget.dataset.rssId;

    if (typeof (rssId) !== 'number') {
      return;
    }

    // console.log('delete rssId: ', rssId);

    this.setData({
      curSelectId: rssId,
    });
  },

  /**
   * 关闭删除模式
   */
  handleRssItemHideDelete: function () {
    this.setData({
      curSelectId: '',
    });
  },

  /**
   * 取消关注某个rss，并更新storage
   */
  handleRssItemDelete: function (event) {
    const rssId = event.currentTarget.dataset.rssId;

    if (typeof (rssId) !== 'number') {
      return;
    }

    const rssedData = wx.getStorageSync('rssedData') || [];
    rssedData.splice(rssId, 1);

    this.setData({
      rssedData,
      curSelectId: '',
    });

    wx.setStorageSync('rssedData', rssedData);
  },

  /**
   * 点击跳转至更多页
   */
  handleMore: function () {
    wx.navigateTo({
      url: '../setting/more',
    })
  },
})