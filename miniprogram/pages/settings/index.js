const xml2json = require('../../utils/xml2json.js');
const openid = wx.getStorageSync('openid');
var rss_list = wx.getStorageSync("rss_list") || [];
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    opml: ""
  },

  onShow: function(options) {
    var rss_list = wx.getStorageSync("rss_list")
    var opml = '<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n';
    opml += '<head><title>resser.opml</title></head>\n'
    opml += '<body>\n'
    if (rss_list != "") {
      rss_list.forEach(function(val, key) {
        opml += '<outline type="rss" text="' + val.title + '" xmlUrl="' + val.rssUrl + '"/>\n'
      })
    }
    opml += '</body>'
    this.setData({
      opml
    })
  },

  onCopyOPML: function() {
    wx.setClipboardData({
      data: this.data.opml
    })
  },

  onImportOPML: function(e) {
    var opml = e.detail.value.opml;
    var json = xml2json(opml);
    var count = 0;
    var valid = 0;

    if (!json.opml) {
      wx.showToast({
        title: '请输入OPML格式',
        icon: 'none',
        duration: 2000
      })
    } else if (!json.opml.body) {
      wx.showToast({
        title: '缺少<body>元素',
        icon: 'none',
        duration: 2000
      })
    } else if (!json.opml.body.outline) {
      wx.showToast({
        title: '缺少<outline>元素',
        icon: 'none',
        duration: 2000
      })
    } else {
      var lines = json.opml.body.outline;
      if (lines.type) lines = [lines];
      count = lines.length;
      lines.forEach(function(val, key) {
        if (val.text && val.xmlUrl) {
          var rssed = false;
          for (var rssItem of rss_list) {
            // console.log(rssItem.rssUrl, val.xmlUrl)
            if (rssItem.rssUrl == val.xmlUrl) {
              rssed = true;
              break;
            }
          }
          if (!rssed) {
            valid += 1;
            console.log(val.xmlUrl)
            rss_list.push({
              title: val.text || val.title,
              rssUrl: val.xmlUrl,
              description: val.description || '',
              favicon: "cloud://v-request-b2e31a.762d-v-request-b2e31a/favicons/rss.png",
              link: val.htmlUrl || '',
              tag: [],
              rssed: 1,
            })
          }
        }
      })

      if (valid == 0) {
        wx.lin.showMessage({
          type: 'warning',
          content: `订阅已存在`,
          duration: 3000,
        })

        return
      }

      if (valid != 0) {
        wx.lin.showMessage({
          type: 'success',
          content: `正在导入${valid}个订阅，请稍等`,
          duration: 3000,
        })
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
                wx.setStorage({
                  key: 'rss_list',
                  data: rss_list,
                  success: function(e) {
                    wx.lin.showMessage({
                      type: 'success',
                      content: `导入成功，已导入${valid}个订阅`,
                      duration: 1000,
                    })
                  }
                })
              }
            })
          },
          fail: err => {}
        })
      }
    }
  },

  onInputToken: function(e){
    if (e.detail.detail.value.length){
      wx.setStorage({
        key: 'token',
        data: e.detail.detail.value,
        success: (res) => {
          wx.lin.showMessage({
            type: 'success',
            content: `Token设置成功`,
            duration: 1000,
          })
        }
      })
    }
    else {
      wx.removeStorage({
        key: 'token',
        success: function (res) { },
      })
    } 
  },

  onClear: function() {
    wx.removeStorage({
      key: 'rss_list',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'rss_pool',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'history',
      success: function(res) {},
    })
  },

  onClearAll: function() {
    wx.lin.showDialog({
      type: "confirm",
      title: "确认清空所有缓存吗",
      content: "这将会清空收藏集和稍后阅读",
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage();
        } else if (res.cancel) {}
      }
    })
  }

})