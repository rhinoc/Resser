const app = getApp()

Page({
  data: {
    username: '',
    avatar: ''
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
  }


})