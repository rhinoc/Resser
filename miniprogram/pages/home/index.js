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
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
      // if (openid == '') {
      //   wx.showToast({
      //     title: '请先登陆',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    }, 2000)
    let openid = wx.getStorageSync('openid');
    //从云端读取用户数据库
    db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      let userData = res.data[0];
      that.setData({
        userData
      })
      that.setData({openid:userData._openid})
      //读取用户数据
      var feeds = new Array(); //新建数组 用以存放rss订阅链接
      var titles = new Array(); //新建数组 用以存放每个源的名称
      var links = new Array(); //新建数组 用以存放每个源的名称
      var favicons = new Array(); //新建数组 用以存放每个源的图标
      var tags = new Array();

      let rss_list = that.data.rss_list;
      for (var i in userData.subscribe) {
        feeds.push(userData.subscribe[i].rssUrl);
        titles.push(userData.subscribe[i].title);
        links.push(userData.subscribe[i].link);
        favicons.push(userData.subscribe[i].favicon);
        tags.push(userData.subscribe[i].tag[0]);
      }
      var cates = Array.from(new Set(tags));
      that.setData({cates});

      //将读取到的用户数据赋值给Page中rss_list
      for (var i = 0; i < feeds.length; i++) {
        var obj = {};
        obj.name = titles[i];
        obj.url = feeds[i];
        obj.favicon = favicons[i];
        obj.link = links[i];
        obj.tag = tags[i];
        rss_list.push(obj);
      }
      rss_list.splice(0, 1);
      that.setData({
        rss_list,
        length:feeds.length,
      });

      wx.setStorage({
        key: 'rss_list',
        data: rss_list,
      })

      // console.log(rss_list);
      that.getRss(this.data.rss_list,feeds.length-1); //加载从源获取到的数据 
    })


  },

  getRss: function (rss_list,i) {
    const that = this;
    var url = rss_list[i].url;
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
        rss_pool = that.data.rss_pool;
        for (var j = 0; j < (rssData.item || rssData.entry).length; j++) {
          var rssDataItem = (rssData.item || rssData.entry)[j]
          // console.log(j,rssDataItem);
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
          if ((rss_pool.length < 1 || obj.title != rss_pool[rss_pool.length - 1].title) && delta < 1468800000) {
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