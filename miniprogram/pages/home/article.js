const app = getApp() //获取应用实例
const article = '';
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
    nodes: article,
    progress: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this;
    const id = options.id; //位于来源的数据的id
    console.log(id);
    var rssData = wx.getStorageSync('rss_pool') || {};
    rssData = rssData[id];
    // console.log(rssData);
    var title = rssData.title;
    var article = rssData.article;
    var author = rssData.author;
    var pubTime = rssData.pubTime;
    var article = this.htmlDecode(article);
    article = app.towxml.toJson(article,'html');

    var linkurl = rssData.link;
    // console.log(title,author,pubTime,linkurl);
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
    // console.log('url',url);
    var that = this;
    url = url.replace(/\*/g,"%2a");
    wx.request({
      method: 'POST',
      url: 'https://api.gugudata.com/news/fetchcontent',
      data: { appkey: 'AQKWA6WSC945', url: url, contentwithhtml: true},
      headers: {
        "content-type": "application/json"
      },
      success: function(res) {
        var resData = res.data.Data;
        console.log(res);
        console.log(resData);
        var article = resData.Content;
        console.log(article);
        article = app.towxml.toJson(article, 'html');
          that.setData({
            article: article,
          });

        wx.stopPullDownRefresh();
      }
    });
  },
})