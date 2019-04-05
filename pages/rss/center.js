// 导入rss源数据
const rss = require('../../data/rss.js');

// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rssData: rss.rssData || [], // rss源数据
    rssDataComputed: [],        // 添加已关注标志后的rss数据
    showPopup: false,           // 控制简介弹框显隐
    rssItemData: {}             // 当前选中的源数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数据处理
    this.handleRssedData();
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
      path: '/pages/rss/list',
      // imageUrl:'/res/guid.png',
    }
  },

  // 简介弹框显隐开关
  togglePopup: function () {
    this.setData({
      showPopup: !this.data.showPopup
    });
  },

  // 对比源数据和缓存中已关注数据，添加已关注标志后的rss数据
  handleRssedData: function (data) {
    const rssData = data || this.data.rssData;
    const rssedData = wx.getStorageSync('rssedData') || [];
    const rssedUrlArr = rssedData.map((item) => item.rssUrl);
    const rssDataComputed = rssData.map((item) => {
      if (rssedUrlArr.indexOf(item.rssUrl) > -1) {
        return {
          ...item,
          rssed: true,
        };
      }
      return item;
    });

    // console.log(rssDataComputed)
    this.setData({
      rssDataComputed,
    });
  },

  // 展示rss描述信息
  handleRssItemTap: function (event) {
    const rssItemData = event.currentTarget.dataset.rssItemData;
    const { title, link, description, favicon, rssUrl } = rssItemData;
    // console.log(rssItemData);
    this.setData({
      showPopup: true,
      rssItemData,
    });
  },

  // 添加rss，更新缓存并重载至已关注页
  handleRssAdd: function (event) {
    const rssedData = wx.getStorageSync('rssedData') || [];
    const newRssedDataItem = this.data.rssItemData;

    if (Object.keys(newRssedDataItem).length > 0) {

      rssedData.push(newRssedDataItem);
      wx.setStorageSync('rssedData', rssedData);

      // console.log('navagate to rssed page');

      wx.reLaunch({
        url: `../rss/list?from=1`,
      });
    }
  },
})