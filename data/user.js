// 用户订阅的RSS源
const userData = [
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
    title: '少数派',
    link: 'https://sspai.com',
    description: '中文互联网最大的知识平台，帮助人们便捷地分享彼此的知识、经验和见解。',
    rssUrl: 'https://sspai.com/feed',
    detail: 'description',
  },
];

module.exports = {
  userData,
}
