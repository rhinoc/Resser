// 导入rss源数据
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
var rss_list = wx.getStorageSync('rss_list');
var rssUrl = '';
var tag = [];
var name = '';
var description = ''
const openid = wx.getStorageSync('openid');
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: '',
    name: '',
    tagstr: '',
    rssUrl: '',
    show: false,
    rss_list: wx.getStorageSync('rss_list'),
  },


  /**
   * 从缓存读取数据，初始化数据
   */
  initList: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  onShow: function(options){
    rss_list = wx.getStorageSync('rss_list');
    this.setData({ rss_list })
  },

  onDel(e) {
    const that = this;
    var id = e.currentTarget.dataset.id;
    var rssItemData = rss_list[id];
    for (var i in rss_list) {
      if (rss_list[i].rssUrl == rssItemData.rssUrl) rss_list.splice(i, 1);
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
            console.log(rss_list);
            wx.setStorageSync('rss_list', rss_list);
            that.setData({rss_list})
          }
        })
      }
    })
  },

  onEdit(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var rssItemData = rss_list[id];
    name = rssItemData.title;
    rssUrl = rssItemData.rssUrl;
    tag = rssItemData.tag;
    description = rssItemData.description;
    var str = tag.join(' ');
    this.setData({
      name,
      rssUrl,
      description,
      tagstr: str,
      show: true
    })
  },
  onAdd(e){
    this.setData({
      show:true
    })
  },
  onName(e) {
    name = e.detail.detail.value;
  },
  onRss(e) {
    rssUrl = e.detail.detail.value;
  },
  onTag(e) {
    var str = e.detail.detail.value;
    tag = str.split(' ');
  },
  onDes(e) {
    description = e.detail.detail.value;
  },
  onCancel(e) {
    this.setData({
      show: false
    })
  },


  onSubmit(e) {
    let that = this;
    if (name==''||rssUrl=='')
    {
      wx.lin.showMessage({
        content: '名称和地址不能为空',
        type: 'warning'
      })
    }
    else{
      var index = -1;
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == rssUrl) {
          index = i;
        }
      }
      if (index == -1) {
        var rssItemData = {
          favicon: 'https://cdn.staticaly.com/favicons/' + rssUrl,
          title: name,
          link: '',
          description: description,
          rssUrl: rssUrl,
          type: 'rss',
          tag: tag,
        };
        rss_list.push(rssItemData);
        wx.lin.showMessage({
          content: '添加成功',
          type: 'success'
        })
      }
      else {
        var rssItemData = rss_list[index];
        rssItemData.title = name;
        rssItemData.rssUrl = rssUrl;
        rssItemData.tag = tag;
        rss_list.splice(index, 1);
        rss_list.push(rssItemData);
        wx.lin.showMessage({
          content: '保存成功',
          type: 'success'
        })
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
              that.setData({
                rss_list,
                show: false,
              })
              wx.setStorageSync('rss_list', rss_list)
            }
          })
        }
      })
    }
  },
})