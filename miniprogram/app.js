//app.js
require('./utils/v-request.js');
const Towxml = require('/towxml/main'); 
App({
  onLaunch: function () {
    //初始化云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
    else {
      wx.cloud.init({
        traceUser: true, //设置用户信息追踪
      })
    }
  },
  towxml: new Towxml()
})