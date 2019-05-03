// 导入rss源数据
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
var rss_list = wx.getStorageSync('rss_list');
var rssUrl = '';
var tag = [];
var name = '';
const openid = wx.getStorageSync('openid');
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
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
   
  },

  onDel(e) {
    console.log(e);
  },

  onEdit(e) {
    console.log(e);
  },

  onShare(e) {
    console.log(e);
  },

  onAdd(e){
    // const type = e.currentTarget.dataset.type
    // const config = JSON.parse(JSON.stringify(this.data.navConfig[type].config))
    this.setData({
      show:true
    })
  },
  onName(e) {
    name = e.detail.detail.value;
  },
  onRss(e) {
    rssUrl = e.detail.detail.value;
  },
  onTag(e) {
    var str = e.detail.detail.value;
    tag = str.split(' ');
  },
  onCancel(e) {
    this.setData({
      show: false
    })
  },
  onSubmit(e) {
    let that  = this;
    // const type = e.currentTarget.dataset.type
    // const config = JSON.parse(JSON.stringify(this.data.navConfig[type].config))
    var rssItemData = {
      favicon: "http://www.zreading.cn/favicon.ico",
      title: name,
      link: 'http://www.zreading.cn',
      description: '共同致于美好的阅读体验',
      rssUrl: rssUrl,
      type: 'rss',
      tag: tag,
    };
    rss_list.push(rssItemData);
    db.collection('user').where({
      _openid: openid
    }).get({
      success: res => {
        var getid = res.data["0"]._id;
        db.collection('user').doc(getid).update({
          data:{
            subscribe: rss_list
          },
          success(res) {
            console.log('新增成功',res);
            that.setData({
              rss_list,
              show: false,
            })
          }
        })
      }
    })
  },
})