const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    username: '',
    avatar: '/images/default.png',
  },

  onShow: function() {
  },

  onLoad: function() {
    this.getOpenId();
    let username = wx.getStorageSync('username'),
      avatar = wx.getStorageSync('avatar');
    if (username) {
      this.setData({ username })
      this.setData({ avatar })
    }
  },

  getOpenId(){
    let that = this;
    wx.cloud.callFunction({
      name:'getOpenId',
      complete: res => {
        wx.setStorageSync('openid', res.result)
      }
    })
  },
  getUserInfoHandler: function(e) {
    console.log(e)
    let d = e.detail.userInfo
    this.setData({
      avatar: d.avatarUrl,
      username: d.nickName
    })
    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync('avatar', d.avatarUrl)
    let openid = wx.getStorageSync('openid');
    db.collection('user').where({
      _openid:openid
    }).get({
      success: res => {
        console.log(openid);
        console.log('查询用户:', res)
        if (res.data && res.data.length > 0) {
          console.log('用户已存在')
        } else {
          setTimeout(() => {
            db.collection('user').add({
              data: {
                subscribe: []
              },
              success: function() {
                console.log('新建用户成功')
              },
              fail: function(e) {
                console.error('用户id新增失败',e);
              }
            })
          }, 100)
        }
      },
      fail: err => {}
    })
  },


})