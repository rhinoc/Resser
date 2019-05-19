// 导入rss源数据
const openid = wx.getStorageSync('openid');
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/wx.js');
var rssData = rss.wxData;
var rss_list = wx.getStorageSync('rss_list') || [];
var rssed = new Array();
var button = new Array();
var query = '';
var pick = '';
var base = '';
var favicon = '';
var rssUrl = '';
var name ='';
var picker = '';
var id = 0;
const pickers = {
  '微信公众号': ['瓦斯', '传送门'],
  '知乎': ['专栏', '用户回答'],
  '贴吧': ['帖子列表', '精品帖'],
  'B站': ['UP主专栏', 'UP主投稿', '分区视频', '话题'],
  '微博': ['博主', '关键词', '超话']
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'在「瓦斯阅读」搜索公众号, 输入网址后缀id',
    pickers: [
      {
        values: Object.keys(pickers),
        className: 'column1',
      },
      {
        values: pickers['微信公众号'],
        className: 'column2',
      }
    ],
    rssData: rss.wxData, // rss源数据
    rssItemData: {}, // 当前选中的源数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    picker = this.selectComponent('#myPicker');
    id = parseInt(options.id);
  },

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    const arr = ["微信公众号", "知乎", "贴吧", "B站", "微博"];
    var index = [id, 0]
    if (id < 5 ) {
      picker.setColumnValues(1, pickers[arr[id]]);
      picker.setIndexes(index);
      this.setPlaceholder();
    }
  },

  onTap: function (event) {
    var idx = event.currentTarget.dataset.cate;
    var id = event.currentTarget.dataset.item;
    var sourceItem = rssData[idx].items[id];
    sourceItem = JSON.stringify(sourceItem);
    sourceItem = encodeURIComponent(sourceItem);
    var url = '../discover/more?&sourceItem=' + sourceItem;
    wx.navigateTo({
      url
    });
  },
  
  setPlaceholder: function(){
    pick = picker.getValues();
    switch (pick[1]) {
      case "瓦斯":
        base = 'https://rsshub.app/wechat/wasi/'
        this.setData({ placeholder: '在「瓦斯阅读」搜索公众号, 输入网址后缀id' })
        break;
      case "传送门":
        base = 'https://rsshub.app/wechat/csm/'
        this.setData({ placeholder: '在「传送门」搜索公众号, 输入网址后缀id' })
        break;
      case "UP主专栏":
        base = 'https://rsshub.app/bilibili/user/article/'
        this.setData({ placeholder: '输入UP主UID（UP主主页网址后缀）' })
        break;
      case "UP主投稿":
        base = 'https://rsshub.app/bilibili/user/video/'
        this.setData({ placeholder: '输入UP主UID（UP主主页网址后缀）' })
        break;
      case "分区视频":
        base = 'https://rsshub.app/bilibili/partion/'
        this.setData({ placeholder: '输入分区id' })
        break;
      case "话题":
        base = 'https://rsshub.app/bilibili/topic/'
        this.setData({ placeholder: '输入话题名称' })
        break;
      case "博主":
        favicon = 'http://tp3.sinaimg.cn/ffaavvicon/50/1257422142/1'
        base = 'https://rsshub.app/weibo/user/'
        this.setData({ placeholder: '输入博主UID（如何获取UID请查看帮助）' })
        break;
      case "关键词":
        base = 'https://rsshub.app/weibo/keyword/'
        this.setData({ placeholder: '输入你想订阅的关键词' })
        break;
      case "超话":
        base = 'https://rsshub.app/weibo/super_index/'
        this.setData({ placeholder: '输入超话id' })
        break;
      case "专栏":
        base = 'https://rsshub.app/zhihu/zhuanlan/'
        this.setData({ placeholder: '输入专栏id（专栏页网址后缀）' })
        break;
      case "用户回答":
        base = 'https://rsshub.app/zhihu/people/answers/'
        this.setData({ placeholder: '输入用户id（用户主页网址后缀）' })
        break;
      case "帖子列表":
        base = 'https://rsshub.app/tieba/forum/'
        this.setData({ placeholder: '输入贴吧名称' })
        break;
      case "精品帖":
        base = 'https://rsshub.app/tieba/forum/good/'
        this.setData({ placeholder: '输入贴吧名称' })
        break;
    }
  },

  onPicker: function (event){
    const value = event.detail.value;
    picker.setColumnValues(1, pickers[value[0]]);
    this.setPlaceholder();
  },

  onChange: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.cate;
    var id = event.currentTarget.dataset.item;

    var sourceItem = rssData[idx].items[id];
    if (sourceItem.rssed == 0) {
      rss_list.push(sourceItem)
    } else {
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == sourceItem.rssUrl) rss_list.splice(i, 1);
        console.log('删除');
      }
    }
    rssData[idx].items[id].rssed = 1 - rssData[idx].items[id].rssed;

    this.setData({
      rssData
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
      fail: err => { }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    rss_list = wx.getStorageSync('rss_list') || [];
    if (rss_list.length > 0) {
      for (var i in rssData) {
        for (var j in rssData[i].items) {
          rssData[i].items[j].rssed = 0;
          if (rss_list.find(function (x) {
            return x.rssUrl == rssData[i].items[j].rssUrl;
          })) {
            rssData[i].items[j].rssed = 1;
          } else {
            rssData[i].items[j].rssed = 0;
          }
        }
      }
    }
    else {
      for (var i in rssData)
        for (var j in rssData[i].items)
          rssData[i].items[j].rssed = 0;
    }
    this.setData({
      rssData,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  onHelp(e) {
    wx.navigateTo({
      url: '../about/help',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  onName(e) {
    name = e.detail.detail.value;
  },

  onRss(e) {
    query = e.detail.detail.value;
    rssUrl = base + query;
  },

  onSubmit(e) {  
    let that = this;
    console.log(name,rssUrl);
    if (name == '' || rssUrl == '') {
      wx.lin.showMessage({
        content: '名称和参数不能为空',
        type: 'warning'
      })
    }
    else {
      var index = -1;
      for (var i in rss_list) {
        if (rss_list[i].rssUrl == rssUrl) {
          index = i;
        }
      }
      if (index == -1) {
        var rssItemData = {
          favicon: favicon,
          title: name,
          link: '',
          description: '',
          rssUrl: rssUrl,
          type: 'rss',
          tag: [],
        };
        rss_list.push(rssItemData);
        wx.lin.showMessage({
          content: '添加成功',
          type: 'success'
        })
      }
      else {
        wx.lin.showMessage({
          content: '你已经订阅过这个源了',
          type: 'warning'
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
  }

})