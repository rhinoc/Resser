const app = getApp()

Page({
  data: {
    username: '',
    avatar: '/images/user.png',
  },

  onShow: function() {

  },

  onLoad: function() {
    let username = wx.getStorageSync('username'),
      avatar = wx.getStorageSync('avatar');
    if (username) {
      this.setData({ username })
      this.setData({ avatar })
    }
  },


  getUserInfoHandler: function(e) {
    // console.log(e)
    let d = e.detail.userInfo
    wx.setStorageSync('openid', d.openid);
    this.setData({//这里要setData，否则页面不会更新
      avatar: d.avatarUrl,
      username: d.nickName
    })
    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync('avatar', d.avatarUrl)

    const db = wx.cloud.database()

    db.collection('user').where({
      _openid: d.openid
    }).get({
      success: res => {
        console.log('查询用户:', res)
        if (res.data && res.data.length > 0) {
          console.log('用户已存在')
        } else {
          setTimeout(() => {
            db.collection('user').add({
              data: {
                _openid: d.openid,
                subscribe: [{
                  "title":"Dicerorhinus",
                  "link":"http://rhinoc.top/",
                  "description":"开发团队成员@rhinoc的在线博客",
                  "rssUrl":"https://rhinoc.top/atom.xml",
                  "type":"feed",
                  "favicon":"https://rhinoc.top/images/ava.png",
                  "tag":["博客","开发"]
                }]
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
  }

})