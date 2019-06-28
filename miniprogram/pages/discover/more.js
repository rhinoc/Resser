var e = wx.cloud.database(), t = (e.command, wx.getStorageSync("openid")), l = wx.getStorageSync("rss_list") || [], r = require("../../utils/xml2json.js"), a = require("../../utils/util.js"), i = require("../../utils/utils-days.js"), o = wx.getStorageSync("history") || [], n = new Array(), c = [];

Page({
  data: {
    sourceItem: [],
    rss_pool: []
  },
  onLoad: function (e) {
    console.log(e), c = e.sourceItem, c = decodeURIComponent(c), c = JSON.parse(c),
      this.setData({
        sourceItem: c
      }), this.getRss(c.rssUrl);
  },
  onShow: function () {
    l = wx.getStorageSync("rss_list");
  },
  onChange: function (r) {
    if (0 == c.rssed) l.push(c); else for (var a in l) l[a].rssUrl == c.rssUrl && l.splice(a, 1),
      console.log("删除");
    c.rssed = 1 - c.rssed, this.setData({
      sourceItem: c
    }), e.collection("user").where({
      _openid: t
    }).get({
      success: function (t) {
        var r = t.data[0]._id;
        e.collection("user").doc(r).update({
          data: {
            subscribe: l
          },
          success: function (e) {
            console.log("成功修改云数据库"), wx.setStorageSync("rss_list", l), this.onload();
          }
        });
      },
      fail: function (e) { }
    });
  },
  handleItemTap: function (e) {
    var t = e.currentTarget.dataset.id, l = this.data.rss_pool[t];
    -1 == o.indexOf(l.link) && o.push(l.link), wx.setStorageSync("history", o), l = JSON.stringify(l),
      l = encodeURIComponent(l), wx.navigateTo({
        url: "../global/article?rssData=" + l
      });
  },
  rssDecode: function (e) {
    if (null == e) return "";
    if (0 == e.length) return "";
    return e.replace(/&amp;/g, "&").replace(/<![\s\S]*?>/g, ""), e.replace(/&amp;/g, "&").replace(/<font color="red">订阅指南.*\n.*/g, "").replace(/<script>[\s\S]*?googletag[\s\S]*?>/g, "").replace(/<div>获取更多RSS[\s\S]*?<\/div>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*<\/script>/g, "").replace(/&nbsp;/g, " ").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&#123;/g, "{").replace(/&#125;/g, "}").replace(/&#124;/g, "|").replace(/&#126;/g, "~").replace(/<!--[\s\S]*?-->/g, "").replace(/<script.*?>window.daily.*?]]>/g, "").replace(/<img.*?c.statcounter.*?>/g, "").replace(/<img.*?google-analytics.*?>/g, "").replace(/<img.*?hm.baidu.*?>/g, "").replace(/<\?xml-stylesheet[\s\S]*?>/g, "");
  },
  thenDecode: function (e) {
    var t = e.feed || e.rss.channel;
    if ("item" in t) var l = t.item; else l = t.entry;
    if (Array.isArray(l)) for (var r = 0; r < (t.item || t.entry).length; r++) {
      if (l = (t.item || t.entry)[r], (o = {}).link = (l.link || l.id).text || l.link.href,
        o.author = "", o.title = l.title.text, null != o.title && 0 != o.title.length) {
        o.title = o.title.replace(/&lt;/g, "<"), o.title = o.title.replace(/&gt;/g, ">"),
          o.title = o.title.replace(/&ldquo;/g, "“"), o.title = o.title.replace(/&rdquo;/g, "”"),
          o.title = o.title.replace(/&mdash;/g, "—"), o.title = o.title.replace(/&ndash;/g, "–"),
          o.article = "content:encoded" in l ? l["content:encoded"].text : "content" in l ? l.content.text : "description" in l ? l.description.p || l.description.text : "summary" in l ? l.summary.text : "";
        try {
          o.source = c.title, o.pubTime = (l.pubDate || l.published || l.updated).text || "",
            o.oriTime = o.pubTime ? a.formatDate("yyyy-MM-dd HH:mm", o.pubTime) : "", o.pubTime = i.formatTime(o.oriTime);
        } catch (e) {
          o.pubTime = "";
        }
        "dc:creator" in l ? o.author = l["dc:creator"].text : "author" in l ? o.author = l.author.text || l.author.name.text : "author" in t && (o.author = t.author.text || t.author.name.text),
          o.article && (o.text = o.article.replace(/<[\s\S]*?>/g, "")), (n.length < 1 || o.title != n[n.length - 1].title) && n.push(o);
      }
    } else {
      var o;
      (o = {}).link = (l.link || l.id).text || l.link.href, o.author = "", o.title = l.title.text,
        0 != o.title.length && null != o.title && (o.title = o.title.replace(/&lt;/g, "<"),
          o.title = o.title.replace(/&gt;/g, ">"), o.title = o.title.replace(/&ldquo;/g, "“"),
          o.title = o.title.replace(/&rdquo;/g, "”"), o.title = o.title.replace(/&mdash;/g, "—"),
          o.title = o.title.replace(/&ndash;/g, "–")), o.article = "content:encoded" in l ? l["content:encoded"].text : "content" in l ? l.content.text : "description" in l ? l.description.p || l.description.text : "summary" in l ? l.summary.text : "";
      try {
        o.source = c.title, o.pubTime = (l.pubDate || l.published || l.updated).text || "",
          o.oriTime = o.pubTime ? a.formatDate("yyyy-MM-dd HH:mm", o.pubTime) : "", o.pubTime = i.formatTime(o.oriTime);
      } catch (e) {
        o.pubTime = "";
      }
      "dc:creator" in l ? o.author = l["dc:creator"].text : "author" in l ? o.author = l.author.text || l.author.name : "author" in t && (o.author = t.author.name.text),
        o.article && (o.text = o.article.replace(/<[\s\S]*?>/g, "")), (n.length < 1 || o.title != n[n.length - 1].title) && n.push(o);
    }
  },
  getRss: function (e) {
    var t = this;
    n = new Array(), wx.request({
      url: e,
      data: {},
      header: {
        "Content-Type": "application/xml",
        Accept: "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
      },
      success: function (e) {
        console.log(e);
        var l = t.rssDecode(e.data);
        try {
          console.log("采用解码输出"), l = r(l);
        } catch (t) {
          console.log("采用原始输出"), l = r(e.data);
        }
        n = t.data.rss_pool, console.log(l), t.thenDecode(l), t.setData({
          rss_pool: n
        });
      },
      fail: function (l) {
        console.log("采用v-request"), wx.vrequest({
          url: e,
          data: {},
          header: {
            "Content-Type": "application/xml",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml; q=0.9,image/webp,*/*;q=0.8"
          },
          success: function (e) {
            console.log(e);
            var l = t.rssDecode(e.body);
            try {
              console.log("采用解码输出"), l = r(l);
            } catch (t) {
              console.log("采用原始输出"), l = r(e.body);
            }
            n = t.data.rss_pool, console.log(l), t.thenDecode(l), t.setData({
              rss_pool: n
            });
          }
        });
      }
    });
  }
});