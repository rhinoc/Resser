const app = getApp() //获取应用实例
var article = '';
Page({
  /**
   * Page initial data
   */
  data: {
    linkurl: '',
    title: '',
    author: '',
    pubTime: '',
    article: '',
    progress: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this;
    const id = options.id; //位于来源的数据的id
    var rssData = wx.getStorageSync('rss_pool') || {};
    rssData = rssData[id];
    // console.log(rssData);
    var title = rssData.title;
    var author = rssData.author;
    var pubTime = rssData.pubTime;
    var linkurl = rssData.link;
    article = rssData.article;
    article = this.htmlDecode(article);
    article = app.towxml.toJson(article,'html');
    console.log(article);
    if (!article.child){
      this.setData({
        title,
          pubTime,
          author,
          linkurl
      })
      this.getArticle(linkurl);
    }
    else {
      this.setData({
        article,
        title,
        pubTime,
        author,
        linkurl
      })
    }
    
    // console.log(title,author,pubTime,linkurl);
    

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
    this['event_bind_tap'] = (event) => {
      console.log(event.target.dataset._el);     // 打印出元素信息
    };
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
            wx.showToast({
            })
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

  getArticle: function(url) {
    var that = this;
    url = url.replace(/\*/g,"%2a");
    if (url.match('runningcheese')){
      wx.request({
        method: 'GET',
        url: 'http://api.url2io.com/article',
        data: { token: 'iLyhznUTQqyVkBiXmkyxhA', url: url },
        headers: {
          "content-type": "application/json"
        },
        success: function (res) {
          console.log(res);
          var article = res.data.content;
          article = app.towxml.toJson(article, 'html');
          that.setData({
            article: article,
          });
        }
      });
    }
    else {
      wx.request({
        method: 'POST',
        url: 'https://api.gugudata.com/news/fetchcontent',
        data: { appkey: 'AQKWA6WSC945', url: url, contentwithhtml: true },
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
    }
  },
})