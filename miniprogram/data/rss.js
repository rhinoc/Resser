// 内置RSS源
const rssData = [
  //博客类
  {
    favicon: "https://www.runningcheese.com/wp-content/themes/concise/images/panda.png",
    title: '奔跑中的奶酪',
    link: 'https://www.runningcheese.com.com',
    description: '有智 有趣 有爱',
    rssUrl: 'https://www.runningcheese.com/feed',
    type: 'rss',
    tag: ['博客','科技','互联网'], //第一个tag为大类
  },

  {
    favicon: "http://www.zreading.cn/favicon.ico",
    title: '左岸读书',
    link: 'http://www.zreading.cn',
    description: '共同致于美好的阅读体验',
    rssUrl: 'https://www.zreading.cn/feed',
    type: 'rss',
    tag: ['博客', '阅读', '学习'],
  },

  //科技
  {
    favicon: "https://www.cnbeta.com/favicon.ico",
    title: 'cnBeta.COM',
    link: 'https://www.cnbeta.com',
    description: '简明IT新闻,网友媒体与言论平台',
    rssUrl: 'https://www.cnbeta.com/backend.php',
    type: 'rss',
    tag: ['科技', '资讯', '互联网'],
  },

  {
    favicon: "https://36kr.com/favicon.ico",
    title: '36氪',
    link: 'https://36kr.com',
    description: '让一部分人先看到未来',
    rssUrl: 'https://36kr.com/feed',
    type: 'rss',
    tag: ['科技', '资讯', '创业'],
  },

  {
    favicon: "https://www.ifanr.com/favicon.ico",
    title: '爱范儿',
    link: 'https://www.ifanr.com',
    description: '聚焦创新及消费科技领域的线上第一媒体',
    rssUrl: "https://www.ifanr.com/feed",
    type: 'content:encoded',
    tag: ['科技', '资讯'],
  },

  {
    favicon: "https://static001.infoq.cn/static/infoq/favicon/favicon-32x32.png",
    title: 'InfoQ',
    link: 'http://www.infoq.com',
    description: '实践驱动的社区资讯站点，致力于促进软件开发领域知识与创新的传播。',
    rssUrl: 'https://www.infoq.com/cn/feed',
    type: 'rss',
    tag: ['科技', '资讯','软件'],
  },

  //社区 
  {
    favicon: "https://www.zhihu.com/favicon.ico",
    title: '知乎日报',
    link: 'https://www.zhihu.com',
    description: '每日提供来自知乎社区的精选问答，还有国内一流媒体的专栏特稿。',  
    rssUrl: 'http://zhihurss.miantiao.me/dailyrss',
    type: 'feed',
    tag: ['社区','知识','问答']
  },

  {
    favicon: "https://www.guokr.com/favicon.ico",
    title: '果壳',
    link: 'https://www.guokr.com/',
    description: '科学人推荐文章',
    rssUrl: 'http://feeds.brandipo.com/users/1/web_requests/21/guoke.xml',
    type: 'description',
    tag: ['社区','科学'],
  },

  //  {
  //   title: '好奇心日报',
  //   link: 'https://www.qdaily.com',
  //   description: '这是一个帮助你发现生活何以美好的商业新闻媒体。所有内容均原创或者邀请专业作者撰写。报道涉及智能、设计、城市、时尚和娱乐等领域。全部都建立在商业视角之上。',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/qdaily',
  //   remark: '',
  //   type: 'description',
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
  //   title: '界面',
  //   link: 'https://kindle4rss.com',
  //   description: '界面是中国最大的商业新闻和社交平台，只服务于独立思考的人群。',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/jiemian',
  //   remark: '',
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
  //   title: '雷锋网',
  //   link: 'https://www.leiphone.com',
  //   description: '雷锋网RSS订阅',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/leiphone',
  //   type: 'description',
  // },
  
  
  // {
  //   title: 'iPcFun',
  //   link: 'https://feed.ipcfun.com',
  //   description: '分享最精彩有趣的互联网资讯，打发最无聊的时间',
  //   
  //   rssUrl: 'https://feed.ipcfun.com/',
  //   type: 'crawl',
  // },
  // {
  //   title: '小众软件',
  //   link: 'https://appinn.com',
  //   description: '分享免费、小巧、实用、有趣、绿色的软件',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/appinns',
  //   remark: '',
  //   type: 'content:encoded',
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