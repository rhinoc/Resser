// 导入rss源数据
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
const rss_list = wx.getStorageSync('rss_list');
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rss_list: wx.getStorageSync('rss_list'),
  },


  /**
   * 从缓存读取数据，初始化数据
   */
  initList: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  }

})