// 发现页-点击某个源
// 参考home/index和dicover/index
const db = wx.cloud.database();
const _ = db.command;
const openid = wx.getStorageSync('openid');
var rss_list = wx.getStorageSync('rss_list') || [];
const rss = require('../../data/rss.js');
const util = require('../../utils/util.js');
const xml2json = require('../../utils/xml2json.js');
var rssData = rss.rssData;
var rss_pool = new Array();
var rssed = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rssed:'',
    button:'',
    id: '',
    favicon:'',
    title:'',
    rssUrl:'',
    description:'',
    rss_pool: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idx = options.idx
    var id = options.id
    var sourceItem=rssData[idx].items[id];
    this.setData({
      favicon: sourceItem.favicon,
      title: sourceItem.title,
      rssUrl: sourceItem.rssUrl,
      description: sourceItem.description,
    })
    rss_list = wx.getStorageSync('rss_list')
    if (rss_list.find(function (x) {
      return x.rssUrl == sourceItem.rssUrl;
    })) {
      console.log("已订阅");
      rssed = "-";
      var button = true;
    } else {
      console.log("未订阅");
      rssed = "+";
      var button = false;
    }
    this.setData({
      rssed,
      button,
    });

    this.getRss(sourceItem.rssUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  onChange: function (event) {
    console.log(event);
    var that = this;
    var id = event.currentTarget.dataset.id;
    var rssItemData = rssData[id];

    if (rssed == "+") {
      rssed = "-";
      // button = true;
      this.setData({ rssed});
      rss_list.push(rssItemData);
    }
    else {
      rssed = "+";
      // button = false;
      this.setData({ rssed});
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == rssItemData.rssUrl) rss_list.splice(i, 1);
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
            wx.setStorageSync('rss_list', rss_list);
            this.onload();
          }
        })
      },
      fail: err => { }
    })
  },

  handleItemTap: function(event){
    const id = event.currentTarget.dataset.id;
    var rssData = rss_pool[id];
    // console.log(rssData);
    rssData = JSON.stringify(rssData);
    rssData = encodeURIComponent(rssData);
    // console.log(rssData);
    wx.navigateTo({
      url: '../global/article?rssData='+rssData,
    })
  },


  rssDecode: function (content) {
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

  getRss: function (url) {
    const that =  this;
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
      success: function (res) {
        // var dataJson = that.rssDecode(res.data);
        var dataJson = that.rssDecode(res.body);
        try {
          dataJson = xml2json(dataJson);
        } catch (error) {
          dataJson = xml2json(res.data);
        }
        rss_pool = that.data.rss_pool;
        var rssData = dataJson.feed || dataJson.rss.channel;
        if ('item' in rssData) var rssDataItem = rssData.item;
        else var rssDataItem = rssData.entry;
        if (!Array.isArray(rssData.item)) { //当item直接为资讯内容时
          var obj = {};
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
          if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
            rss_pool.push(obj);
          }
        } else {
          for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {

            rssDataItem = (rssData.item || rssData.entry)[j]
            var obj = {};

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

        that.setData({
          rss_pool
        });
      }
    });
    }
})