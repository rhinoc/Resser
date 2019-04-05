//index.js
const util = require('../../utils/util.js');
const xml2json = require('../../utils/xml2json.js')
const app = getApp()//获取应用实例
const rsslist = require('../../data/user.js')// 导入用户rss源数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    rss_list:[{}],
    fromsharedetailurl: '', //从分享页过来的正文url
    unreadNumber: 0, //未读计数
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    const that = this;

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '阅见 - ' + that.data.title,
      path: `/pages/home/index?rssUrl=${encodeURIComponent(that.data.rssUrl)}`,
    }
  },

  onLoad: function (options) {
    //读取用户数据
    var feeds = new Array(); //新建数组 用以存放rss订阅链接
    var titles = new Array(); //新建数组 用以存放每个源的名称
    var links = new Array(); //新建数组 用以存放每个源的名称
    var count = 0; //未读计数初始化
    let rss_list = this.data.rss_list;
    rsslist.userData.forEach(function (item) {
      feeds.push(item.rssUrl);
      titles.push(item.title);
      links.push(item.link);
    });

    var src = feeds.concat();
    for (var i = 0; i < src.length; i++) {
      src[i] = 'https://api.uomg.com/api/get.favicon?url=' + src[i];
    }
    //将读取到的用户数据赋值给Page
    for (var i = 0; i < feeds.length; i++) {
      var obj = {};
      obj.name = titles[i];
      obj.url = feeds[i];
      obj.favicon = src[i];
      obj.rssData = {};
      obj.link = links[i];
      rss_list.push(obj);
    }
    rss_list.splice(0,1);
    this.setData({ rss_list });
    console.log('rss_list_original',this.data.rss_list);


    //这一段还不知道什么意思
    if (options.url) {
      var detailurl = decodeURIComponent(options.url);
      wx.navigateTo({
        url: `../home/article?url=${detailurl}`,
      });
    } else if (options.article) {
      wx.navigateTo({
        url: `../home/article?author=${options.author}&pubtime=${options.pubtime}&title=${options.detailtitle}&article=${options.article}`,
      });
    }
    //

    wx.setStorageSync('curDetailType', this.data.detailType);

    this.getRss(this.data.rss_list);//加载从源获取到的数据 
  },

  getRss: function(rss_list) {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    });

    for (var i=0; i<rss_list.length;i++) {
      var url = rss_list[i].url;
      console.log('loading source_url',url);
      wx.setStorageSync('curRssUrl', url);
      wx.vrequest({
        url: url,
        data: {},
        header: {
          'content-type': 'application/xml' // 默认值
        },
        success: function (res) {
          var dataJson = xml2json(res.data);
          //测试转换为JSON格式的数据
          // console.log('dataJson',dataJson);

          //获取转换为JSON格式后的列表内容
          if ("rss" in dataJson) {
            var rssData = dataJson.rss.channel;
            //测试rssData的获取
            console.log('rssData', rssData);
            var index = that.data.rss_list.findIndex(x => x.link === rssData.link.text);
            console.log(index);
          } else if ("feed" in dataJson) {
            var rssData = dataJson.feed;
          }
          rss_list[index].rssData = rssData;
          
          console.log('rss_list', rss_list);
          that.setData({rss_list});
          console.log('rss_list_rssdata', that.data.rss_list);
        }
      });
      wx.hideLoading();
      wx.stopPullDownRefresh();
      // wx.setStorageSync('rss_list', rss_list);
    }

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    let that = this;
    that.setData({
      author: '', // 源名称
      // favicon: '',    // 源logo
      copyright: '', // 源版权
      pubDate: '', // 源更新时间
      rssData: {}, // 源数据
      logoloadfin: '',
    });

    that.getRss(this.data.rssUrl);
  },


  // getUrl: function (index) {
  //   return this.data.rssData.item[index].link.text;
  // },

  // 点击跳转至文章详情页
  handleRssItemTap: (event) => {
    const rssItemData = event.currentTarget.dataset.rssItemData;
    const favicon = event.currentTarget.dataset.rssItemFavicon;
    console.log(rssItemData);
    wx.navigateTo({
      url: `../home/article?id=${rssItemData}&url=`,
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

function getJsonLength(jsonData) {
  var jsonLength = 0;
  for (var item in jsonData) {
    jsonLength++;
  }
  return jsonLength;
}