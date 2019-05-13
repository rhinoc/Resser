const app = getApp();
var rss_list = wx.getStorageSync('rss_list') || [];
var monthreport = wx.getStorageSync('monthreport') || [];
const rss = require('../../data/rss.js');
var rssData = rss.rssData;
var favors = wx.getStorageSync('favors') || [];
var rss_pool = wx.getStorageSync('rss_pool') || [];
var history = wx.getStorageSync('history') || [];

Page({
  data: {
    allrssnum: 0,//全部订阅源数
    allfavnum: 0,//文章收藏数
    allread: 0,//阅读总文章数
    favicon: '',//最爱订阅源图
    readnum: 0,//最爱订阅源阅读篇数
    favnum: 0,//最爱订阅源收藏篇数
    title: '',//最爱订阅源名字
    tag: '',//最爱订阅源标签
  },

  onShow: function () {
    favors = wx.getStorageSync('favors') || [];
    rss_pool = wx.getStorageSync('rss_pool') || [];
    history = wx.getStorageSync('history') || [];

    this.setData({
      allrssnum: rss_list.length,
      allfavnum: favors.length,
      allread: history.length
    });
    // console.log(allrssnum);
    // console.log(allfavnum);

    monthreport = wx.getStorageSync('monthreport') || [];
    rss_list = wx.getStorageSync('rss_list') || [];
    rssData = rss.rssData;
    favors = wx.getStorageSync('favors') || '';
    rss_pool = wx.getStorageSync('rss_pool') || '';

    console.log(monthreport);

    //计算收藏夹中各订阅源收藏数,避免收藏夹有删减带来最爱源收藏数量大于总收藏数的尴尬
    var allread = 0;
    for (let k = 0; k < monthreport.length; k++) {
      monthreport[k].favnum = 0;
      this.setData({ monthreport });
      allread = allread + monthreport[k].readnum;
    };
    this.setData({ allread });
    for (let i = 0; i < favors.length; i++) {
      for (let j = 0; j < rss_pool.length; j++) {
        if (favors[i].link == rss_pool[j].link) {
          for (let k = 0; k < monthreport.length; k++) {
            if (rss_pool[j].favicon == monthreport[k].favicon) {
              monthreport[k].favnum = monthreport[k].favnum + 1;
              this.setData({ monthreport });
            }
          }
        }
      }
    };
    // console.log('favnum',monthreport[1].favnum);
    wx.setStorageSync('monthreport', monthreport);
    // console.log('num',monthreport[2].favnum);
    //最爱订阅源阅读文章、图标、收藏文章数
    let max = monthreport[0].readnum + monthreport[0].favnum;
    var idx = -1;
    for (let i = 0; i < monthreport.length - 1; i++) {
      idx = max < (monthreport[i + 1].readnum + monthreport[i + 1].favnum) ? (i + 1) : idx;
      max = max < (monthreport[i + 1].readnum + monthreport[i + 1].favnum) ? (monthreport[i + 1].readnum + monthreport[i + 1].favnum) : max;
    };
    console.log('max', max);
    console.log('idx', idx);
    var readnum = monthreport[idx].readnum;
    var favnum = monthreport[idx].favnum;
    var favicon = monthreport[idx].favicon;
    this.setData({
      readnum,
      favnum,
      favicon,
    });

    //最爱源的名字、链接、标签
    var idi = 0;
    var idj = 0;
    // console.log('length1',length1);
    // console.log('item', rssData[0]);
    // console.log('item',rssData[0].items.length);
    for (let i = 0; i < rssData.length; i++) {
      for (let j = 0; j < rssData[i].items.length; j++) {
        if (rssData[i].items[j].favicon == favicon) {
          idi = i;
          idj = j;
        }
      }
    }
    // console.log('i',idi);
    // console.log('j',idj);
    var title = rssData[idi].items[idj].title;
    var rssUrl = rssData[idi].items[idj].rssUrl;
    var tag = rssData[idi].cate;
    this.setData({
      title,
      rssUrl,
      tag,
    })



  },

  onLoad: function () {
  }

})