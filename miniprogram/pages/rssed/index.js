var t = wx.cloud.database(),
  s = (t.command, require("../../data/rss.js"), wx.getStorageSync("rss_list")),
  e = "",
  n = [],
  a = "",
  i = "",
  o = wx.getStorageSync("openid"),
  r = "",
  c = -1;

Page({
  data: {
    rssUrlRules: [{
      type: "url",
      required: !0,
      message: "请输入正确的网址"
    }],
    description: "",
    name: "",
    tagstr: "",
    rssUrl: "",
    show: false,
    rss_list: wx.getStorageSync("rss_list")
  },
  linvalidate: function(t) {
    console.log(t), t.detail.isError && wx.lin.showMessage({
      content: "请输入正确的网址",
      type: "warning"
    });
  },
  initList: function() {},
  onLoad: function(t) {},
  navToMore: function(t) {
    var e = t.currentTarget.dataset.id,
      n = s[e];
    n = JSON.stringify(n);
    var a = "../discover/more?&sourceItem=" + (n = encodeURIComponent(n));
    wx.navigateTo({
      url: a
    });
  },
  onShow: function(t) {
    s = wx.getStorageSync("rss_list"), this.setData({
      rss_list: s
    });
  },
  onDel: function(e) {
    var n = this,
      a = e.currentTarget.dataset.id,
      i = s[a];
    for (var r in s) s[r].rssUrl == i.rssUrl && s.splice(r, 1);
    t.collection("user").where({
      _openid: o
    }).get({
      success: function(e) {
        var a = e.data[0]._id;
        t.collection("user").doc(a).update({
          data: {
            subscribe: s
          },
          success: function(t) {
            console.log(s), wx.setStorageSync("rss_list", s), n.setData({
              rss_list: s
            });
          }
        });
      }
    });
  },
  onEdit: function(t) {
    console.log(t), c = t.currentTarget.dataset.id, r = t.target.dataset.type;
    var o = s[c];
    a = o.title, e = o.rssUrl, n = o.tag, i = o.description;
    var l = n.join(" ");
    this.setData({
      name: a,
      rssUrl: e,
      description: i,
      tagstr: l,
      show: true,
    });
  },
  onAdd: function(t) {
    this.setData({
      show: true
    });
  },
  onHelp: function(t) {
    wx.navigateTo({
      url: "../about/help"
    });
  },
  onName: function(t) {
    a = t.detail.detail.value;
  },
  onRss: function(t) {
    e = t.detail.detail.value;
  },
  onTag: function(t) {
    var s = t.detail.detail.value;
    n = s.split(" ");
  },
  onDes: function(t) {
    i = t.detail.detail.value;
  },
  onCancel: function(t) {
    this.setData({
      show: false,
      name: "",
      rssUrl: "",
      description: "",
      tagstr: "",
    }), r = "", c = -1;
  },
  onSubmit: function(l) {
    var u = this;
    if ("" == a || "" == e) wx.lin.showMessage({
      content: "名称和地址不能为空",
      type: "warning"
    });
    else {
      if ("edit" == r) {
        (d = s[c]).title = a, d.rssUrl = e, d.tag = n, s.splice(c, 1), s.push(d), wx.lin.showMessage({
          content: "保存成功",
          type: "success"
        }), r = "", c = -1;
      } else {
        var d = {
          favicon: "cloud://v-request-b2e31a.762d-v-request-b2e31a/favicons/rss.png",
          title: a,
          link: "",
          description: i,
          rssUrl: e,
          tag: n,
          rssed: 1
        };
        s.push(d), wx.lin.showMessage({
          content: "添加成功",
          type: "success"
        });
      }
      t.collection("user").where({
        _openid: o
      }).get({
        success: function(e) {
          var n = e.data[0]._id;
          t.collection("user").doc(n).update({
            data: {
              subscribe: s
            },
            success: function(t) {
              u.setData({
                rss_list: s,
                show: false,
              }), wx.setStorageSync("rss_list", s);
            }
          });
        }
      });
    }
  }
});