const app = getApp() //获取应用实例
var article = '';
var favors = wx.getStorageSync('favors') || [];
var backTop = false;
Page({
  /**
   * Page initial data
   */
  data: {
    backTop: false,
    showButton: false,
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
  onLoad: function (options) {
    var that = this;
    var rssData = options.rssData;
    rssData = decodeURIComponent(rssData);
    rssData = JSON.parse(rssData);
    if (typeof(rssData.article)=='object'){
      this.setData({
        title: rssData.title,
        author: rssData.author,
        pubTime: rssData.pubTime,
        article: rssData.article,
      });
    }
    else {
      var title = rssData.title;
      for (var i in favors) {
        if (favors[i].title == title) {
          this.setData({
            favorid: i,
            isfavored: true
          })
        }
      }
      var author = rssData.author;
      var pubTime = rssData.pubTime;
      var linkurl = rssData.link;
      article = rssData.article;
      article = this.htmlDecode(article);
      // console.log('41', article);
      article = app.towxml.toJson(article, 'html');
      this.setData({
        article,
        title,
        pubTime,
        author,
        linkurl
      })
    }   
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
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in',
      delay: 0
    });
    this.animationr = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in',
      delay: 0
    });
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

  onMore: function(e){
    const that = this;
    var showButton = !this.data.showButton;
    this.setData({
      showButton,
    })
    if (showButton){
      this.animationr.rotate(180).step()
      this.animation.translateY(-20).step()
      this.setData({
        ani: this.animation.export(),
        anir: this.animationr.export()
      })
    }
    else {
      this.animationr.rotate(-180).step()
      // that.animation.translateY(20).step()
      this.setData({
        // ani: this.animation.export()
        anir: this.animationr.export()
      })
    }
  },

  onFavor: function (e) {
    if (!this.data.isfavored) {
      var obj = {};
      obj.article = this.data.article;
      obj.title = this.data.title;
      obj.pubTime = this.data.pubTime;
      obj.author = this.data.author;
      favors.unshift(obj);
      wx.setStorageSync('favors', favors);
      this.setData({
        isfavored: true
      })
      wx.lin.showMessage({
        type: 'success',
        content: '已收藏'
      })
    }
    else {
      var favorid = this.data.favorid;
      favors.splice(favorid, 1);
      wx.setStorageSync('favors', favors);
      this.setData({
        isfavored: false
      })
      wx.lin.showMessage({
        type: 'success',
        content: '收藏已取消'
      })
    }
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    const linkurl = this.data.linkurl || '';
    this.getArticle(linkurl);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  onPageScroll: function (e) {
    var scrollTop = e.scrollTop
    backTop = scrollTop > 200 ? true : false
    if (backTop!=this.data.backTop){
      this.setData({
        backTop
      })
    }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })

  },

  copyLink: function (e) {
    var href = this.data.linkurl;
    wx.setClipboardData({
      data: href,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.hideToast();
            wx.lin.showMessage({
              type: 'success',
              content: '原文链接已复制'
            })
          }
        })
      }
    })
  },

  //复制页面中链接
  __bind_tap: function (e) {
    var href = e.currentTarget.dataset._el.attr.href;
    wx.setClipboardData({
      data: href,
      success: function (res) {
        wx.hideToast();
        wx.lin.showMessage({
          type: 'success',
          content: ' 内容已复制'
        })
      }
    })
  },

  htmlDecode: function (content) {
    var s = "";
    if (content.length == 0) return "";
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/<img src="https:\/\/c.statcounter.*?>/g, "");
    s = s.replace(/<img src="https:\/\/www.google-analytics.*?>/g,"");
    s = s.replace(/<img src="https:\/\/hm.baidu.*?>/g,"");
    s = s.replace(/<font color="red">订阅指南.*\n.*/g, "");
    s = s.replace(/<script>[\s\S]*?googletag[\s\S]*?>/g, "");
    s = s.replace(/<div>获取更多RSS[\s\S]*?<\/div>/g, "");
    s = s.replace(/<script[\s\S]*<\/script>/g, "");
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
  
  backTop: function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
    this.setData({backtop:false});
  },
  getArticle: function (url) {
    var that = this;
    url = url.replace(/\*/g, "%2a");
    // if (1){
    wx.vrequest({
    // wx.request({
      data: {},
      header: {
        'Content-Type': 'application/xml',
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      url: 'http://api.url2io.com/article?token=iLyhznUTQqyVkBiXmkyxhA&url=' + url
      ,
      success: function (res) {
        console.log(res);
        var r = JSON.parse(res.body);
        // var r = res.data
        var article = r["content"];
        console.log(article);
        article = app.towxml.toJson(article, 'html');
        console.log(article);
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
    // data: {
    //   appkey: 'AQKWA6WSC945',
    //   url: url,
    //   contentwithhtml: true
    // },
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