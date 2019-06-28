const app = getApp();
var chart = require("../../utils/chart.js");
const rss = require('../../data/rss.js');
var rssData = rss.rssData;
var rss_list = wx.getStorageSync('rss_list') || [];
var favors = wx.getStorageSync('favors') || [];
var history = wx.getStorageSync('history') || '';


Page({
  data: {
    allrssnum: 0, //全部订阅源数
    allfavnum: 0, //文章收藏数
    allread: 0, //阅读总文章数
    oneword: '',
    onefrom: '',
    displayChart: 1,
    canvass: []
  },

  onShow: function() {
    rss_list = wx.getStorageSync('rss_list') || [];
    favors = wx.getStorageSync('favors') || [];
    history = wx.getStorageSync('history') || '';
    const that =this;
    this.setData({
      allrssnum: rss_list.length,
      allfavnum: favors.length,
      allread: history.length,
    });


    wx.vrequest({
      url: 'https://v2.jinrishici.com/sentence',
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/xml',
        'X-User-Token':'dchL4tGDyxTJvTT7njwtqDNU9llQyrSD'
        },
      success: function (res) {
        var dataJson = JSON.parse(res.body);
        that.setData({
          oneword: dataJson.data.content,
          onefrom: dataJson.data.origin.title
        })
      }});


    rss_list.sort(function(a, b) {
      return b['count'] > a['count'] ? 1 : -1
    })

    var names = [];
    var favicons = [];
    var counts = [];
    var sum = 0;
    for (var i in rss_list){
      names[i] = rss_list[i].title;
      favicons[i] = rss_list[i].favicon;
      counts[i] = rss_list[i].count || 0;
      sum+=counts[i];
    }
    var percents1 = counts;
    for (var i in percents1){
      percents1[i] = percents1[i] * 100 / sum;
      percents1[i] = +percents1[i].toFixed(2);
    }

    favors.sort(function (a, b) {
      return b['source'] > a['source'] ? 1 : -1
    })


    
    console.log(names,percents1);
    if (!isNaN(percents1[0])){
      //绘制第一张图
    chart.draw(this, 'hisource', {
      title: {
        text: "阅读来源分布",
        color: "#333333"
      },
      xAxis: {
        data: names
      },
      series: [
        {
          name: names,
          category: "pie",
          data: percents1
        }
      ]
    });
    }
    

    var fsource = 0;
    var mark = '';
    var percents2 = [];
    var names2 = [];
    sum = 0;
    for (var i in favors) {
      if (favors[i].source != mark) {
        if (percents2[fsource] == undefined) percents2[fsource] = 0;
        percents2[fsource] += 1;
        mark = favors[i].source;
        names2[fsource] = mark;
        fsource += 1;
        sum += 1;
      }
    }
    for (var i in percents2) {
      percents2[i] = percents2[i] * 100 / sum;
      percents2[i] = +percents2[i].toFixed(2);
    }

    console.log(names2, percents2);
    if (!isNaN(percents2[0])){
    //绘制第二张图
    chart.draw(this, 'fsource', {
      title: {
        text: "收藏来源分布",
        color: "#333333"
      },
      xAxis: {
        data: names2,
      },
      series: [
        {
          name: names2,
          category: "pie",
          data: percents2
        }
      ]
    });
    }


  },

  onShare: function(){
    this.setData({
      displayChart: 0,
      shareOne: {
        avatar: wx.getStorageSync("avatar"),
        nickname: wx.getStorageSync("username"),
        showShareModel: 1
      }
    });
  }
})
