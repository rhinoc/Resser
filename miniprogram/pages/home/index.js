//index.js
import Toast from '../../components/toast/toast';
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
    length: 0,
    openid: '',
  },

  /**
   * 打开小程序时
   */
  onLoad: function(options) {
    Toast.loading({
      mask: false,
      message: '请先登陆',
    });
    const that = this;
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
      // console.log('data',that.data.userData);
      // console.log('43', userData);
      // console.log('subsribe',userData.subscribe);
      //读取用户数据
      var feeds = new Array(); //新建数组 用以存放rss订阅链接
      var titles = new Array(); //新建数组 用以存放每个源的名称
      var links = new Array(); //新建数组 用以存放每个源的名称
      var favicons = new Array();
      let rss_list = that.data.rss_list;
      for (var i in userData.subscribe) {
        feeds.push(userData.subscribe[i].rssUrl);
        titles.push(userData.subscribe[i].title);
        links.push(userData.subscribe[i].link);
        favicons.push(userData.subscribe[i].favicon);
      }

      //将读取到的用户数据赋值给Page
      for (var i = 0; i < feeds.length; i++) {
        var obj = {};
        obj.name = titles[i];
        obj.url = feeds[i];
        obj.favicon = favicons[i];
        obj.rssData = {};
        obj.link = links[i];
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

      that.getRss(this.data.rss_list,feeds.length-1); //加载从源获取到的数据 
    })


  },

  getRss: function (rss_list,i) {
    const that = this;
    var url = rss_list[i].url;
    wx.setStorageSync('curRssUrl', url);
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
        if ("rss" in dataJson) {
          var rssData = dataJson.rss.channel;
          //测试rssData的获取
          // console.log('100', rssData);
        } else if ("feed" in dataJson) {
          var rssData = dataJson.feed;
          //测试rssData的获取
          // console.log('107', rssData);
        }
        rss_list[i].rssData = rssData;
        that.setData({
          rss_list
        });
        wx.setStorageSync('rss_list', rss_list)
      }
    });
    if (i>0) this.getRss(rss_list,i-1);
  },

  // 点击跳转至文章详情页
  handleRssItemTap: (event) => {
    const sourceIndex = event.currentTarget.dataset.sourceIndex;
    console.log('event', event);
    const articleIndex = event.currentTarget.dataset.articleIndex;
    wx.navigateTo({
      url: `../home/article?s=${sourceIndex}&id=${articleIndex}&url=`,
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


//formats the ATOM feed to the needed output
function formatATOM(json, options) {
  var output = {
    'type': 'atom',
    items: []
  };
  var channel = json.feed || json;
  if (channel.title) {
    output.title = channel.title[0]._;
  }
  if (channel.subtitle)
    if (_.isArray(channel.subtitle)) {
      if (channel.subtitle[0]._) {
        output.desc = channel.subtitle[0]._;
      }
    } else {
      output.desc = channel.subtitle;
    }
  if (channel.link)
    if (_.isArray(channel.link)) {
      _.each(channel.link, function (val, index) {
        if (val.type && val.type.indexOf("html") > 0) {
          output.link = val.href;
        }
        if (val.rel === "hub") {
          output.hub = val.href;
        }
      });
    }
  if (channel.id) {
    output.id = channel.id[0];
  }
  if (channel.updated) {
    output.last_modified = new Date(channel.updated[0]).toString();
  }
  if (channel.author) {
    output.author = channel.author[0].name[0];
  }
  //just double check that it exists and that it is an array
  if (channel.entry) {
    if (!_.isArray(channel.entry)) {
      channel.entry = [channel.entry];
    }
    _.each(channel.entry, function (val, index) {
      val = flattenComments(val);
      var obj = {}, _ref;
      if ((options || {}).pipeOriginal) {
        obj.original = val;
      }
      obj.id = val.id[0];
      obj.title = (_ref = val.title) != undefined && _ref.length > 0 ? _ref[0]._ : void 0;
      obj.summary = (_ref = val.content[0]) != undefined && _ref.length > 0 ? _ref[0]._ : void 0;
      var categories = [];
      //just grab the category text
      if (val.category) {
        if (_.isArray(val.category)) {
          _.each(val.category, function (val, i) {
            categories.push(val['term']);
          });
        } else {
          categories.push(val.category);
        }
      }
      obj.category = categories;
      var link = '';
      //just get the alternate link
      if (val.link) {
        if (_.isArray(val.link)) {
          _.each(val.link, function (val, i) {
            if (val.rel === 'self') {
              link = val.href;
            }
          });
        } else {
          link = val.link.href;
        }
      }
      obj.link = link;
      //since we are going to format the date, we want to make sure it exists
      if (val.published) {
        //lets try basis js date parsing for now
        obj.published_at = Date.parse(val.published[0]);
        obj.time_ago = DateHelper.time_ago_in_words(obj.published_at);
      }
      if (val['media:content']) {
        obj.media = val.media || {};
        obj.media.content = val['media:content'];
      }
      if (val['media:thumbnail']) {
        obj.media = val.media || {};
        obj.media.thumbnail = val['media:thumbnail'];
      }
      //now push the obj onto the stack
      output.items.push(obj);
    });
  }
  return output;
}