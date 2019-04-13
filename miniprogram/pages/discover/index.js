// 导入rss源数据
const rss = require('../../data/rss.js');
const db = wx.cloud.database();
const _=db.command;
// pages/rsscenter/rsscenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rssData: rss.rssData || [], // rss源数据
    rssDataComputed: [], // 添加已关注标志后的rss数据
    // showPopup: false, // 控制简介弹框显隐
    rssItemData: {}, // 当前选中的源数据             
    inputValue: '', //搜索框内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 数据处理
    console.log(rss);
    this.handleRssedData();
  },

  // 简介弹框显隐开关
  togglePopup: function() {
    this.setData({
      showPopup: !this.data.showPopup
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
  },

  // 对比源数据和缓存中已关注数据，添加已关注标志后的rss数据
  handleRssedData: function(data) {
    const rssData = data || this.data.rssData;
    const rssedData = wx.getStorageSync('rssedData') || [];
    const rssedTitleArr = rssedData.map((item) => item.title);
    const rssDataComputed = rssData.map((item) => {
      if (rssedTitleArr.indexOf(item.title) > -1) {
        return {
          ...item,
          rssed: true,
        };
      }
      return item;
    });

    // console.log(rssDataComputed)
    this.setData({
      rssDataComputed,
    });
  },


  // 添加rss，更新缓存并重载至已关注页
  handleRssAdd: function(event) {
    var that = this;
    let openid = wx.getStorageSync('openid');
    const rssItemData = event.currentTarget.dataset.rssItemData;
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
        console.log('found',res);
        var getid = res.data["0"]._id;
        console.log('id',getid);
        db.collection('user').doc(getid).update({
          // data 传入需要局部更新的数据
          data: {
            subscribe: _.push(rssItemData)
          },
          success(res) {
            console.log(res.data)
          }
        })
      },
      fail: err => {}
    })
  }
})