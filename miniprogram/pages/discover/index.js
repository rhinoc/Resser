// 导入rss源数据
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
var rss_list = wx.getStorageSync('rss_list');
var rssData = rss.rssData;
var query = '';
var matched = [];
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matched: [],
    rssData: rss.rssData || [], // rss源数据
    rssItemData: {}, // 当前选中的源数据             
    rssedData: [], //已订阅
    rssed: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    const rssed = new Array();
    for (var i in rssData) {
      // console.log(rssData[i]);
      matched[i] =1;
      if (rss_list.find(function(x) {
          return x.link == rssData[i].link;
        })) {
        rssed[i] = 1;
      } else {
        rssed[i] = 0;
      }
    }
    this.setData({
      rssed,
      matched
    });
    // console.log(rssed);
  },
  handleSearch: function(event) {
    query = event.detail.detail.value;
    if (query != ''){
      for (var i in rssData){
        var str = (rssData[i].title) + (rssData[i].tag) + (rssData[i].rssUrl) + (rssData[i].link) + (rssData[i].description);
        str = str.replace(/,/g, '');
        if (str.match(query)){
          matched[i] = 1;
        }
        else matched[i] = 0;
      }
    }
    else{
      for (var i in rssData) matched[i]=1;
    }
    
  
    this.setData({
      matched
    });
    // console.log(query);
  },

  handleRssAddorDelete: function(event) {
    var that = this;
    let openid = wx.getStorageSync('openid');
    var rssData = rss.rssData;
    console.log(event);
    const rssItemDataid = event.currentTarget.dataset.idx;
    const rssItemData = rssData[rssItemDataid];


    db.collection('user').where({
      _openid: openid
    }).get({
      success: res => {
        console.log('found', res);
        var getid = res.data["0"]._id;

        if (rssed[rssItemDataid] == 0) {
          this.setData(rssed[rssItemDataid] = 1);
          console.log('rssed[rssItemDataid', rssed[rssItemDataid]);
          db.collection('user').doc(getid).update({
            // data传入需要局部更新的数据
            data: {
              subscribe: _.push(rssItemData)
            },
            success(res) {
              console.log(res.data)
            }
          })
        } else {
          this.setData(rssed[rssItemDataid] = 0);
          db.collection('user').doc(getid).update({
            // data传入需要局部更新的数据
            data: {
              subscribe: _.pop(rssItemData)
            },
            success(res) {
              console.log(res.data)
            }
          })
        }
      },
      fail: err => {}
    })
  },

  //跳转到我的订阅
  changetorssed: function(event) {
    wx.navigateTo({
      url: '../rssed/index',
    });
  },

})
/**
 * 点击源，跳转至源内容列表页
 */
// handleRssItemTap: function (event) {
//   const rssItemData = event.currentTarget.dataset.rssItemData;
//   const { title, favicon, rssUrl, detail } = rssItemData;
//   console.log(rssItemData);

// 关闭取消关注-删除模式
//   this.handleRssItemHideDelete();

//   wx.navigateTo({
//     url: `../index/index?rssUrl=${encodeURIComponent(rssUrl)}`,
//   });
// },

// /**
//  * 点击添加，跳转到源中心页
//  */
// handleRssAdd: function (event) {
//   wx.navigateTo({
//     url: '../rsscenter/rsscenter',
//   });
// },

/**
 * 启用rss删除模式
 */
// handleRssItemShowDelete: function (event) {
//   const rssId = event.currentTarget.dataset.rssId;

//   if (typeof (rssId) !== 'number') {
//     return;
//   }

//    console.log('delete rssId: ', rssId);

//   this.setData({
//     curSelectId: rssId,
//   });
// },

/**
 * 关闭删除模式
 */
// handleRssItemHideDelete: function () {
//   this.setData({
//     curSelectId: '',
//   });
// },

/**
 * 取消关注某个rss，并更新storage
 */
//   handleRssItemDelete: function (event) {
//     const rssId = event.currentTarget.dataset.rssId;

//     if (typeof (rssId) !== 'number') {
//       return;
//     }

//     const rssedData = wx.getStorageSync('rssedData') || [];
//     rssedData.splice(rssId, 1);

//     this.setData({
//       rssedData,
//       curSelectId: '',
//     });

//     wx.setStorageSync('rssedData', rssedData);
//   }

//   /**
//    * 点击跳转至更多页
//    */

// })