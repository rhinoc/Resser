const app = getApp() //获取应用实例
var article = '';
var favors = wx.getStorageSync('favors')||[];
Page({
  /**
   * Page initial data
   */
  data: {
    isfavored: false,
    favorid: -1,
    linkurl: '',
    title: '',
    author: '',
    pubTime: '',
    article: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    
    var that = this;
    const id = options.id; //
    var rssData = wx.getStorageSync('rss_pool') || {};
    rssData = rssData[id];
    var title = rssData.title;
    for (var i in favors){
      if (favors[i].title == title){
        this.setData({
          favorid:i,
          isfavored: true
        })
      }
    }
    var author = rssData.author;
    var pubTime = rssData.pubTime;
    var linkurl = rssData.link;
    article = rssData.article;
    article = this.htmlDecode(article);
    console.log('41',article);
    article = app.towxml.toJson(article, 'html');
    this.setData({
      article,
      title,
      pubTime,
      author,
      linkurl
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  onMenu: function(e) {

    if(!this.data.isfavored)
    {
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
    else{
      var favorid = this.data.favorid;
      favors.splice(favorid,1);
      wx.setStorageSync('favors', favors);
      this.setData({
        isfavored: false
      })
    }
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {
    const linkurl = this.data.linkurl || '';
    this.getArticle(linkurl);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  onPageScroll: function(e) { // 获取滚动条当前位置
    // const that = this;
    // var nowp = e.scrollTop;
    // var query = wx.createSelectorQuery();
    // try{
    //   query.select('#body').boundingClientRect()
    //   query.exec(function (res) {
    //     const allp = res[0].height;
    //     var progress = nowp / allp;
    //     that.setData({
    //       progress
    //     });
    //   })
    // }
    // catch(err){console.log(err)}
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },


  //复制页面中链接
  __bind_tap: function(e) {
    var href = e.currentTarget.dataset._el.attr.href;
    wx.setClipboardData({
      data: href,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({})
          }
        })
      }
    })
  },

  htmlDecode: function(content) {
    var s = "";
    if (content.length == 0) return "";
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/<script.*?>window.daily.*>/g,"");
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

  getArticle: function(url) {
    var that = this;
    url = url.replace(/\*/g, "%2a");
    // if (1){
      wx.vrequest({
        data: {},
        header: {
          'Content-Type': 'application/xml',
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
        },
        url: 'http://api.url2io.com/article?token=iLyhznUTQqyVkBiXmkyxhA&url='+url
        ,
        success: function (res) {
          // console.log(res);
          var r = JSON.parse(res.body);
          var article = r["content"];
          console.log(article);
          article = app.towxml.toJson(article, 'html');
          that.setData({
            article: article,
          });
        }
      });
    // }
    // else {
    // wx.request({
    //   method: 'POST',
    //   url: 'https://api.gugudata.com/news/fetchcontent',
    //   data: {
    //     appkey: 'AQKWA6WSC945',
    //     url: url,
    //     contentwithhtml: true
    //   },
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     var article = res.data.Data.Content;
    //     article = app.towxml.toJson(article, 'html');
    //     that.setData({
    //       article: article,
    //     });
    //   }
    // })
    // }
  },
})