const util = require('../../utils/util.js');
const article = '';
Page({
  /**
   * Page initial data
   */
  data: {
    linkurl: '',
    webview: false,
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
    const s = options.s; //来源
    var rssData = wx.getStorageSync('rss_list') || {};
    rssData = rssData[s].rssData;
    // console.log(rssData);
    var author = '';
    var itemsData = rssData.item || rssData.entry;
    var rssDataItem = itemsData[id];
    console.log('26', rssDataItem);
    var pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
    var article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p ||'';
    if ('dc:creator' in rssDataItem) {
      author = rssDataItem["dc:creator"].text;
    } else if ('author' in rssDataItem) {
      author = rssDataItem.author.text || rssDataItem.author.name;
    } else if ('author' in rssData) {
      author = rssData.author.name.text;
    }

    if ('content:encoded' in rssDataItem) {
      article = rssDataItem["content:encoded"].text;
    }
    const title = rssDataItem.title.text;
    // console.log('title',title,'author',author,'pubTime',pubTime)
    article = this.htmlDecode(article);

    this.setData({
      article,
      title,
      pubTime: pubTime ? util.formatDate("MM-dd HH:mm", pubTime) : '', // 日期时间需格式化
      author,
      linkurl: rssDataItem.link.text || rssDataItem.link.href,
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

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {
    const linkurl = this.data.linkurl || '';
    this.setData({ webview: true,})
    // const that = this;
    // this.getArticle(linkurl);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  onPageScroll: function(e) { // 获取滚动条当前位置
    const that = this;
    var nowp = e.scrollTop;
    var query = wx.createSelectorQuery();
    try{
      query.select('#body').boundingClientRect()
      query.exec(function (res) {
        const allp = res[0].height;
        var progress = nowp / allp;
        that.setData({
          progress
        });
      })
    }
    catch(err){console.log(err)}
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  //复制页面中链接
  wxParseTagATap: function(e) {
    var href = e.currentTarget.dataset.src;
    wx.setClipboardData({
      data: href,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '链接已复制'
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
    wx.vrequest({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/xml', // 默认值
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome",
        "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      success: function(res) {
        console.log(res);
        var regTitle = new RegExp("<title>([\\s\\S]*?)...............</title>", "g");
        var title = regTitle.exec(res.data);
        if (title != null) {
          console.log(title[1]);
          that.setData({
            title: title[1],
          });
        }
        const article = res.data;

          that.setData({
            article: article,
          });

        wx.stopPullDownRefresh();
      }
    });
  },
})