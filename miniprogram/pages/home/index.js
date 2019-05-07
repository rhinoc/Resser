//index.js
const regeneratorRuntime = require('../../utils/runtime');
const util = require('../../utils/util.js');
const xml2json = require('../../utils/xml2json.js');
const app = getApp() //获取应用实例
const db = wx.cloud.database();
var rss_pool = new Array();
var islatered = new Array();
var laters = wx.getStorageSync('laters') || [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userData: [],
    rss_list: [],
    rss_pool: [],
    cates: [],
    length: 0,
    openid: '',
    islatered: [],
  },

  /**
   * 打开小程序时
   */
  onShow: function(options) {
    laters = wx.getStorageSync('laters') || [];
  },

  onPullDownRefresh: function() {
    this.setData({
      rss_list: [],
      rss_pool: []
    })
    this.onLoad();
  },

  onLoad: function() {
    // wx.clearStorageSync();
    wx.stopPullDownRefresh()
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
    let openid = wx.getStorageSync('openid');
    //从云端读取用户数据库
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      let userData = res.data[0];
      console.log(userData);
      let rss_list = userData.subscribe;
      that.setData({
        userData,
        rss_list
      })
      that.setData({
        openid: userData._openid
      })
      //读取用户数据
      var tags = new Array();
      // console.log(userData.subscribe)
      for (var i in userData.subscribe) {
        try {
          var obj = userData.subscribe[i].tag["0"];
          tags[i] = obj;
        } catch (err) {
          tags[i] = '全部';
        }
      }
      var cates = Array.from(new Set(tags));
      for (var i in cates) {
        if (cates[i] == '全部') cates.splice(i, 1);
      }
      that.setData({
        cates
      });

      //将读取到的用户数据赋值给Page中rss_list
      that.setData({
        length: tags.length,
      });

      wx.setStorageSync('rss_list', rss_list);
      // console.log(rss_list);
      try {
        that.getRss(this.data.rss_list, tags.length - 1); //加载从源获取到的数据
      } catch (err) {
        console.log(err);
      }
    });

    //初始化稍后阅读按钮状态
    for (var i in islatered) {
      islatered[i] = 0;
    };
    this.setData({
      islatered
    })

  },

  getRss: function(rss_list, i) {
    const that = this;
    rss_pool = new Array();
    var url = rss_list[i].rssUrl;
    // wx.vrequest({
    wx.request({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/xml',
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      success: function(res) {
        // console.log(res.data);
        // console.log(typeof(res.data));
        // var dataJson = xml2json(res.body); vr
        var dataJson = that.rssDecode(res.data);
        dataJson = xml2json(dataJson);
        // console.log('dataJson',dataJson);
        //获取转换为JSON格式后的列表内容
        rss_pool = that.data.rss_pool;
        var rssData = dataJson.feed || dataJson.rss.channel;
        console.log(rssData);
        if (!Array.isArray(rssData.item)) { //当item直接为资讯内容时
          var rssDataItem = rssData.item;
          var obj = {};
          if ('enclosure' in rssDataItem) {
            obj.enclosure = rssDataItem.enclosure.url;
          }
          obj.favicon = rss_list[i].favicon;
          obj.source = rss_list[i].title;
          obj.tag = rss_list[i].tag;
          obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
          obj.author = '';
          obj.title = rssDataItem.title.text;
          obj.article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p || '';
          obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
          obj.pubTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
          if ('dc:creator' in rssDataItem) {
            obj.author = rssDataItem["dc:creator"].text;
          } else if ('author' in rssDataItem) {
            obj.author = rssDataItem.author.text || rssDataItem.author.name;
          } else if ('author' in rssData) {
            obj.author = rssData.author.name.text;
          }
          if ('content:encoded' in rssDataItem) {
            obj.article = rssDataItem["content:encoded"].text;
          }
          var now = new Date();
          var pubTime = new Date(obj.pubTime);
          var delta = now - pubTime;
          if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
            rss_pool.push(obj);
          }
        } else {
          for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {

            var rssDataItem = (rssData.item || rssData.entry)[j]
            var obj = {};
            obj.favicon = rss_list[i].favicon;
            obj.source = rss_list[i].title;
            obj.tag = rss_list[i].tag;
            if ('enclosure' in rssDataItem) {
              obj.enclosure = rssDataItem.enclosure.url || '';
            }

            // console.log(rssDataItem);
            obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
            obj.author = '';
            obj.title = rssDataItem.title.text;
            if ('content:encoded' in rssDataItem) {
              obj.article = rssDataItem["content:encoded"].text;
            } else {
              obj.article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p || '';
            }
            try {
              obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
            } catch (err) {
              obj.pubTime = '';
            }

            obj.pubTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
            if ('dc:creator' in rssDataItem) {
              obj.author = rssDataItem["dc:creator"].text;
            } else if ('author' in rssDataItem) {
              obj.author = rssDataItem.author.text || rssDataItem.author.name;
            } else if ('author' in rssData) {
              obj.author = rssData.author.name.text;
            }
            var now = new Date();
            var pubTime = new Date(obj.pubTime);
            var delta = now - pubTime;
            // console.log(obj);
            if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
              rss_pool.push(obj);
            }
          }
        }

        rss_pool.sort(function(a, b) {
          return b['pubTime'] > a['pubTime'] ? 1 : -1
        })

        for (var k in laters) {
          for (var j in rss_pool) {
            if (rss_pool[j].title == laters[k].title) {
              islatered[j] = 1;
            }
            else {
              islatered[j] = 0;
            }
          }
        }
        that.setData({
          rss_pool,
          islatered
        });
        wx.setStorageSync('rss_pool', rss_pool);
      }
    });
    if (i > 0) {
      this.getRss(rss_list, i - 1)
    } else {
      this.setData({
        rss_list,
        rss_pool,
      });
      wx.setStorageSync('rss_list', rss_list);
    }
  },

  rssDecode: function(content) {
    var s = "";
    if (content.length == 0) return "";
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/<script.*?>window.daily.*>/g, "");
    s = s.replace(/<\?xml-stylesheet.*?>/g, "");
    // s = s.replace(/&lt;/g, "<");
    // s = s.replace(/&gt;/g, ">");
    // s = s.replace(/&nbsp;/g, " ");
    // s = s.replace(/&#39;/g, "\'");
    // s = s.replace(/&#34;/g, "\"");
    // s = s.replace(/&#xA;/g, "");
    // s = s.replace(/&quot;/g, "\"");
    s = s.replace(/&#123;/g, "{");
    s = s.replace(/&#125;/g, "}");
    s = s.replace(/&#124;/g, "|");
    s = s.replace(/&#126;/g, "~");
    return s;
  },

  // 点击跳转至文章详情页
  handleRssItemTap: (event) => {
    const articleIndex = event.currentTarget.dataset.articleIndex;
    wx.navigateTo({
      url: `../home/article?&id=${articleIndex}`,
    });
  },

  //添加至稍后阅读
  onLater: function(event) {
    // console.log(event);
    const that = this;
    const articleid = event.currentTarget.dataset.articleIndex;

    if(islatered[articleid]==0){
      var obj = {};
      obj.title = rss_pool[articleid].title;
      obj.pubTime = rss_pool[articleid].pubTime;
      obj.author = rss_pool[articleid].author;
      obj.id2 = articleid;
      laters.push(obj);
      islatered[articleid] = 1;
    }
    else{
      for(var i in laters){
        if (laters[i].title == rss_pool[articleid].title){
          laters.splice(i,1);
        }
      }
      islatered[articleid] = 0;
    }
    wx.setStorageSync('laters', laters);
    that.setData({
      islatered
    });

  }


})