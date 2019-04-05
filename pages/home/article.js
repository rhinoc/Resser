// pages/home/article.js
const xml2json = require('../../utils/xml2json.js')

Page({
  /**
   * Page initial data
   */
  data: {
    linkurl: '',
    title: '',
    author: '',
    pubTime: '',
    summary: '',
    article: '',
    sitetitle: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var sitetitle = wx.getStorageSync('navigationbartitle')
    wx.setNavigationBarTitle({
      title: sitetitle,
    });

    var that = this;
    that.setData({
      sitetitle: sitetitle,
    })

    console.log(options);

    const rssData = wx.getStorageSync('rssData') || {};
    const author = rssData.title || '';
    const rssDataItem = rssData.item[options.id];
    console.log(rssDataItem);
    const detailType = wx.getStorageSync('curDetailType');
    console.log(detailType);

    if (detailType == 'description'
      || detailType == 'content:encoded') {

      if (options.article) {

        this.setData({
          article: decodeURIComponent(options.article),
          title: options.title,
          pubTime: options.pubtime,
          author: options.author,
        })
      }
      else {
        var article = "";
        if (detailType == 'content:encoded') {

          article = this.formatArticle(rssDataItem['content:encoded'].text);
        } else {
          article = this.formatArticle(rssDataItem.description.text);
        }


        const author = rssDataItem['dc:creator'] || rssDataItem['category_title'] || rssDataItem['category'] || {};

        this.setData({
          article: article,
          title: rssDataItem.title.text,
          pubTime: rssDataItem.pubDate.text,
          author: author.text,
          linkurl: rssDataItem.link.text,
        })
      }



    } else {
      var linkurl = "";
      if (options.url.length == 0) {

        const link = rssDataItem.link;
        console.log(link);

        console.log(link.text)

        linkurl = link.text.substring(link.text.lastIndexOf('/'), link.text.length);
        linkurl = 'https://m.cnbeta.com/view' + linkurl;

      } else {
        linkurl = options.url;
      }


      wx.setStorageSync('linkurl', linkurl);

      console.log(linkurl);
      that.setData({
        linkurl: linkurl,
      })

      this.getArticle(linkurl);
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

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    const linkurl = wx.getStorageSync('linkurl') || {};
    const that = this;
    that.setData({
      linkurl: '',
      title: '',
      author: '',
      pubTime: '',
      summary: '',
      article: '',
    });
    this.getArticle(linkurl);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  /**
   * 格式化正文的展示
   */
  formatArticle: function (content) {

    var regImgstyle = new RegExp('<img', "g");
    var article = content.replace(regImgstyle, '<img style="max-width:100%;height:auto;margin-left:-24px;" '); //防止图片过大 ;

    var regImgurl = new RegExp('https://static.cnbetacdn.com', "g");
    article = article.replace(regImgurl, "https://images.weserv.nl/?url=static.cnbetacdn.com")

    var regPstyle = new RegExp('<p style="', "g");
    article = article.replace(regPstyle, '<p class="textattr" style="margin-top:24px;');

    var regPstyle2 = new RegExp('<p>', "g");
    article = article.replace(regPstyle2, '<p class="textattr" style="margin-top:24px;">');

    return article;
  },
  getArticle: function (url) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    console.log("getArticle");
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/html' // 默认值
      },
      success: function (res) {
        // console.log(res.data)

        var regTitle = new RegExp("<title>([\\s\\S]*?)...............</title>", "g");
        var title = regTitle.exec(res.data);
        if (title != null) {
          console.log(title[1]);
          that.setData({
            title: title[1],
          });
        }

        var regTime = new RegExp('<time class="time">([\\s\\S]*?)</time>', "g");
        var time = regTime.exec(res.data);
        if (time != null) {
          console.log(time[1]);
          that.setData({
            pubTime: time[1],
          });
        }

        var regAuthor = new RegExp('<span><a href=".*?" target="_blank"><span>(.*?)</span></a>&nbsp;&nbsp;</span>', "g");
        var author = regAuthor.exec(res.data);
        if (author != null) {
          console.log(author[1]);
          that.setData({
            author: author[1],
          });
        }

        var regSum = new RegExp('<div class="article-summ"><b>...</b>([\\s\\S]*?)</div>', "g");
        var summary = regSum.exec(res.data);
        if (summary != null) {
          console.log(summary[1]);
          that.setData({
            summary: '摘要：' + summary[1],
          });
        }

        var regTopic = new RegExp('<div class="article-topic">([\\s\\S]*?)</div>', "g");
        var topic = regTopic.exec(res.data);
        if (topic != null) {
          res.data = res.data.replace(topic[0], "")
        }

        // console.log(res.data);

        var regContent = new RegExp('<div class="articleCont" id="artibody">([\\s\\S]*?)</div>', "g");
        var content = regContent.exec(res.data);
        if (content != null) {
          console.log(content[1]);

          const article = that.formatArticle(content[1]);

          that.setData({
            article: article,
          });
        }

        //wx.stopPullDownRefresh();
        wx.hideLoading();
      }
    });
  },
})