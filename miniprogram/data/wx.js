// 内置RSS源
const wxData = [

  //微信公众号
  {
    cate: "微信公众号",
    items: [
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5nbURBZYkjq2GO3z9seWGPUEJyZhickjyzdMfDBXU4ZIg/0",
        title: 'AppSo',
        description: '数字生活家，手机新娱乐',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b575d3358e5c4583338d7a1',
        type: 'wx',
        tag: ['科技'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4EOYw3p9pQDznBzXPxFSx5xwQk6LWKAkbhPhHNQNgsCw/0",
        title: '小道消息',
        description: '请不要被「小道消息」这个名字误导。在这里，我只想努力为读者朋友们呈现一幅中国互联网的清明上河图。',
        rssUrl: "https://rsshub.app/wechat/wasi/5b572b8058e5c4583338d6a8",
        type: 'wx',
        tag: ['科技', '互联网'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4dBxdrY051R5PbcYwBbCnX9xp8G6S8xMk1CzVCMZAEgA/0",
        title: '大象公会',
        description: '精神食粮',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b65d82e244d4e2c0c512d6f',
        type: 'wx',
        tag: ['阅读'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6xLSHsmQn0ic8G4pgHC54jfUw9WiajH8CctzZibLzx4MMBg/0",
        title: '差评',
        description: 'Debug the World',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b572b1f58e5c4583338d32d',
        type: 'wx',
        tag: ['科技'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6pch1TxsaUxAqlOcQ0ZNYAvxMAHIMNJoKLKGhQWg1KUA/0",
        title: '饭统戴老板',
        description: '有趣且深度的硬核财经',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b6c0f8c244d4e40858c2200',
        type: 'wx',
        tag: ['财经'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM443wzZskICEHH1NZSMKPOQDKMEib7ficmGCU7HfUQAPCcQ/0",
        title: 'warfalcon',
        description: '想每年读完100本书吗？想在100天内培养一个好习惯吗？想搞定拖延和注意力不集中吗？关注我，让你成为一个行动者，跟几十万读者一起成长，欢迎参加100天行动。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b5ddec2244d4e4dae3b1b84',
        type: 'wx',
        tag: ['效率'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6KKoAryS1XgNSrsD8icEEgrk6XQWA4syu6T2ia6xR4kVAw/0",
        title: 'caoz的梦呓',
        description: 'caoz的心得与分享，只此一家，别无分号。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b572b1c58e5c4583338d322',
        type: 'wx',
        tag: ['科技', '互联网'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5Dlw4H8vWoicXPXccEVkWYgFE1pNUvX7uaHmafPODGIEA/0",
        title: '人民日报',
        description: '参与、沟通、记录时代。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b575e1158e5c4583338ddb1',
        type: 'wx',
        tag: ['时政'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5kDibmTib4arUUDh37wF4JbBJcc193LE8IMsCLVdXOMsNA/0",
        title: '地球知识局',
        description: '人文+地理+设计=全球视野新三观',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b657727244d4e6f2a33d959',
        type: 'wx',
        tag: ['科学'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7UY4xYFHTCdmmVODuWb7XW5XL6ictlwMVPCkJe8f4Tt3w/0",
        title: 'stormzhang',
        description: '前码农&产品人，现创业者，终身学习者。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b86bf98244d4e16579cc216',
        type: 'wx',
        tag: ['科技', '互联网'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7e5erCDdwwlWzic4PAYLblRDYNOPY2jApxdeg6v1TcaAA/0",
        title: '果壳',
        description: '科学和技术，是我们和这个世界对话所用的语言。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b575dac58e5c4583338daaf',
        type: 'wx',
        tag: ['科学'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6ZgyZRj3WvD0BTVSBiaaXQCq80DGMKIR1IUNE5hwicGz2A/0",
        title: '丁香医生',
        description: '有温度、有知识、有态度。丁香医生，新一代大众健康媒体。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b5adaf358e5c4583338eace',
        type: 'wx',
        tag: ['健康'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4DibtZaKLw0xbIDNp3oa3U9VgX6u5e9B1P1ZkPkQgqOpQ/0",
        title: '笔记侠',
        description: '中国领先的新商业知识共享社区，3000多篇干货笔记，组织管理、商业模式等28个主题可精准搜索。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b657727244d4e6f2a33d959',
        type: 'wx',
        tag: ['商业'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM75UiawQgcdqOcmtYS7Jibug9J7dskxkNicGiadtdKl7mLyiaw/0",
        title: '机器之心',
        description: '专业的人工智能媒体和产业服务平台',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b575dd058e5c4583338dbd3',
        type: 'wx',
        tag: ['科技','人工智能'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM54iaLlFicK8qxhk8K33nOib1RRanor7Fe6BlGSxic5JicPQUw/0",
        title: '混子曰',
        description: '专治各种不明白',
        rssUrl: "https://rsshub.app/wechat/wasi/5b9a6604244d4e538ee8881a",
        type: 'wx',
        tag: ['时评'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4ojOCibjH5nkUR5U8fibxuqTOIxD3MgB6MIhyCvVn0SHLQ/0",
        title: '笔吧评测室',
        description: '欢迎关注笔吧评测室，我们是笔记本电脑爱好者，买电脑，战奸商，看电脑评测，都可以关注我们。',
        rssUrl: "https://rsshub.app/wechat/wasi/5b5ada9e58e5c4583338e9fe",
        type: 'wx',
        tag: ['笔记本'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4dHfT9d3ogQk5E08iadsdsGpVuYSibFwLPD8cxL1prJwKQ/0",
        title: 'MacTalk',
        description: 'MacTalk 开通于2012年末，内容起于 Mac 而不止 Mac，内容覆盖了技术、创业、产品和人文思考。文风有趣，又有一点力量。',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b643c07244d4e5022ede82d',
        type: 'wx',
        tag: ['科技', '互联网'],
      },
      {
        favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5euqqrL2X0wn01pfALMMxiab3oxiawJkAnYMVdq6CdonDQ/0",
        title: 'Sir电影',
        description: '爱电影的人，一直关注我',
        rssUrl: 'https://rsshub.app/wechat/wasi/5b572b6c58e5c4583338d5cf',
        type: 'wx',
        tag: ['电影'],
      },
    ]
  },

  //知乎
  {
    cate: "知乎",
    items: [
      {
        title: '黄继新',
        description: '知乎 联合创始人',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/jixin',
        favicon: 'https://pic1.zhimg.com/e4b6a3f950db218a447a6c9e1681b951_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '周源',
        description: '知乎 001 号员工',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/zhouyuan',
        favicon: 'https://pic2.zhimg.com/v2-d670dd980333d32225fcf5f96fbe131e_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '张小北',
        description: '电影编剧、导演',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/zhang-xiao-bei',
        favicon: 'https://pic3.zhimg.com/cab945809_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '丁香医生',
        description: '有温度、有知识、有态度，新一代大众健康科普。',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/ding-xiang-yi-sheng',
        favicon: 'https://pic1.zhimg.com/v2-fc8c90ae998dd9ae303687a19043624c_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '朱炫',
        description: '闷骚而近妖 新书《持剑者心伤》 微博：大师兄_朱炫',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/zhu-xuan-86',
        favicon: 'https://pic1.zhimg.com/v2-637b32d1d99096104a24c9cb58f53d76_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '李开复',
        description: '创新工场 董事长',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/kaifulee',
        favicon: 'https://pic1.zhimg.com/v2-39371c20333081cf7220f12d522cab7d_xll.jpg',
        tag: ['知乎'],
      },
      {
        title: '张佳玮',
        description: '公众号：张佳玮写字的地方',
        rssUrl: 'https://rsshub.app/zhihu/people/answers/zhang-jia-wei',
        favicon: 'https://pic2.zhimg.com/v2-d626957872f9b38fa594394db2d2e6e7_xll.jpg',
        tag: ['知乎'],
      },
    ]
  },

  //贴吧
  {
    cate: "贴吧",
    items: [{
      title: '李毅吧', //3175w
      description: '努力！主宰自己命运！众人皆帝！',
      rssUrl: 'https://rsshub.app/tieba/forum/李毅',
      favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/aec379310a55b319380291c141a98226cefc178e.jpg',
      tag: ['贴吧'],
    },
      {
        title: '扒皮吧', //1607w
        description: '还原虚幻真相，尽在犀利扒皮！',
        rssUrl: 'https://rsshub.app/tieba/forum/扒皮',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/83025aafa40f4bfbfd4f4d22054f78f0f736182c.jpg',
        tag: ['贴吧'],
      },
      {
        title: 'lol吧', //1273w
        description: '第一手电竞资讯/英雄攻略/尽在LOL吧',
        rssUrl: 'https://rsshub.app/tieba/forum/lol',
        favicon: 'https://imgsa.baidu.com/forum/pic/item/005aba096b63f624ea49c8708a44ebf81a4ca377.jpg',
        tag: ['贴吧'],
      },
      {
        title: '魔兽世界吧', //1163w
        description: '团结有爱，坚持不放弃，携正能量一路前行！',
        rssUrl: 'https://rsshub.app/tieba/forum/魔兽世界',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/622762d0f703918fdc00adb25c3d269758eec4f1.jpg',
        tag: ['贴吧'],
      },
      {
        title: '地下城与勇士吧', //1163w
        description: '阿拉德闲聊茶馆,休闲侃侃,一切尽在笑谈中',
        rssUrl: 'https://rsshub.app/tieba/forum/地下城与勇士',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/4e4a20a4462309f7f121424a730e0cf3d7cad618.jpg',
        tag: ['贴吧'],
      },
      {
        title: 'NBA吧', //748w
        description: '百度nba吧，一个属于篮球迷的世界。',
        rssUrl: 'https://rsshub.app/tieba/forum/nba',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/cdbf6c81800a19d8c1d796cc3bfa828ba71e4626.jpg',
        tag: ['贴吧'],
      },
      {
        title: '显卡吧', //411w
        description: '三十二维超宇宙硬件论坛',
        rssUrl: 'https://rsshub.app/tieba/forum/显卡',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/7e3e6709c93d70cf4900d35af9dcd100bba12bea.jpg',
        tag: ['贴吧'],
      },
      {
        title: '图拉丁吧', //288w
        description: '图拉丁吧，技术天堂，DIY爱好者聚集地',
        rssUrl: 'https://rsshub.app/tieba/forum/图拉丁',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/ac6eddc451da81cb02a12b515366d016082431e2.jpg',
        tag: ['贴吧'],
      },
      {
        title: '电影票房吧', //260w
        description: '票房风波起，银幕百态生！',
        rssUrl: 'https://rsshub.app/tieba/forum/电影票房',
        favicon: 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/90529822720e0cf33bb037e00346f21fbe09aa62.jpg',
        tag: ['贴吧'],
      },
    ]
  },

  //Bilibili
  {
    cate: "Bilibili",
    items: [
      {
        favicon: "http://i1.hdslb.com/bfs/face/2996e22a24eed2d7767e452627a9130207defe6a.jpg@15Q",
        title: 'LexBurner',
        description: '新浪微博：http://weibo.com/lexburner',
        rssUrl: 'https://rsshub.app/bilibili/user/video/777536',
        tag: ['动漫'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/156d5d3b3f4b66d940365b3b0e3a809e1fcc0d97.jpg@15Q",
        title: '敖厂长',
        description: '本人因身体原因已处于半退休状态，更新随缘',
        rssUrl: 'https://rsshub.app/bilibili/user/video/122879',
        tag: ['游戏'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/e45a7b248f496fad8b32d3b9cfa0335339331798.jpg@15Q",
        title: 'papi酱',
        description: '微博关注：papi酱 微信订阅：dapapi',
        rssUrl: 'https://rsshub.app/bilibili/user/video/1532165',
        tag: ['生活'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/d0dad8800774a4903547b1326d1fd927df47b4e9.jpg",
        title: '逍遥散人',
        description: '快乐 微博：weibo.com/xysanren 公众号：逍遥散人',
        rssUrl: 'https://rsshub.app/bilibili/user/video/168598',
        tag: ['游戏'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/623ccce0ab28b721edb61dd64749d91de18fb384.jpg@15Q",
        title: '渗透之C君',
        description: '微博@渗透之C菌 weibo.com/roshinichi / ins: roshinichi 谢谢你喜欢我!',
        rssUrl: 'https://rsshub.app/bilibili/user/video/4162287',
        tag: ['游戏'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/c93ff5df2cd0c0c9384b139c86d1a56a9540c9a2.jpg@15Q",
        title: '暴走漫画',
        description: '搞笑是我们的基因，不吐槽浑身难受，王尼玛和暴走家族一起承包你的笑点,订阅我们，一起玩耍吧，微博@王尼玛、暴走漫画',
        rssUrl: 'https://rsshub.app/bilibili/user/video/883968',
        tag: ['吐槽'],
      },
      {
        favicon: "http://i1.hdslb.com/bfs/face/60a9153609998b04301dc5b8ed44c41b537a2268.jpg@15Q",
        title: 'bilibili电影',
        description: '哔哩哔哩电影官方账号',
        rssUrl: 'https://rsshub.app/bilibili/user/video/15773384',
        tag: ['电影'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/efea73cc25184c18e7b4fd2250bbbaa5845a4814.jpg@15Q",
        title: '柚子木字幕组',
        description: '周边纪念品淘宝搜店铺：柚子木字幕组，合作联系QQ 2523113364',
        rssUrl: 'https://rsshub.app/bilibili/user/video/221648',
        tag: ['字幕组'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/d83e93dc9101cc0c416ca09ad33a63bdf3d26c6c.jpg@15Q",
        title: '机智的党妹',
        description: '想变成很厉害的沙雕！微博：我要这脸有何用 商业合作请联系qq：2221142014',
        rssUrl: 'https://rsshub.app/bilibili/user/video/466272',
        tag: ['时尚'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/b0115443f66e86265fc99f0aeeb95401c2b8848e.jpg@15Q",
        title: '共青团中央',
        description: '大家好，我是皮皮团，右上角关注，点一下，玩好几年，看小片不花一分钱(◦˙▽˙◦)投稿发邮箱tzybilibili@163.com',
        rssUrl: 'https://rsshub.app/bilibili/user/video/20165629',
        tag: ['时政'],
      },
      {
        favicon: "http://i1.hdslb.com/bfs/face/2351ed45d1f4cac260f7ff5886d7c1c4b8c5c3af.jpg@15Q",
        title: '观察者网',
        description: '广受年轻人心疼的时政网站',
        rssUrl: 'https://rsshub.app/bilibili/user/video/10330740',
        tag: ['时政'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/e93bc7f0649f33fa63e5e0ee80be498796370401.jpg@15Q",
        title: '张召忠',
        description: '各位网（玩）友（艺儿）大家好，我是局座张召忠。',
        rssUrl: 'https://rsshub.app/bilibili/user/video/33683045',
        tag: ['军事'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/df0be0f1946581030cbaf34e3f66a996f0a1af4a.jpg@15Q",
        title: '信誓蛋蛋',
        description: '微信公众号 ：@heyxinshidandan 微博：@real信誓蛋蛋 邮箱 ：hey@xinshidandan.fr',
        rssUrl: 'https://rsshub.app/bilibili/user/video/32786875',
        tag: ['生活'],
      },
      {
        favicon: "http://i1.hdslb.com/bfs/face/6c36ec15f6d7ddd9bdb558511521bd0256779e1c.jpg@15Q",
        title: '伊丽莎白鼠',
        description: '一个热爱鬼畜的普通人。微博：@伊丽莎白鼠 weibo.com/LittleWhiteMouse',
        rssUrl: 'https://rsshub.app/bilibili/user/video/375375',
        tag: ['鬼畜'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/f6f8dc53ddf3ba07c1f0dd3ad87fe92034198b81.jpg@15Q",
        title: '科技美学',
        description: '微博微信 @科技美学 每天福利多多',
        rssUrl: 'https://rsshub.app/bilibili/user/video/3766866',
        tag: ['数码'],
      },
      {
        favicon: "http://i2.hdslb.com/bfs/face/6f7ef32a25419744130c42f63ff6b11c624f19e3.jpg",
        title: '钟文泽',
        description: '特别偏，特别不公正。微博：@钟文泽',
        rssUrl: 'https://rsshub.app/bilibili/user/video/25910292',
        tag: ['数码'],
      },
      {
        favicon: "http://i0.hdslb.com/bfs/face/7ad1414215e6529dd6308a990b57ccc0a948a0c2.jpg",
        title: 'zettaranc',
        description: 'ztalk全系视频首发平台，love and share，分享热爱。',
        rssUrl: 'https://rsshub.app/bilibili/user/video/326246517',
        tag: ['生活'],
      },
    ]
  },

  //微博
  {
    cate: "微博",
    items: [
      {
        favicon: "http://tp3.sinaimg.cn/3217179555/50/1257422142/1",
        title: '回忆专用小马甲',
        description: '微博人气博主',
        rssUrl: 'https://rsshub.app/weibo/user/3217179555',
        tag: ['微博']
      },
      {
        favicon: "http://tp3.sinaimg.cn/2150511032/50/1257422142/1",
        title: '追风少年刘全有',
        description: '微博知名博主',
        rssUrl: 'https://rsshub.app/weibo/user/2150511032',
        tag: ['微博']
      },
      {
        favicon: "http://tp3.sinaimg.cn/3099016097/50/1257422142/1",
        title: '英国报姐',
        description: '微博知名中英文化自由撰稿人',
        rssUrl: 'https://rsshub.app/weibo/user/3099016097',
        tag: ['微博', '国外']
      },
      {
        favicon: "http://tp3.sinaimg.cn/1788911247/50/1257422142/1",
        title: '谷大白话',
        description: '脱口秀译者',
        rssUrl: 'https://rsshub.app/weibo/user/1788911247',
        tag: ['微博', '国外']
      },
      {
        favicon: "http://tp3.sinaimg.cn/2891529877/50/1257422142/1",
        title: '呆十三',
        description: '微博知名博主 知名搞笑幽默博主',
        rssUrl: 'https://rsshub.app/weibo/user/2891529877',
        tag: ['微博', '搞笑']
      },
      {
        favicon: "http://tp3.sinaimg.cn/1748852693/50/1257422142/1",
        title: '苍南派',
        description: '微博知名原创漫画家 微博2017十大影响力人气博主 新鲜事金牌作者',
        rssUrl: 'https://rsshub.app/weibo/user/1748852693',
        tag: ['微博']
      },
      {
        favicon: "http://tp3.sinaimg.cn/3167305545/50/1257422142/1",
        title: '秋田六千',
        description: '微博知名中日文化自由撰稿人、漫画家',
        rssUrl: 'https://rsshub.app/weibo/user/3167305545',
        tag: ['微博']
      },
      {
        favicon: "http://tp3.sinaimg.cn/1826792401/50/1257422142/1",
        title: '王思聪',
        description: '北京普思资本董事长、万达集团董事',
        rssUrl: 'https://rsshub.app/weibo/user/1826792401',
        tag: ['微博']
      },
      {
        favicon: "http://tp3.sinaimg.cn/2803301701/50/125742142/1",
        title: '人民日报',
        description: '《人民日报》法人微博',
        rssUrl: 'https://rsshub.app/weibo/user/2803301701',
        tag: ['微博']
      },
    ]
  },

  //掘金
  {
    cate: "掘金",
    items: [
      {
        title: '沸点',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/pins',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '开发'],
      },
      {
      title: '前端',
      description: '',
      rssUrl: 'https://rsshub.app/juejin/category/frontend',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
      tag: ['掘金','开发'],
    },
      {
        title: 'Android',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/android',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金','开发'],
      },
      {
        title: 'iOS',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/ios',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '开发'],
      },
      {
        title: '后端',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/backend',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '开发'],
      },
      {
        title: '设计',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/design',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '设计'],
      },
      {
        title: '产品',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/product',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '产品'],
      },
      {
        title: '工具资源',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/freebie',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金'],
      },
      {
        title: '阅读',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/article',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金','阅读'],
      },
      {
        title: '人工智能',
        description: '',
        rssUrl: 'https://rsshub.app/juejin/category/ai',
        favicon: 'https://pic.rhinoc.top/juejin.jpg',
        tag: ['掘金', '人工智能'],
      },
    ]
  },
];

module.exports = {
  wxData,
}
