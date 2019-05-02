// 导入rss源数据
const db = wx.cloud.database();
const _ = db.command;
const rss = require('../../data/rss.js');
const rss_list = wx.getStorageSync('rss_list');
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rssData: rss.rssData || [], // rss源数据
    // rssDataComputed: [], // 添加已关注标志后的rss数据
    // showPopup: false, // 控制简介弹框显隐
    rssItemData: {}, // 当前选中的源数据             
    inputValue: '', //搜索框内容
    rssedData: [], //已订阅
    rssText: '',
    rssed:[],
  },


  /**
   * 从缓存读取数据，初始化数据
   */
  initList: function() {

    // const rssedData = wx.getStorageSync('rssedData') || null;
    // console.log(rssedData);
    // if (rssedData != null) {

    //   this.setData({
    //     rssedData,
    //   });
    // }
    // else {
    //   wx.setStorageSync('rssedData', this.data.rssedData);
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    const rssed = new Array();
    var rssData = rss.rssData;
    for (var i in rssData) {
      console.log(rssData[i]);
      if (rss_list.find(function(x) {//rssData[i].link in rss_list
          return x.link == rssData[i].link;
        })) {
        rssed[i] = 1;
      } else {
        rssed[i] = 0;
      }
    }
    // for(var i in rssData){
    //   if(rssData[i]==0){
    //     this.setData({
    //       rssText: '未订阅'
    //     })
    //   }
    //   else{
    //     this.setData({
    //       rssText: '已订阅'
    //     })
    //   }
    // }
    this.setData({rssed});
    console.log(rssed);
    // 数据处理
    // this.handleRssedData();
    // console.log(options);

    // var launchPage = wx.getStorageSync("launchpage")
    // if (launchPage != 0 && !options.from) {
    //   var launchPageInfo = rss.rssData[launchPage - 1]

    //   wx.navigateTo({
    //     url: `../index/index?rssUrl=${encodeURIComponent(launchPageInfo.rssUrl)}`,
    //   });
    // }

    // this.initList();
  },

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

  //   // 添加rss，更新缓存并重载至已关注页
  //   // 对比源数据和缓存中已关注数据，添加已关注标志后的rss数据
  //   handleRssedData: function (data) {
  //     const rssData = data || this.data.rssData;
  //     const rssedData = wx.getStorageSync('rssedData') || [];
  //     const rssedLink = rssedData.map((item) => item.link);
  //     const rssDataComputed = rssData.map((item) => {
  //       if (rssedLink.indexOf(item.link) == rssItemData.link) {
  //         return {
  //           ...item,
  //           rssed: true,
  //         };
  //       }
  //       return item;
  //     });

  //     // console.log(rssDataComputed)
  //     this.setData({
  //       rssDataComputed,
  //     });
  //   },
  
  handleRssAddorDelete: function(event) {
    var that = this;
    let openid = wx.getStorageSync('openid');
    var rssData = rss.rssData;
    console.log(event);
    const rssItemDataid = event.currentTarget.dataset.idx;
    const rssItemData = rssData[rssItemDataid];
    console.log('rssItemData', rssItemData);
    console.log('rssItemDataid',rssItemDataid);
    const {
      title,
      link,
      description,
      rssUrl,
      remark,
      detail
    } = rssItemData;


    db.collection('user').where({
      _openid: openid
    }).get({
      success: res => {
        console.log('found', res);
        var getid = res.data["0"]._id;
        console.log('id', getid);
 

        if (rssed[rssItemDataid] == 0) {
          this.setData(rssed[rssItemDataid]=1);
          console.log('rssed[rssItemDataid',rssed[rssItemDataid]);
          db.collection('user').doc(getid).update({
            // data传入需要局部更新的数据
            data: {
              subscribe: _.push(rssItemData)
            },
            success(res) {
              console.log(res.data)
            }
          })
         }
         else {
          this.setData(rssed[rssItemDataid]=0);
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

  //搜索框文本内容显示
  inputBind: function(event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + this.data.inputValue)

  },

  //搜索执行按钮
  query: function(event) {
    var that = this

    /**
     * 提问帖子搜索API
     * keyword string 搜索关键词 ; 这里是 this.data.inputValue
     * start int 分页起始值 ; 这里是 0
     */
    wx.request({
      url: 'https://api.uomg.com/api/get.favicon?url=' + this.data.inputValue + /0/,
      data: {
        inputValue: this.data.inputValue
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        var searchData = res.data
        that.setData({
          searchData
        })

        /**
         * 把 从get_issue_searchAPI 
         * 获取 提问帖子搜索 的数据 设置缓存
         */
        wx.setStorage({
          key: 'searchLists',
          data: {
            searchLists: res.data
          }
        })

        /**
         * 设置 模糊搜索
         */
        if (!that.data.inputValue) {
          //没有搜索词 友情提示
          wx.showToast({
            title: '请重新输入',
            image: '../../picture/tear.png',
            duration: 2000,
          })
        } else if (searchData.search.length == 0) {
          //搜索词不存在 友情提示
          wx.showToast({
            title: '关键词不存在',
            image: '../../picture/tear.png',
            duration: 2000,
          })
        } else {
          //提取题目关键字 与搜索词进行匹配
          var searchIndex = searchData.search.length
          var d = 0;
          for (var i = 0; i <= searchIndex - 1; i++) {

            var searchTitle = searchData.search[d].title
            console.log(searchTitle)
            d = d + 1;

            for (var x = 0; x <= searchTitle.length; x++) {
              for (var y = 0; y <= searchTitle.length; y++) {
                var keyWord = searchTitle.substring(x, y);
                console.log(keyWord)
              }
            }

            /**
             * 根据关键词 跳转到 search搜索页面
             */
            wx.navigateTo({
              url: '../search/search',
            })
          }
        }

      }
    })
  },


  // // 有赞输入框
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  }
})