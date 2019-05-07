Page({
  data: {
    projectAddress: 'https://github.com/',
    github: 'https://github.com/rhinoc',
    email: 'rhinoc@outlook.com',
    qq: '914161518',
  },
  copy(e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success() {
        wx.showToast({
          title: '链接已复制',
          duration: 2000,
        })
      },
    })
  },
})