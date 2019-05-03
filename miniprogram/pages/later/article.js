// miniprogram/pages/later/article.js

const app = getApp() //获取应用实例
const laters = wx.getStorageSync('laters');
var article = '';
var favors = wx.getStorageSync('favors') || [];

Page({
  /**
   * Page initial data
   */
  data: {
    isfavored: false,
    favorid: -1,
    title: '',
    author: '',
    pubTime: '',
    article: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id; //位于来源的数据的id
    var that = this;
    var later = laters[id];
    console.log(laters, later);
    var rssData = wx.getStorageSync('rss_pool') || {};
    var rssdata = rssData[later.id2];
    console.log('rssdata',rssdata);
    var title = later.title;
    for (var i in favors) {
      if (favors[i].title == title) {
        this.setData({
          favorid: i,
          isfavored: true
        })
      }
    }


    article = rssdata.article;
    article = this.htmlDecode(article);
    article = app.towxml.toJson(article, 'html');
    this.setData({
      article,
      title,
      author: later.author,
      pubTime: later.pubTime,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  onMenu: function (e) {

    if (!this.data.isfavored) {
      var obj = {};
      obj.article = this.data.article;
      obj.title = this.data.title;
      obj.pubTime = this.data.pubTime;
      obj.author = this.data.author;
      favors.push(obj);
      wx.setStorageSync('favors', favors);
      this.setData({
        isfavored: true
      })
    }
    else {
      var favorid = this.data.favorid;
      favors.splice(favorid, 1);
      wx.setStorageSync('favors', favors);
      this.setData({
        isfavored: false
      })
    }
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  onPageScroll: function (e) { 
   
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },


  //复制页面中链接
  __bind_tap: function (e) {
    var href = e.currentTarget.dataset._el.attr.href;
    wx.setClipboardData({
      data: href,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({})
          }
        })
      }
    })
  },

  htmlDecode: function (content) {
    var s = "";
    if (content.length == 0) return "";
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&#34;/g, "\"");
    s = s.replace(/&#xA;/g, "");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/&#123;/g, "{");
    s = s.replace(/&#125;/g, "}");
    s = s.replace(/&#124;/g, "|");
    s = s.replace(/&#126;/g, "~");
    return s;
  },

  getArticle: function (url) {
    var that = this;
    url = url.replace(/\*/g, "%2a");

    wx.request({
      method: 'POST',
      url: 'https://api.gugudata.com/news/fetchcontent',
      data: {
        appkey: 'AQKWA6WSC945',
        url: url,
        contentwithhtml: true
      },
      headers: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res);
        var article = res.data.Data.Content;
        article = app.towxml.toJson(article, 'html');
        that.setData({
          article: article,
        });
      }
    })
    // }
  },
})