//index.js
const util = require('../../utils/util.js');
const xml2json = require('../../utils/xml2json.js');
const app = getApp() //获取应用实例
const db = wx.cloud.database();
var rss_pool = new Array();
var islatered = new Array();
var laters = wx.getStorageSync('laters') || [];
var history = wx.getStorageSync('history') || [];

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
    history = wx.getStorageSync('history') || [];
  },

  onPullDownRefresh: function() {
    this.setData({
      rss_list: [],
      rss_pool: []
    })
    this.onLoad();
  },

  onLoad: function() {
    wx.stopPullDownRefresh()
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
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
      for (var i in userData.subscribe) { //没有设置tag的源统一划到“全部”下
        try {
          var obj = userData.subscribe[i].tag["0"];
          tags[i] = obj;
        } catch (err) {
          tags[i] = '全部';
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
        // var dataJson = that.rssDecode(res.data);
        var dataJson = that.rssDecode(res.body);
        try {
          dataJson = xml2json(dataJson);
        } catch (error) {
          dataJson = xml2json(res.data);
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
            if (history.indexOf(obj.link) > -1) obj.readed = true;
            else obj.readed = false;
            obj.author = '';
            obj.title = rssDataItem.title.text;
            if ('content:encoded' in rssDataItem) obj.article = rssDataItem["content:encoded"].text;
            else obj.article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p || '';
            obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
            obj.pubTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''

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
            if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
              rss_pool.push(obj);
            }
          } else {
            for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {
              rssDataItem = (rssData.item || rssData.entry)[j]
              var obj = {};
              obj.favicon = rss_list[i].favicon;
              obj.source = rss_list[i].title;
              obj.tag = rss_list[i].tag;
              obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
              if (history.indexOf(obj.link) > -1) obj.readed = true;
              else obj.readed = false;
              obj.author = '';
              obj.title = rssDataItem.title.text;
              if ('content:encoded' in rssDataItem) obj.article = rssDataItem["content:encoded"].text;
              else obj.article = (rssDataItem.content || rssDataItem.description).text || rssDataItem.description.p || '';
              if ('enclosure' in rssDataItem) obj.enclosure = rssDataItem.enclosure.url;
              else {
                var reg = /<img[\s\S](?!.*avatar).*?src=['"](.*?)['"]/;
                if (reg.test(obj.article)) obj.enclosure = RegExp.$1;
              }
              try {
                obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
              } catch (err) {
                obj.pubTime = '';
              }
              obj.pubTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
              if ('dc:creator' in rssDataItem) obj.author = rssDataItem["dc:creator"].text;
              else if ('author' in rssDataItem) obj.author = rssDataItem.author.text || rssDataItem.author.name;
              else if ('author' in rssData) obj.author = rssData.author.name.text;
              var now = new Date();
              var pubTime = new Date(obj.pubTime);
              var delta = now - pubTime;
              if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
                rss_pool.push(obj);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }

        rss_pool.sort(function(a, b) {
          return b['pubTime'] > a['pubTime'] ? 1 : -1
        })

        for(var j in rss_pool){
          islatered[j] = 0;
          for(var k in laters){
            if (rss_pool[j].titile == later[k].title) islatered[j]=1;
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
    s = s.replace(/<script.*?>window.daily.*?]]>/g, "");
    s = s.replace(/<img.*?c.statcounter.*?>/g, "");
    s = s.replace(/<img.*?google-analytics.*?>/g, "");
    s = s.replace(/<img.*?hm.baidu.*?>/g, "");
    s = s.replace(/<\?xml-stylesheet.*?>/g, "");
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/<font color="red">订阅指南.*\n.*/g, "");
    s = s.replace(/<script>[\s\S]*?googletag[\s\S]*?>/g, "");
    s = s.replace(/<div>获取更多RSS[\s\S]*?<\/div>/g, "");
    s = s.replace(/<script[\s\S]*<\/script>/g, "");
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
  handleRssItemTap: function(event) {
    const id = event.currentTarget.dataset.articleIndex;
    var rssData = rss_pool[id];
    rss_pool[id].readed = true;
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

  //添加至稍后阅读
  onLater: function(event) {
    // console.log(event);
    const that = this;
    const articleid = event.currentTarget.dataset.articleIndex;

    if (islatered[articleid] == 0) { //如果之前不在数组，则添加稍后阅读
      var obj = {};
      obj.title = rss_pool[articleid].title;
      obj.pubTime = rss_pool[articleid].pubTime;
      obj.author = rss_pool[articleid].author;
      obj.article = rss_pool[articleid].article;
      laters.unshift(obj);
      islatered[articleid] = 1;
    } else {
      for (var i in laters)
        if (laters[i].title == rss_pool[articleid].title) laters.splice(i, 1);
      islatered[articleid] = 0;
    }
    wx.setStorageSync('laters', laters);
    that.setData({
      islatered
    });

  }


})