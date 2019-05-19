// 发现页-点击某个源
const db = wx.cloud.database();
const _ = db.command;
const openid = wx.getStorageSync('openid');
var rss_list = wx.getStorageSync('rss_list') || [];
const xml2json = require('../../utils/xml2json.js');
const util = require('../../utils/util.js');
const utilsDays = require('../../utils/utils-days.js');
var rss_pool = new Array();
var sourceItem = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceItem: [],
    rss_pool: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    sourceItem = options.sourceItem;
    sourceItem = decodeURIComponent(sourceItem);
    sourceItem = JSON.parse(sourceItem);

    this.setData({
      sourceItem
    })
    this.getRss(sourceItem.rssUrl);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    rss_list = wx.getStorageSync('rss_list')
  },

  onChange: function(event) {
    var that = this;
    if (sourceItem.rssed == 0) {
      rss_list.push(sourceItem)
    } else {
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == sourceItem.rssUrl) rss_list.splice(i, 1);
        console.log('删除');
      }
    }
    sourceItem.rssed = 1 - sourceItem.rssed;
    this.setData({
      sourceItem
    });

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
            console.log('成功修改云数据库')
            wx.setStorageSync('rss_list', rss_list);
            this.onload();
          }
        })
      },
      fail: err => {}
    })
  },

  handleItemTap: function(event) {
    const id = event.currentTarget.dataset.id;
    var rssData = this.data.rss_pool[id];
    rssData = JSON.stringify(rssData);
    rssData = encodeURIComponent(rssData);
    wx.navigateTo({
      url: '../global/article?rssData=' + rssData,
    })
  },


  rssDecode: function(content) {
    if (content == undefined) return "";
    if (content.length == 0) return "";
    var s = "";
    s = content.replace(/&amp;/g, "&");
    // s = s.replace(/<!--.*?-->/g,"");
    s = s.replace(/<!.*?>/g, "");
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
    s = s.replace(/&ldquo;/g, "“");
    s = s.replace(/&rdquo;/g, "”");
    s = s.replace(/&mdash;/g, "—");
    s = s.replace(/&ndash;/g, "–");
    s = s.replace(/&#123;/g, "{");
    s = s.replace(/&#125;/g, "}");
    s = s.replace(/&#124;/g, "|");
    s = s.replace(/&#126;/g, "~");
    s = s.replace(/<!--.*?-->/g, "");
    s = s.replace(/<script.*?>window.daily.*?]]>/g, "");
    s = s.replace(/<img.*?c.statcounter.*?>/g, "");
    s = s.replace(/<img.*?google-analytics.*?>/g, "");
    s = s.replace(/<img.*?hm.baidu.*?>/g, "");
    s = s.replace(/<\?xml-stylesheet[\s\S]*?>/g, "");
    return s;
  },

  getRss: function(url) {
    const that = this;
    rss_pool = new Array();
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
        console.log(res);
        // var dataJson = that.rssDecode(res.data);
        var dataJson = that.rssDecode(res.body);
        // console.log(dataJson);
        try {
          console.log('采用解码输出');
          dataJson = xml2json(dataJson);
        } catch (error) {
          console.log('采用原始输出');
          dataJson = xml2json(res.body);
        }
        rss_pool = that.data.rss_pool;
        console.log(dataJson);
        var rssData = dataJson.feed || dataJson.rss.channel;
        if ('item' in rssData) var rssDataItem = rssData.item;
        else var rssDataItem = rssData.entry;
        if (!Array.isArray(rssDataItem)) { //当item直接为资讯内容时
          var obj = {};
          obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
          obj.author = '';
          obj.title = rssDataItem.title.text;
          if (obj.title.length != 0 && obj.title != undefined) {
            obj.title = obj.title.replace(/&lt;/g, "<");
            obj.title = obj.title.replace(/&gt;/g, ">");
            obj.title = obj.title.replace(/&ldquo;/g, "“");
              obj.title = obj.title.replace(/&rdquo;/g, "”");
              obj.title = obj.title.replace(/&mdash;/g, "—");
              obj.title = obj.title.replace(/&ndash;/g, "–");
          }
          if ('content:encoded' in rssDataItem) obj.article = rssDataItem["content:encoded"].text;
          else obj.article = (rssDataItem.content || rssDataItem.description || rssDataItem.summary).text || rssDataItem.description.p || '';
          try {
            obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
            obj.oriTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : ''
            obj.pubTime = utilsDays.formatTime(obj.oriTime);
        } catch (err) {obj.pubTime = ''};

          if ('dc:creator' in rssDataItem) obj.author = rssDataItem["dc:creator"].text;
          else if ('author' in rssDataItem) obj.author = rssDataItem.author.text || rssDataItem.author.name;
          else if ('author' in rssData) obj.author = rssData.author.name.text;
          // var now = new Date();
          // var pubTime = new Date(obj.pubTime);
          // var delta = now - pubTime;
          if ((rss_pool.length < 1 || obj.title != rss_pool[0].title)) rss_pool.push(obj);
        } else {
          for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {
            rssDataItem = (rssData.item || rssData.entry)[j]
            var obj = {};
            obj.link = (rssDataItem.link || rssDataItem.id).text || rssDataItem.link.href;
            obj.author = '';
            obj.title = rssDataItem.title.text;
            if (obj.title != undefined && obj.title.length != 0) {
                obj.title = obj.title.replace(/&lt;/g, "<");
                obj.title = obj.title.replace(/&gt;/g, ">");
                obj.title = obj.title.replace(/&ldquo;/g, "“");
                obj.title = obj.title.replace(/&rdquo;/g, "”");
                obj.title = obj.title.replace(/&mdash;/g, "—");
                obj.title = obj.title.replace(/&ndash;/g, "–");
            } else continue;
            if ('content:encoded' in rssDataItem)
              obj.article = rssDataItem["content:encoded"].text;
            else {
              if ('summary' in rssDataItem) obj.article = rssDataItem.summary.text;
              else if ('content' in rssDataItem) obj.article = rssDataItem.content.text;
              else if ('description' in rssDataItem) obj.article = rssDataItem.description.text || rssDataItem.description.p;
              else obj.article = '';
            }
            try {
              obj.pubTime = (rssDataItem.pubDate || rssDataItem.published || rssDataItem.updated).text || '';
              obj.oriTime = obj.pubTime ? util.formatDate("yyyy-MM-dd HH:mm", obj.pubTime) : '';
              obj.pubTime = utilsDays.formatTime(obj.oriTime);
            } catch (err) {
              obj.pubTime = '';
            }
            if ('dc:creator' in rssDataItem) obj.author = rssDataItem["dc:creator"].text;
            else if ('author' in rssDataItem) obj.author = rssDataItem.author.text || rssDataItem.author.name.text;
            else if ('author' in rssData) obj.author = rssData.author.text || rssData.author.name.text;

            // var now = new Date();
            // var pubTime = new Date(obj.pubTime);
            // var delta = now - pubTime;
            if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) rss_pool.push(obj);
          }
        }

        that.setData({
          rss_pool
        });
      }
    });
  }
})
