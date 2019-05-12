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
    rssData: rss.rssData || [], // rss源数据
    rssItemData: {}, // 当前选中的源数据             
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    // console.log(rssData);
    rss_list = wx.getStorageSync('rss_list')
    for (var i in rssData) {
      for (var j in rssData[i].items){
        rssData[i].items[j].matched = 1;
        rssData[i].items[j].rssed = 0;
        if (rss_list.find(function (x) {
          return x.rssUrl == rssData[i].items[j].rssUrl;
        })) {
          rssData[i].items[j].rssed = 1;
        } else {
          rssData[i].items[j].rssed = 0;
        }
      }
    }
    this.setData({
      rssData,
    });
  },

  handleSearch: function(event) {
    // query = event.detail.detail.value;
    // console.log(query);
    // if (query != '') {
    //   for (var i in rssData) {
    //     var str = (rssData[i].title) + (rssData[i].tag) + (rssData[i].rssUrl) + (rssData[i].link) + (rssData[i].description);
    //     str = str.replace(/,/g, '');
    //     if (str.match(query)) {
    //       matched[i] = 1;
    //     } else matched[i] = 0;
    //   }
    // } else {
    //   for (var i in rssData) matched[i] = 1;
    // }

    // this.setData({
    //   matched
    // });
  },

  onChange: function(event) {
    console.log(event);
    var that = this;
    var idx = event.currentTarget.dataset.cate;
    var id = event.currentTarget.dataset.item;
    
    var sourceItem = rssData[idx].items[id];
    if (sourceItem.rssed==0){
      rss_list.push(sourceItem)
    }
    else{
      for (var i in rss_list){
        if (rss_list[i].rssUrl == sourceItem.rssUrl) rss_list.splice(i, 1);
        console.log('删除');
      }
    }
    rssData[idx].items[id].rssed = 1 - rssData[idx].items[id].rssed;

    this.setData({rssData});

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
            console.log('成功修改云数据库')
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
    var idx = event.currentTarget.dataset.cate;
    var id = event.currentTarget.dataset.item;
    var url = '../discover/more?&idx='+idx+'&id'+id;
    wx.navigateTo({url});
  }

})