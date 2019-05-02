//index.js
const regeneratorRuntime = require('../../utils/runtime');
const util = require('../../utils/util.js');
const xml2json = require('../../utils/xml2json.js');
const app = getApp() //获取应用实例
const db = wx.cloud.database();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    userData: [{}],
    rss_list: [{}],
    rss_pool: [{}],
    cates:[{}],
    length: 0,
    openid: '',
  },

  /**
   * 打开小程序时
   */
  onLoad: function(options) {


  },

  onPullDownRefresh: function () {
    this.setData({
      rss_list: [{}],
      rss_pool: [{}]
    })
  },

  onShow: function() {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    let openid = wx.getStorageSync('openid');
    //从云端读取用户数据库
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      let userData = res.data[0];
      let rss_list = userData.subscribe;
      that.setData({
        userData,
        rss_list
      })
      that.setData({ openid: userData._openid })
      //读取用户数据
      var tags = new Array();
      console.log(userData.subscribe)
      for (var i in userData.subscribe) {
        var obj = userData.subscribe[i].tag["0"];
        tags[i] = obj;
      }
      var cates = Array.from(new Set(tags));
      that.setData({ cates });

      //将读取到的用户数据赋值给Page中rss_list
      that.setData({
        length: tags.length,
      });

      wx.setStorage({
        key: 'rss_list',
        data: rss_list,
      })

      // console.log(rss_list);
      try{
        that.getRss(this.data.rss_list, tags.length - 1); //加载从源获取到的数据 
      }
      catch(err) {console.log(err);}
    })
  },

  getRss: function (rss_list,i) {
    const that = this;
    var url = rss_list[i].rssUrl;
    var rss_pool = new Array();
    wx.vrequest({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/xml',
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome",
        "Accept": "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      success: function (res) {
        var dataJson = xml2json(res.data);
        // console.log('dataJson',dataJson);
        //获取转换为JSON格式后的列表内容
        var rssData = dataJson.feed || dataJson.rss.channel;
        console.log(i,rssData);
        rss_pool = that.data.rss_pool;
        for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {
          var rssDataItem = (rssData.item || rssData.entry)[j]
          var obj = {};
          obj.favicon = rss_list[i].favicon;
          obj.source = rss_list[i].name;
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
          var delta = now-pubTime;
          if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title)) {
            rss_pool.push(obj);
            }
        }
        rss_pool.sort(function(a,b){
          return b['pubTime'] > a['pubTime'] ? 1:-1
        })
        that.setData({ rss_pool });
        wx.setStorageSync('rss_pool', rss_pool);
      }
    });
    if (i>0) {
      this.getRss(rss_list,i-1)
    }
    else{
      this.setData({
        rss_list,
        rss_pool,
      });
      wx.setStorageSync('rss_list', rss_list);
    }
  },

  // 点击跳转至文章详情页
  handleRssItemTap: (event) => {
    // const sourceIndex = event.currentTarget.dataset.sourceIndex;
    console.log('event', event);
    const articleIndex = event.currentTarget.dataset.articleIndex;
    console.log('articleIndex',articleIndex);
    wx.navigateTo({
      url: `../home/article?&id=${articleIndex}`,
    });
  },

})

function getJsonLength(jsonData) {
  var jsonLength = 0;
  for (var item in jsonData) {
    jsonLength++;
  }
  return jsonLength;
}