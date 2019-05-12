// 内置RSS源
const rssData = [
  {
    cate: "博客",
    items: [{
        favicon: "https://www.runningcheese.com/wp-content/themes/concise/images/panda.png",
        title: '奔跑中的奶酪', //ok url2io深度解析
        link: 'https://www.runningcheese.com.com',
        description: '有智 有趣 有爱',
        rssUrl: 'https://www.runningcheese.com/feed',
        type: 'url2io',
        tag: ['博客', '科技', '互联网'], //第一个tag为大类
      },
      {
        favicon: "http://www.zreading.cn/favicon.ico",
        title: '左岸读书', //ok 深度解析
        link: 'http://www.zreading.cn',
        description: '共同致于美好的阅读体验',
        rssUrl: 'https://www.zreading.cn/feed',
        type: 'rss',
        tag: ['博客', '阅读', '学习'],
      },
      {
        favicon: "https://www.williamlong.info/favicon.ico",
        title: '月光博客', //ok
        link: 'https://www.williamlong.info',
        description: '关注互联网和搜索引擎的IT科技博客',
        rssUrl: 'https://www.williamlong.info/rss.xml',
        type: 'description',
        tag: ['博客', '科技'],
      },
      {
        title: '小众软件',
        link: 'https://appinn.com', //ok
        description: '分享免费、小巧、实用、有趣、绿色的软件',
        rssUrl: 'http://feeds.feedburner.com/appinncom',
        favicon: 'https://www.appinn.com/logo1.png',
        tag: ['软件'],
      },
    ]
  },
  {
    cate: "科技",
    items: [{
        favicon: "https://www.cnbeta.com/favicon.ico",
        title: 'cnBeta.COM', //gugudata深入原文可显示，但是图片设置了防盗链不能显示，有广告
        link: 'https://www.cnbeta.com',
        description: '简明IT新闻,网友媒体与言论平台',
        rssUrl: 'https://www.cnbeta.com/backend.php',
        type: 'rss',
        tag: ['科技', '资讯', '互联网'],
      },

      {
        favicon: "https://36kr.com/favicon.ico",
        title: '36氪', //ok
        link: 'https://36kr.com',
        description: '让一部分人先看到未来',
        rssUrl: 'https://36kr.com/feed',
        type: 'rss',
        tag: ['科技', '资讯', '创业'],
      },

      {
        favicon: "https://www.ifanr.com/favicon.ico",
        title: '爱范儿', //ok
        link: 'https://www.ifanr.com',
        description: '聚焦创新及消费科技领域的线上第一媒体',
        rssUrl: "https://www.ifanr.com/feed",
        type: 'content:encoded',
        tag: ['科技', '资讯'],
      },
      {
        favicon: "https://www.huxiu.com/favicon.ico",
        title: '虎嗅网', //ok
        link: 'https://www.huxiu.com',
        description: '聚焦科技与创新的资讯平台',
        rssUrl: 'https://www.huxiu.com/rss/0.xml',
        type: 'description',
        tag: ['科技'],
      },
      {
        title: '雷锋网', //ok
        link: 'https://www.leiphone.com',
        description: '雷锋网RSS订阅',
        favicon: 'https://www.leiphone.com/resWeb/images/common/lp_logo.png',
        rssUrl: 'https://www.leiphone.com/feed',
        type: 'description',
        tag: ['科技']
      },
    ]
  },
  {
    cate: "商业",
    items: [{
        favicon: "http://www.qdaily.com/favicon.ico",
        title: '好奇心日报', //ok
        link: 'https://www.qdaily.com',
        description: '发现生活何以美好的商业新闻媒体',
        rssUrl: 'http://www.qdaily.com/feed.xml',
        type: 'description',
        tag: ['商业', '智能', '设计'],
      },
      {
        favicon: "http://www.zreading.cn/favicon.ico",
        title: '左岸读书', //ok 深度解析
        link: 'http://www.zreading.cn',
        description: '共同致于美好的阅读体验',
        rssUrl: 'https://www.zreading.cn/feed',
        type: 'rss',
        tag: ['博客', '阅读', '学习'],
      },
    ]
  },

  {
    cate: "时政",
    items: [{
        title: '澎湃新闻',
        link: 'https://www.thepaper.cn/', //ok
        description: '专注时政与思想的互联网平台',
        rssUrl: 'https://feedx.co/rss/thepaper.xml',
        favicon: 'https://www.thepaper.cn/favicon.ico',
        tag: ['时政'],
      },
      {
        title: '界面',
        link: 'https://www.jiemian.com/', //ok
        description: '只服务于独立思考的人群',
        rssUrl: 'https://feedx.co/rss/jiemian.xml',
        favicon: 'https://feedx.co/wp-content/uploads/2018/11/jiemian.jpg',
        tag: ['时政'],
      },
    ]
  },
  {
    cate: "财经",
    items: [{
      title: '英为财情',
      link: 'https://investing.com', //ok
      description: '全球金融市场实时行情和资讯专家',
      rssUrl: 'https://feedx.co/rss/investing.xml',
      favicon: 'https://feedx.co/wp-content/uploads/2017/03/investing.jpg',
      tag: ['财经'],
    }, ]
  },
  {
    cate: "国外",
    items:[
      {
        title: 'The Economist',
        link: 'https://www.economist.com/', //ok
        description: 'World News, Politics, Economics, Business & Finance',
        rssUrl: 'https://feedx.co/rss/economist.xml',
        favicon: 'https://feedx.co/wp-content/uploads/2018/04/economist.jpg',
        tag: ['国外'],
      },

      {
        title: 'National Geographic',
        link: 'https://www.nationalgeographic.com/', //ok
        description: 'A world leader in geography, cartography and exploration.',
        rssUrl: 'https://feedx.co/rss/natgeo.xml',
        favicon: 'https://www.nationalgeographic.com/favicon.ico',
        tag: ['国外'],
      },

      {
        title: 'NASA Breaking News',
        link: 'http://www.nasa.gov/', //enclosure url
        description: 'latest NASA news articles and press releases.',
        rssUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
        favicon: 'https://feedx.co/wp-content/uploads/2018/10/nasa.jpg',
        tag: ['国外'],
      },
    ]
  },
  {
    cate: "阅读",
    items: [{
        favicon: "https://images.weserv.nl/?url=ssl:daily.zhihu.com/img/new_home_v3/top_logo.png",
        title: '知乎日报', //ok
        link: 'https://www.zhihu.com',
        description: '来自知乎社区的每日精选问答',
        rssUrl: 'http://zhihurss.miantiao.me/dailyrss',
        type: 'feed',
        tag: ['阅读', '知识', '问答']
      },
      {
        title: 'ONE·一个',
        link: 'http://wufazhuce.com/', //ok
        description: '每天只为你准备一张图片、一篇文字和一个问答',
        rssUrl: 'https://feedx.co/rss/one.xml',
        favicon: 'https://feedx.co/wp-content/uploads/2017/11/one.jpg',
        tag: ['文艺'],
      },
      {
        title: '观止',
        link: 'https://itunes.apple.com/cn/app/%E8%A7%82%E6%AD%A2-%E6%AF%8F%E5%A4%A9%E4%B8%80%E7%AF%87%E7%B2%BE%E9%80%89%E4%BC%98%E8%B4%A8%E7%9F%AD%E7%AF%87/id698038710', //ok
        description: '每天一篇精选优质短篇',
        rssUrl: 'https://feedx.co/rss/guanzhi.xml',
        favicon: 'https://feedx.co/wp-content/uploads/2018/03/guanzhi.jpg',
        tag: ['文艺'],
      },
    ]
  }

  // {
  //   favicon: "https://static001.infoq.cn/static/infoq/favicon/favicon-32x32.png",
  //   title: 'InfoQ', //只能显示简介，并且无法深入原文
  //   link: 'http://www.infoq.com',
  //   description: '实践驱动的社区资讯站点，致力于促进软件开发领域知识与创新的传播。',
  //   rssUrl: 'https://www.infoq.com/cn/feed',
  //   type: 'rss',
  //   tag: ['科技', '资讯', '软件'],
  // },

  //社区 

  // {
  //   favicon: "https://www.zhihu.com/favicon.ico",
  //   title: '知乎每日精选', //ok
  //   link: 'https://www.zhihu.com',
  //   description: '中文互联网最大的知识平台',
  //   rssUrl: 'https://www.zhihu.com/rss',
  //   type: 'feed',
  //   tag: ['社区', '知识', '问答']
  // },

  // {
  //   favicon: "https://www.guokr.com/favicon.ico",
  //   title: '果壳',//返回数据大于1M
  //   link: 'https://www.guokr.com/',
  //   description: '科学人推荐文章',
  //   rssUrl: 'http://feeds.brandipo.com/users/1/web_requests/21/guoke.xml',
  //   type: 'description',
  //   tag: ['社区','科学'],
  // },

  // {
  //   title: '网易新闻',
  //   link: 'http://news.163.com',
  //   description: '汇集互联网热门、有趣内容的图片社区',
  //   
  //   rssUrl: 'http://news.163.com/special/00011K6L/rss_newsattitude.xml',
  //   type: 'description',
  // },

  // {
  //   title: '开源中国社区',
  //   link: 'https://www.oschina.net',
  //   description: '开源中国社区——找到您想要的开源软件，分享和交流',
  //   
  //   rssUrl: 'https://www.oschina.net/news/rss',
  //   remark: '图片无法直接访问',
  //   type: 'crawl',
  // },




  // // 新闻资讯
  // {
  //   title: '新浪国际要闻',
  //   link: 'http://www.sina.com',
  //   description: '国际要闻-新浪新闻',
  //   
  //   rssUrl: 'https://rss.sina.com.cn/news/world/focus15.xml',
  //   remark: '无type',
  //   type: 'crawl',
  // },
  // {
  //   title: '新浪国内要闻',
  //   link: 'http://www.sina.com',
  //   description: '国内要闻-新浪新闻',
  //   
  //   rssUrl: 'https://rss.sina.com.cn/news/china/focus15.xml',
  //   remark: '无type',
  //   type: 'crawl',
  // },

  // 科技



  // {
  //   title: 'iPcFun',
  //   link: 'https://feed.ipcfun.com',
  //   description: '分享最精彩有趣的互联网资讯，打发最无聊的时间',
  //   
  //   rssUrl: 'https://feed.ipcfun.com/',
  //   type: 'crawl',
  // },










  // 设计
  // {
  //   title: '优设-UISDC',
  //   link: 'https://www.uisdc.com',
  //   description: '优秀设计联盟-SDC-优设网-设计师交流学习平台-听讲座，聊设计，找素材，尽在优设网',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/uisdc',
  //   remark: '',
  //   type: 'content:encoded',
  // },
  // {
  //   title: '腾讯CDC',
  //   link: 'http://cdc.tencent.com',
  //   description: '腾讯CDC',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/tencentcdc',
  //   remark: '',
  //   type: 'content:encoded',
  // },

  // 英语

  // {
  //   title: 'the week',
  //   link: 'https://theweek.com',
  //   description: 'Latest articles',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/theweek',
  //   type: 'description',
  // },
  // {
  //   title: 'Stratechery by Ben Thompson',
  //   link: 'https://stratechery.com',
  //   description: 'On the business, strategy, and impact of technology. 作者曾在苹果微软工作',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/stratechery',
  //   remark: '',
  //   type: 'content:encoded',
  // },
  // {
  //   title: 'Smashing Magazine',
  //   link: 'https://www.smashingmagazine.com',
  //   description: 'Recent content in Articles on Smashing Magazine — For Web Designers And Developers',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/smashingmagazine',
  //   remark: '',
  //   type: 'content:encoded',
  // },

  // 书评
  // {
  //   title: '读写人',
  //   link: 'http://www.duxieren.com',
  //   description: '读写人网站：书评杂志、书评博客、书评网站、读书资源聚合',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/duxieren',
  //   remark: '',
  //   type: 'description',
  // },
];

module.exports = {
  rssData,
}