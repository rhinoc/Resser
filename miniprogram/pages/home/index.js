const utilsDays = require('../../utils/utils-days.js');
const xml2json = require('../../utils/xml2json.js');
const util = require('../../utils/util.js');
const app = getApp() //获取应用实例
const db = wx.cloud.database();
var rss_pool = new Array();
var laters = wx.getStorageSync('laters') || [];
var history = wx.getStorageSync('history') || [];
var source_stat = wx.getStorageSync('source_stat') || [];
var openid = wx.getStorageSync('openid') || '';
var rss_list = wx.getStorageSync('rss_list');
var temp = {};
var query = "";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchMode: 0,
    isEmpty: false,
    userData: [],
    rss_list: rss_list,
    rss_pool: [],
    cates: [],
    length: 0,
    openid: openid,
  },

  /**
   * 打开小程序时
   */
  onShow: function(options) {
    rss_list = wx.getStorageSync('rss_list');
    openid = wx.getStorageSync('openid') || '';
    laters = wx.getStorageSync('laters') || [];
    history = wx.getStorageSync('history') || [];
    for (var j in rss_pool) {
      rss_pool[j].islatered = false;
      for (var k in laters)
        if (rss_pool[j].link == laters[k].link) {
          rss_pool[j].islatered = true;
          continue;
        }
    }
    this.setData({
      rss_pool
    });

    if (rss_list.length == 0) this.setData({
      isEmpty: true
    });
    else this.setData({
      isEmpty: false
    });

    if (openid != temp.openid) {
      console.log("openid changed");
      this.setData({
        openid,
      })
      this.onLoad();
    } else {
      try {
        var flag = false;
        for (var i in rss_list)
          if (rss_list[i].rssUrl != temp.rss_list[i].rssUrl) flag = true;
        if (flag) {
          console.log("rss_list changed");
          this.setData({
            rss_list
          });
          this.onLoad();
        }
      } catch (error) {
        this.onLoad();
      }

    }
  },

  onPullDownRefresh: function() {
    this.setData({
      rss_list: [],
      rss_pool: []
    })
    this.onLoad();
  },

  onLoad: function() {
    if (openid == '') {
      console.log('openid notfound')
      wx.lin.showMessage({
          type: 'warning',
          duration: 2000,
          content: '两秒后将自动跳转到「我的」页面'
        }),
        setTimeout(function() {
          wx.switchTab({
            url: '../user/index',
          })
        }, 2000);
    } else {
      console.log('openid found')
      wx.stopPullDownRefresh()
      const that = this;
      // wx.showLoading({
      //   title: '加载中',
      // })
      // setTimeout(function() {
      //   wx.hideLoading()
      // }, 1500)

      //从云端读取用户数据库
      db.collection('user').where({
        _openid: openid
      }).get().then(res => {
        let userData = res.data[0];
        let rss_list = userData.subscribe;
        let isEmpty = rss_list.length == 0 ? true : false;
        console.log(userData);
        that.setData({
          isEmpty,
          userData,
          rss_list,
          openid: userData._openid
        })
        //读取用户数据
        var tags = new Array();
        for (var i in userData.subscribe) { //没有设置tag的源统一划到“全部”下
          try {
            var obj = userData.subscribe[i].tag["0"];
            if (obj) tags[i] = obj;
          } catch (err) {
            tags[i] = '全部';
            userData.subscribe[i].tag["0"]='全部';
          }
        }
        var cates = Array.from(new Set(tags));
        for (var i in cates) { //除去“全部”外其余的tag
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
        try {
          that.getRss(this.data.rss_list, tags.length - 1); //加载从源获取到的数据
        } catch (err) {
          console.log(err);
        }
      });
      temp = {
        openid,
        rss_list
      };

    }
  },

  getRss: function(rss_list, i) {
    const that = this;
    rss_pool = new Array();
    var url = rss_list[i].rssUrl;
    wx.vrequest({
      // wx.request({

      url: url,
      data: {},
      header: {
        'Content-Type': 'application/xml',
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      success: function(res) {
        var dataJson = that.rssDecode(res.body);
        try {
          dataJson = xml2json(dataJson);
        } catch (error) {
          dataJson = xml2json(res.body);
          console.log(res.body);
        }
        rss_pool = that.data.rss_pool;
        try {
          var rssData = dataJson.feed || dataJson.rss.channel;
          if ('item' in rssData) var rssDataItem = rssData.item;
          else var rssDataItem = rssData.entry;
          if (!Array.isArray(rssDataItem)) { //当item直接为资讯内容时
            var obj = {};
            obj.favicon = rss_list[i].favicon;
            obj.source = rss_list[i].title;
            obj.tag = rss_list[i].tag;
            obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
            obj.readed = history.indexOf(obj.link) > -1 ? true : false;
            obj.islatered = laters.indexOf(obj.link) > -1 ? true : false;
            obj.author = '';
            obj.title = rssDataItem.title.text;
            if (obj.title.length != 0 && obj.title != undefined) {
              obj.title = obj.title.replace(/&lt;/g, "<");
              obj.title = obj.title.replace(/&gt;/g, ">");
              obj.title = obj.title.replace(/&ldquo;/g, "“");
              obj.title = obj.title.replace(/&rdquo;/g, "”");
              obj.title = obj.title.replace(/&mdash;/g, "—");
              obj.title = obj.title.replace(/&ndash;/g, "–");
              obj.title = obj.title.replace(/&#8211;/g, "–");
            }
            if ('content:encoded' in rssDataItem) obj.article = rssDataItem["content:encoded"].text;
            else obj.article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p || '';

            try {
              obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text;
              obj.oriTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
              obj.pubTime = utilsDays.formatTime(obj.oriTime);
            } catch (err) {
              obj.pubTime = ''
            };

            if ('dc:creator' in rssDataItem) obj.author = rssDataItem["dc:creator"].text;
            else if ('author' in rssDataItem) obj.author = rssDataItem.author.text || rssDataItem.author.name;
            else if ('author' in rssData) obj.author = rssData.author.name.text;

            if ('enclosure' in rssDataItem) obj.enclosure = rssDataItem.enclosure.url;
            else {
              var reg = /<img[\s\S](?!.*avatar).*?src=['"](.*?)['"]/;
              if (reg.test(obj.article)) obj.enclosure = RegExp.$1;
            }
            // 显示指定时常内的资讯
            // var now = new Date();
            // var pubTime = new Date(obj.pubTime);
            // var delta = now - pubTime;
            if ((rss_pool.length < 1 || obj.title != rss_pool[0].title)) rss_pool.unshift(obj);
          } else {
            for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {
              rssDataItem = (rssData.item || rssData.entry)[j]
              var obj = {};
              obj.favicon = rss_list[i].favicon;
              obj.source = rss_list[i].title;
              obj.tag = rss_list[i].tag;
              obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
              obj.base = rss_list[i].link || '';
              obj.readed = history.indexOf(obj.link) > -1 ? true : false;
              obj.islatered = laters.indexOf(obj.link) > -1 ? true : false;
              obj.author = '';
              obj.title = rssDataItem.title.text || '';
              if (obj.title != undefined && obj.title.length != 0) {
                obj.title = obj.title.replace(/&lt;/g, "<");
                obj.title = obj.title.replace(/&gt;/g, ">");
                obj.title = obj.title.replace(/&ldquo;/g, "“");
                obj.title = obj.title.replace(/&rdquo;/g, "”");
                obj.title = obj.title.replace(/&mdash;/g, "—");
                obj.title = obj.title.replace(/&ndash;/g, "–");
                obj.title = obj.title.replace(/&#8211;/g, "–");
              } else continue;
              if ('content:encoded' in rssDataItem) obj.article = rssDataItem["content:encoded"].text;
              else {
                if ('summary' in rssDataItem) obj.article = rssDataItem.summary.text;
                else if ('content' in rssDataItem) obj.article = rssDataItem.content.text;
                else if ('description' in rssDataItem) obj.article = rssDataItem.description.text || rssDataItem.description.p;
                else obj.article = '';
              }
              if ('enclosure' in rssDataItem) obj.enclosure = rssDataItem.enclosure.url;
              else {
                var reg = /<img[\s\S](?!.*avatar).*?src=['"](.*?)['"]/;
                if (reg.test(obj.article) && RegExp.$1.indexOf("?tex") == -1) obj.enclosure = RegExp.$1; 
              }
              try {
                obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text;
                obj.oriTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
                obj.pubTime = utilsDays.formatTime(obj.oriTime);
                // console.log(obj.pubTime);
              } catch (err) {
                obj.pubTime = '';
              }
              if ('dc:creator' in rssDataItem) obj.author = rssDataItem["dc:creator"].text;
              else if ('author' in rssDataItem) obj.author = rssDataItem.author.text || rssDataItem.author.name;
              else if ('author' in rssData) obj.author = rssData.author.name.text;
              // var now = new Date();
              // var pubTime = new Date(obj.pubTime);
              // var delta = now - pubTime;
              if ((rss_pool.length < 1 || obj.title != rss_pool[0].title)) rss_pool.unshift(obj);
            }
          }
        } catch (error) {
          console.log(error);
        }

        //按时间先后排序
        rss_pool.sort(function(a, b) {
          return b['oriTime'] > a['oriTime'] ? 1 : -1
        })

        that.setData({
          rss_pool,
        });
        wx.setStorageSync('rss_pool', rss_pool);
      }
    });

    if (i > 0) this.getRss(rss_list, i - 1)
    else {
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
    s = s.replace(/<!--*?[\s\S]*?-->/g, "");
    // s = s.replace(/&nbsp;/g, " ");
    // s = s.replace(/&#39;/g, "\'");
    // s = s.replace(/&#34;/g, "\"");
    // s = s.replace(/&#xA;/g, "");
    // s = s.replace(/&quot;/g, "\"");
    s = s.replace(/&#123;/g, "{");
    s = s.replace(/&#125;/g, "}");
    s = s.replace(/&#124;/g, "|");
    s = s.replace(/&#126;/g, "~");
    s = s.replace(/<script.*?>window.daily.*?>/g, "");
    s = s.replace(/<img.*?c.statcounter.*?>/g, "");
    s = s.replace(/<img.*?google-analytics.*?>/g, "");
    s = s.replace(/<img.*?hm.baidu.*?>/g, "");
    s = s.replace(/<\?xml-stylesheet.*?>/g, "");
    s = s.replace(/<font color="red">订阅指南.*\n.*/g, "");
    s = s.replace(/<script>[\s\S]*?googletag[\s\S]*?>/g, "");
    s = s.replace(/<div>获取更多RSS[\s\S]*?<\/div>/g, "");
    s = s.replace(/<script[\s\S]*<\/script>/g, "");
    s = s.replace(/<img src=".*?feedburner.*?theinitium.*?>/g, "");
    return s;
  },

  // 点击跳转至文章详情页
  handleRssItemTap: function(event) {
    const id = event.currentTarget.dataset.articleIndex;
    var rssData = rss_pool[id];
    rss_pool[id].readed = true;
    for (var i in rss_list) {
      if (rss_list[i].title == rss_pool[id].source) {
        if (rss_list[i].count == undefined) rss_list[i].count = 1;
        else rss_list[i].count += 1;
        console.log(rss_list[i].title)
      }
    }
    db.collection('user').where({
      _openid: openid
    }).get({
      success: res => {
        var getid = res.data["0"]._id;
        db.collection('user').doc(getid).update({
          data: {
            subscribe: rss_list
          },
          success(res) {
            console.log('计数+1')
            wx.setStorageSync('rss_list', rss_list);
            this.setData({
              rss_list
            });
          }
        })
      },
      fail: err => {}
    })

    wx.setStorageSync('rss_pool', rss_pool);
    this.setData({
      rss_pool
    });
    if (history.indexOf(rssData.link) == -1) history.push(rssData.link);
    wx.setStorageSync('history', history);
    rssData = JSON.stringify(rssData);
    rssData = encodeURIComponent(rssData);
    wx.navigateTo({
      url: '../global/article?rssData=' + rssData,
    })
  },

  handleSearch: function (e) {
    if ("" != (query= e.detail.detail.value) && null != query) {
      this.setData({
        searchMode: 1
      })
      for (var t in rss_pool) {
        var i = rss_pool[t], s = i.article.replace(/<[\s\S]*?>/g, "");
        (i.source + i.tag + i.author + i.title + s + i.link).toLowerCase().match(query.toLowerCase()) ? rss_pool[t].matched = !0 : rss_pool[t].matched = !1;
      }
      this.setData({
        rss_pool: rss_pool
      });
    } else this.setData({
      searchMode: !1
    });
  },

  //添加至稍后阅读
  onLater: function(event) {
    const that = this;
    const articleid = event.currentTarget.dataset.articleIndex;

    if (!rss_pool[articleid].islatered) { //数组中没有，则添加稍后阅读
      var obj = {};
      obj.title = rss_pool[articleid].title;
      obj.pubTime = rss_pool[articleid].pubTime;
      obj.author = rss_pool[articleid].author;
      obj.article = rss_pool[articleid].article;
      obj.link = rss_pool[articleid].link;
      obj.base = rss_pool[articleid].base;
      laters.unshift(obj);
    } else {
      for (var i in laters)
        if (laters[i].link == rss_pool[articleid].link) laters.splice(i, 1);
    }
    rss_pool[articleid].islatered = !rss_pool[articleid].islatered;
    wx.setStorageSync('laters', laters);
    that.setData({
      rss_pool
    });

  },

  navTo: function() {
    wx.switchTab({
      url: '../discover/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})