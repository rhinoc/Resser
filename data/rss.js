// 内置RSS源
const rssData = [
  // 优质社区
  {
    title: 'cnBeta资讯',
    link: 'https://www.cnbeta.com',
    description: 'cnBeta业界新闻资讯',
    rssUrl: 'https://www.cnbeta.com/backend.php',
    remark: '',
    detail: 'crawl',
  },
  {
    title: '知乎精选',
    link: 'https://www.zhihu.com',
    description: '中文互联网最大的知识平台，帮助人们便捷地分享彼此的知识、经验和见解。',  
    rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/zhihurss',
    detail: 'description',
  },
  // {
  //   title: '知乎日报',
  //   link: 'https://daily.zhihu.com',
  //   description: '知乎日报是一款拥有千万用户的资讯类客户端，每日提供来自知乎社区的精选问答，还有国内一流媒体的专栏特稿。',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/zhihudaily',
  //   detail: 'description',
  // },
  //  {
  //   title: '好奇心日报',
  //   link: 'https://www.qdaily.com',
  //   description: '这是一个帮助你发现生活何以美好的商业新闻媒体。所有内容均原创或者邀请专业作者撰写。报道涉及智能、设计、城市、时尚和娱乐等领域。全部都建立在商业视角之上。',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/qdaily',
  //   remark: '',
  //   detail: 'description',
  // },
  // {
  //   title: '网易新闻',
  //   link: 'http://news.163.com',
  //   description: '汇集互联网热门、有趣内容的图片社区',
  //   
  //   rssUrl: 'http://news.163.com/special/00011K6L/rss_newsattitude.xml',
  //   detail: 'description',
  // },
  // {
  //   title: '界面',
  //   link: 'https://kindle4rss.com',
  //   description: '界面是中国最大的商业新闻和社交平台，只服务于独立思考的人群。',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/jiemian',
  //   remark: '',
  //   detail: 'description',
  // },
  // {
  //   title: '开源中国社区',
  //   link: 'https://www.oschina.net',
  //   description: '开源中国社区——找到您想要的开源软件，分享和交流',
  //   
  //   rssUrl: 'https://www.oschina.net/news/rss',
  //   remark: '图片无法直接访问',
  //   detail: 'crawl',
  // },
  {
    title: 'InfoQ',
    link: 'http://www.infoq.com',
    description: 'InfoQ是一个实践驱动的社区资讯站点，致力于促进软件开发领域知识与创新的传播。',  
    rssUrl: 'https://www.infoq.com/cn/feed',
    remark: '图片无法直接访问, 无detail',
    detail: 'crawl',
  },

  // // 学习
  // {
  //   title: '左岸读书',
  //   link: 'http://www.zreading.cn',
  //   description: '一切成功均源自积累！',
  //   
  //   rssUrl: 'https://www.zreading.cn/feed',
  //   remark: '无detail',
  //   detail: 'crawl',
  // },

  // // 新闻资讯
  // {
  //   title: '新浪国际要闻',
  //   link: 'http://www.sina.com',
  //   description: '国际要闻-新浪新闻',
  //   
  //   rssUrl: 'https://rss.sina.com.cn/news/world/focus15.xml',
  //   remark: '无detail',
  //   detail: 'crawl',
  // },
  // {
  //   title: '新浪国内要闻',
  //   link: 'http://www.sina.com',
  //   description: '国内要闻-新浪新闻',
  //   
  //   rssUrl: 'https://rss.sina.com.cn/news/china/focus15.xml',
  //   remark: '无detail',
  //   detail: 'crawl',
  // },

  // 科技
  // {
  //   title: '雷锋网',
  //   link: 'https://www.leiphone.com',
  //   description: '雷锋网RSS订阅',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/leiphone',
  //   detail: 'description',
  // },
  {
    title: '36氪',
    link: 'https://36kr.com',
    description: '让一部分人先看到未来',   
    rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/36kr',
    detail: 'description',
  },
  {
    title: '爱范儿',
    link: 'https://www.ifanr.com',
    description: '报道未来，服务新生活引领者',
    
    rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/ifanr',
    detail: 'content:encoded',
  },
  // {
  //   title: 'iPcFun',
  //   link: 'https://feed.ipcfun.com',
  //   description: '分享最精彩有趣的互联网资讯，打发最无聊的时间',
  //   
  //   rssUrl: 'https://feed.ipcfun.com/',
  //   detail: 'crawl',
  // },
  // {
  //   title: '小众软件',
  //   link: 'https://appinn.com',
  //   description: '分享免费、小巧、实用、有趣、绿色的软件',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/appinns',
  //   remark: '',
  //   detail: 'content:encoded',
  // },

  // 设计
  // {
  //   title: '优设-UISDC',
  //   link: 'https://www.uisdc.com',
  //   description: '优秀设计联盟-SDC-优设网-设计师交流学习平台-听讲座，聊设计，找素材，尽在优设网',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/uisdc',
  //   remark: '',
  //   detail: 'content:encoded',
  // },
  // {
  //   title: '腾讯CDC',
  //   link: 'http://cdc.tencent.com',
  //   description: '腾讯CDC',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/tencentcdc',
  //   remark: '',
  //   detail: 'content:encoded',
  // },

  // 英语

  // {
  //   title: 'the week',
  //   link: 'https://theweek.com',
  //   description: 'Latest articles',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/theweek',
  //   detail: 'description',
  // },
  // {
  //   title: 'Stratechery by Ben Thompson',
  //   link: 'https://stratechery.com',
  //   description: 'On the business, strategy, and impact of technology. 作者曾在苹果微软工作',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/stratechery',
  //   remark: '',
  //   detail: 'content:encoded',
  // },
  // {
  //   title: 'Smashing Magazine',
  //   link: 'https://www.smashingmagazine.com',
  //   description: 'Recent content in Articles on Smashing Magazine — For Web Designers And Developers',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/smashingmagazine',
  //   remark: '',
  //   detail: 'content:encoded',
  // },

  // 书评
  // {
  //   title: '读写人',
  //   link: 'http://www.duxieren.com',
  //   description: '读写人网站：书评杂志、书评博客、书评网站、读书资源聚合',
  //   
  //   rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/duxieren',
  //   remark: '',
  //   detail: 'description',
  // },
  {
    title: '豆瓣书评',
    link: 'https://www.douban.com',
    description: '豆瓣成员投票选出的最佳书评',
    rssUrl: 'https://service-ox5moi4m-1258237701.gz.apigw.tencentcs.com/release/doubanbook',
    remark: '',
    detail: 'content:encoded',
  },
];

module.exports = {
  rssData,
}