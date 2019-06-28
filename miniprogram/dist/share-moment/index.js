getApp();

var t, e, a = require("../../utils/stringUtil.js");

Component({
    properties: {
        avatar: {
            type: String,
            value: null
        },
        nickname: {
            type: String,
            value: null
        },
        showShareModel: {
            type: Boolean,
            value: !1,
            observer: "_propertyChange"
        }
    },
    data: {
        detailStr: {
            tip: "我的阅历报告",
            content: "在阅见，阅你所悦",
            contentOther: "网站媒体、公众号、UP主、博主……",
            bpbMini: "",
            clickToMini: ""
        },
        canvasHeight: 0,
        imageWidth: 0,
        imageHeight: 0,
        targetSharePath: null,
        QRPath: "../../images/qr.png",
        avatarPath: null,
        realShow: !1
    },
    ready: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(i) {
                t = i.windowWidth, e = 1.3 * i.windowWidth, a.setData({
                    canvasHeight: e,
                    imageWidth: .7 * t,
                    imageHeight: .7 * e
                });
            }
        });
    },
    methods: {
        _propertyChange: function(t, e) {
            t && (this.data.targetSharePath ? this.setData({
                realShow: !0
            }) : this.shareMoments());
        },
        shareMoments: function() {
            this.data.targetSharePath ? this.setData({
                showShareModel: !0
            }) : (this.showLoading(), this.downloadAvatar());
        },
        showErrorModel: function(t) {
            this.hideLoading(), t || (t = "网络错误"), wx.showModal({
                title: "提示",
                content: t
            }), this.setData({
                showShareModel: !1
            });
        },
        showLoading: function() {
            wx.showLoading({
                title: "卖力绘制中..."
            });
        },
        hideLoading: function() {
            wx.hideLoading();
        },
        downloadAvatar: function() {
            var t = this;
            wx.downloadFile({
                url: t.data.avatar,
                success: function(e) {
                    t.setData({
                        avatarPath: e.tempFilePath
                    }), t.drawImage();
                },
                fail: function() {
                    t.showErrorModel();
                }
            });
        },
        drawImage: function() {
            var i = this, n = wx.createCanvasContext("myCanvas", this);
            n.setFillStyle("#FFFFFF"), n.fillRect(0, 0, t, e), n.drawImage("../../images/share-bg.png", 0, 0, t, .5 * e), 
            n.arc(t / 2, .15 * t + .117 * e, .15 * t + 4, 0, 2 * Math.PI), n.setFillStyle("#FFFFFF"), 
            n.fill(), n.save(), n.beginPath(), n.arc(t / 2, .15 * t + .117 * e, .15 * t, 0, 2 * Math.PI), 
            n.setStrokeStyle("#FFFFFF"), n.stroke(), n.clip();
            var o = .3 * t;
            n.drawImage(i.data.avatarPath, .35 * t, .117 * e, o, o), n.restore(), n.setFillStyle("#333333"), 
            n.setFontSize(24), n.setTextAlign("center"), n.fillText(i.data.detailStr.content, t / 2, .615 * e), 
            n.setFillStyle("#333333"), n.setFontSize(18), n.setTextAlign("\ncenter"), n.fillText(i.data.detailStr.contentOther, t / 2, (.67 + .03) * e), 
            n.drawImage(i.data.QRPath, 0, .77 * e, 1.05 * t, .3 * t), i.setFontStyle(n, "bold"), 
            n.setFillStyle("#FFFFFF"), n.setFontSize(20), n.setTextAlign("center"), n.fillText(a.substringStr(i.data.nickname), t / 2, .41 * e), 
            n.setFillStyle("#fff"), n.setFontSize(17), n.setTextAlign("center"), n.fillText("科技党", .47 * t, .075 * e), 
            n.fillText("涉猎广泛", .15 * t, .15 * e), n.fillText("夜读星人", .815 * t, .15 * e), n.fillText("日读百篇", .82 * t, .335 * e), 
            n.fillText("孜孜不倦", .18 * t, .334 * e), n.fillText(i.data.detailStr.bpbMini, t / 2, .93 * e), 
            n.draw(!1, function() {
                console.log("callback---------------\x3e"), i.saveCanvasImage();
            });
        },
        setFontStyle: function(t, e) {
            wx.canIUse("canvasContext.font") && (t.font = "normal " + e + " 14px sans-serif");
        },
        saveCanvasImage: function() {
            var t = this;
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(e) {
                    console.log(e.tempFilePath), t.setData({
                        targetSharePath: e.tempFilePath,
                        realShow: !0
                    });
                },
                complete: function() {
                    t.hideLoading();
                }
            }, this);
        },
        saveImageTap: function() {
            this.requestAlbumScope();
        },
        requestAlbumScope: function() {
            var t = this;
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.writePhotosAlbum"] ? t.saveImageToPhotosAlbum() : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function(e) {
                            t.saveImageToPhotosAlbum();
                        },
                        fail: function() {
                            wx.showModal({
                                title: "提示",
                                content: "你需要授权才能保存图片到相册",
                                success: function(e) {
                                    e.confirm && wx.openSetting({
                                        success: function(e) {
                                            e.authSetting["scope.writePhotosAlbum"] && t.saveImageToPhotosAlbum();
                                        },
                                        fail: function() {}
                                    });
                                }
                            });
                        }
                    });
                }
            });
        },
        saveImageToPhotosAlbum: function() {
            var t = this;
            wx.saveImageToPhotosAlbum({
                filePath: t.data.targetSharePath,
                success: function() {
                    wx.showModal({
                        title: "",
                        content: "✌️图片保存成功，\n快去分享到朋友圈吧",
                        showCancel: !1
                    }), t.hideDialog();
                }
            });
        },
        closeModel: function() {
            this.hideDialog();
        },
        hideDialog: function() {
            this.setData({
                realShow: !1,
                showShareModel: !1
            });
        }
    }
});