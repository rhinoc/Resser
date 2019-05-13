const app = getApp();
Page({
  data: {
    article: {}
  },
  onLoad: function () {
    const that = this;
    wx.request({
      url: 'https://pic.rhinoc.top/resser.md',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = app.towxml.toJson(
          res.data,              
          'markdown'              
        );

        //设置文档显示主题，默认'light'
        data.theme = 'light';

        //设置数据
        that.setData({
          article: data
        });
      }
    });
  },

  //复制页面中链接
  __bind_tap: function (e) {
    let element = e.target.dataset._el;
    console.log(e);
    if (element.tag == "navigator") {
      var href = element.attr.href;
      wx.setClipboardData({
        data: href,
        success: function (res) {
          wx.showToast({
            title: '链接已复制',
            duration: 1500,
          })
        }
      })
    }
    else if (element.tag == "image") {
      wx.previewImage({
        current: element.attr.src,
        urls: [element.attr.src],
      })
    }
    else if (element.attr.class == "h2w__code") {
      var text = element.child["0"].text;
      wx.setClipboardData({
        data: text,
        success: function (res) {
          wx.showToast({
            title: '内容已复制',
            duration: 1500,
          })
        }
      })
    }
  },
})