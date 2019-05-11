// 导入rss源数据
const openid = wx.getStorageSync('openid');
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
var rssData = rss.rssData;
var rss_list = wx.getStorageSync('rss_list')||[];
var rssed = new Array();
var button = new Array();
var query = '';
var matched = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    matched: [],
    rssData: rss.rssData || [], // rss源数据
    rssItemData: {}, // 当前选中的源数据             
    rssed: [],
    button: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    rss_list = wx.getStorageSync('rss_list')
    for (var i in rssData) {
      matched[i] = 1;
      if (rss_list.find(function(x) {
          return x.rssUrl == rssData[i].rssUrl;
        })) {
        rssed[i] = "-";
        button[i] = true;
      } else {
        rssed[i] = "+";
        button[i] = false;
      }
    }
    this.setData({
      rssed,
      matched,
      button,
    });
  },

  handleSearch: function(event) {
    query = event.detail.detail.value;
    console.log(query);
    if (query != '') {
      for (var i in rssData) {
        var str = (rssData[i].title) + (rssData[i].tag) + (rssData[i].rssUrl) + (rssData[i].link) + (rssData[i].description);
        str = str.replace(/,/g, '');
        if (str.match(query)) {
          matched[i] = 1;
        } else matched[i] = 0;
      }
    } else {
      for (var i in rssData) matched[i] = 1;
    }

    this.setData({
      matched
    });
  },

  onChange: function(event) {
    console.log(event);
    var that = this;
    var id = event.currentTarget.dataset.idx;
    var rssItemData = rssData[id];

    if (rssed[id] == "+"){
      rssed[id] = "-";
      button[id] = true;
      this.setData({rssed,button});
      rss_list.push(rssItemData);
    }
    else{
      rssed[id] = "+";
      button[id] = false;
      this.setData({rssed,button});
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == rssItemData.rssUrl) rss_list.splice(i, 1);
      }
    }

    db.collection('user').where({
      _openid: openid
    }).get({
      success: res => {
        var getid = res.data["0"]._id;
        db.collection('user').doc(getid).update({
          data: {
            subscribe: rss_list
          },
          success(res) {
            wx.setStorageSync('rss_list', rss_list);
            this.onload();
          }
        })
      },
      fail: err => { }
    })
  },


  //跳转到我的+
  navToMy: function (event) {
    wx.navigateTo({
      url: '../rssed/index',
    });
  },

  onTap: function(event) {
    var id = event.currentTarget.dataset.id;
    var url = '../discover/more?&id='+id
    wx.navigateTo({url});
  }

})