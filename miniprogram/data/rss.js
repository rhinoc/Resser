// 内置RSS源
const rssData = [

    //科技
    {
        cate: "科技",
        items: [{
                favicon: "https://pic.rhinoc.top/36kr.jpg",
                title: '36氪', //ok
                link: 'https://36kr.com',
                description: '让一部分人先看到未来',
                rssUrl: 'https://36kr.com/feed',
                tag: ['科技', '资讯', '创业'],
            },
            {
                favicon: "https://pic.rhinoc.top/ifanr.jpg",
                title: '爱范儿', //ok
                link: 'https://www.ifanr.com',
                description: '聚焦创新及消费科技领域的线上第一媒体',
                rssUrl: "https://www.ifanr.com/feed",
                tag: ['科技', '资讯'],
            },
            {
              favicon: "https://pic.rhinoc.top/readhub.jpg",
                title:"Readhub",
                rssUrl: "http://readhub.bayes.cafe/rss?channel=all",
                tag:['科技', '资讯'],
            },
            {
                favicon: "https://pic.rhinoc.top/pingwest.jpg",
                title: '品玩 PingWest', //ok
                link: 'https://www.pingwest.com',
                description: '有品好玩的科技，一切与你有关',
                rssUrl: 'https://www.pingwest.com/feed',
                tag: ['科技'],
            },
            {
                favicon: "https://pic.rhinoc.top/huxiu.jpg",
                title: '虎嗅网', //ok
                link: 'https://www.huxiu.com',
                description: '聚焦科技与创新的资讯平台',
                rssUrl: 'https://www.huxiu.com/rss/0.xml',
                tag: ['科技'],
            },
            {
                favicon: "https://pic.rhinoc.top/cyzone.jpg",
                title: '创业邦', //ok
                link: 'http://www.cyzone.cn',
                description: '有品好玩的科技，一切与你有关',
                rssUrl: 'http://www.cyzone.cn/rss',
                tag: ['科技', '创业'],
            },
            {
                favicon: "https://pic.rhinoc.top/geekpark.jpg",
                title: '极客公园', //ok
                link: 'https://www.geekpark.com',
                description: '聚焦科技与创新的资讯平台',
                rssUrl: 'http://www.geekpark.net/rss',
                tag: ['科技'],
            },
            {
                favicon: "https://pic.rhinoc.top/en.jpg",
                title: '瘾科技', //ok
                link: 'https://cn.engadget.com/',
                description: '来自Engadget中国版团队的科技新闻和评测，掌握最新消费性电子产品消息',
                rssUrl: 'https://feedx.co/rss/engadget.xml',
                tag: ['科技'],
            },
            {
                favicon: "https://pic.rhinoc.top/dgtle.jpg",
                title: '数字尾巴', //not very ok 图片403
                link: 'http://www.dgtle.com',
                description: '分享美好数字生活',
                rssUrl: 'http://www.dgtle.com/rss/dgtle.xml',
                tag: ['科技'],
            },
            {
                title: '雷锋网', //ok
                link: 'https://www.leiphone.com',
                description: '关注移动互联网&未来',
                favicon: 'https://pic.rhinoc.top/leiphone.jpg',
                rssUrl: 'https://www.leiphone.com/feed',
                tag: ['科技', '移动互联网']
            },
            // {
            //   title: '梅花网', //not very ok 图片403
            //   link: 'https://www.meihua.info/',
            //   description: '营销者的信息中心',
            //   favicon: 'https://pic.rhinoc.top/meihua.jpg',
            //   rssUrl: 'https://www.meihua.info/feed',
            //   tag: ['科技', '资讯', '营销']
            // },
            {
                favicon: "https://pic.rhinoc.top/qdaily.jpg",
                title: '好奇心日报', //ok
                link: 'https://www.qdaily.com',
                description: '发现生活何以美好的商业新闻媒体',
                rssUrl: 'http://www.qdaily.com/feed.xml',
                tag: ['科技', '商业', '设计'],
            },
            {
                title: 'TechCrunch', //ok
                link: 'https://techcrunch.cn/',
                description: 'TechCrunch 中文版',
                favicon: 'https://pic.rhinoc.top/tc.jpg',
                rssUrl: 'https://techcrunch.cn/feed/',
                tag: ['科技']
            },
            {
                favicon: "https://pic.rhinoc.top/tmt.jpg",
                title: '钛媒体', //ok
                link: 'https://www.tmtpost.com',
                description: '国内首家TMT公司人社群媒体，最有钛度的一人一媒体平台',
                rssUrl: 'https://www.tmtpost.com/rss.xml',
                tag: ['科技', '资讯', '商业'],
            },
            {
                favicon: "https://pic.rhinoc.top/ithome.jpg",
                title: 'IT之家', //ok
                link: 'https://www.ithome.com/',
                description: '软媒旗下网站',
                rssUrl: 'https://www.ithome.com/rss/',
                tag: ['科技', '资讯', '商业'],
            },
            {
                favicon: "https://pic.rhinoc.top/feng.jpg",
                title: '威锋网', //ok
                link: 'http://www.feng.com/',
                description: '提供一手苹果和科技数码新闻',
                rssUrl: 'http://www.feng.com/rss.xml',
                tag: ['科技', '资讯', '商业'],
            },
        ]
    },

    //设计
    {
        cate: "设计",
        items: [{
                favicon: "https://pic.rhinoc.top/cdc.jpg",
                title: '腾讯CDC', //ok
                link: 'http://cdc.tencent.com',
                description: '腾讯用户研究与体验设计部',
                rssUrl: 'https://cdc.tencent.com/feed/',
                remark: '',
                tag: ['设计'],
            },
            {
                favicon: "https://pic.rhinoc.top/drib.jpg",
                title: 'Dribbble', //ok 图片载入慢
                link: 'https://www.dribbble.com',
                description: 'Discover the world’s top designers & creatives',
                rssUrl: 'https://rsshub.app/dribbble/popular/week',
                tag: ['设计'],
            },
            // {
            //   favicon: "https://pic.rhinoc.top/behance.jpg",
            //   title: 'Behance', //not ok 云函数超时
            //   link: 'https://behance.com',
            //   description: '',
            //   rssUrl: 'http://feeds.feedburner.com/behance/vorr',
            //   type: 'rss',
            //   tag: ['设计'],
            // },
            {
                favicon: "https://pic.rhinoc.top/uisdc.jpg",
                title: '优设 UISDC', //ok 就是有广告
                link: 'https://www.uisdc.com',
                description: '优秀设计联盟',
                rssUrl: 'https://www.uisdc.com/feed',
                tag: ['设计'],
            },
        ]
    },

    //阅读
    {
        cate: "阅读",
        items: [{
                favicon: "https://pic.rhinoc.top/zhihudaily.jpg",
                title: '知乎日报', //ok
                link: 'https://www.zhihu.com',
                description: '来自知乎社区的每日精选问答',
                rssUrl: 'http://zhihurss.miantiao.me/dailyrss',
                tag: ['阅读', '知识', '问答']
            },
            {
                favicon: "https://pic.rhinoc.top/zhihu.jpg",
                title: '知乎每日精选', //ok
                link: 'https://www.zhihu.com',
                description: '中文互联网最大的知识平台',
                rssUrl: 'https://www.zhihu.com/rss',
                tag: ['阅读', '知识', '问答']
            },
            {
                favicon: "https://pic.rhinoc.top/jianshu.png",
                title: '简书',
                link: 'https://www.jianshu.com',
                description: '每个人都是生活中的艺术家,有着无穷的创造力。',
              rssUrl: 'https://rsshub.app/jianshu/home',
                tag: ['阅读']
            },
            {
                favicon: "https://pic.rhinoc.top/jike.jpg",
                title: '即刻小报',
                link: 'https://www.jike.com',
                description: '与更多同好分享你的见闻与感受，每一个独到的声音,都值得被更多人倾听。',
                rssUrl: 'https://rsshub.app/jike/daily',
                tag: ['阅读', '社交媒体']
            },
            {
                favicon: "https://pic.rhinoc.top/zhidao.jpg",
                title: '知道日报', //ok
                link: 'https://zhidao.baidu.com/daily/',
                description: '百度知道重磅推出的品牌内容栏目，泛生活领域的专业知识问答平台',
                rssUrl: 'https://feedx.co/rss/zhidaodaily.xml',
                tag: ['阅读', '知识', '问答']
            },
            {
                title: 'ONE · 一个',
                link: 'http://wufazhuce.com/', //ok
                description: '每天只为你准备一张图片、一篇文字和一个问答',
                rssUrl: 'https://feedx.co/rss/one.xml',
                favicon: 'https://pic.rhinoc.top/one.jpg',
                tag: ['阅读', '文艺'],
            },
            {
                title: '观止',
                link: '',
                description: '每天一篇精选优质短篇',
                rssUrl: 'https://feedx.co/rss/guanzhi.xml',
                favicon: 'https://pic.rhinoc.top/guanzhi.jpg',
                tag: ['文艺'],
            },
            {
                title: '果壳科学人', //not very ok 图片403
                link: 'http://www.guokr.com/scientific/',
                description: '科技有意思',
                rssUrl: 'https://feedx.co/rss/guokrscientific.xml',
                favicon: 'https://pic.rhinoc.top/guokr.jpg',
                tag: ['文艺'],
            },
            {
                favicon: "https://pic.rhinoc.top/doubanbook.jpg",
                title: '豆瓣书评', //ok
                link: 'https://www.douban.com',
                description: '豆瓣成员投票选出的最佳书评',
                rssUrl: 'https://www.douban.com/feed/review/book',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/pengpai.jpg",
                title: '上海书评', //not very okay 图片403
                link: 'http://www.thepaper.cn/list_masonry.jsp?nodeid=26878',
                description: '《澎湃新闻·上海书评》，全球百位华文写作名家撰稿',
                rssUrl: 'https://feedx.co/rss/shanghaishuping.xml',
                tag: ['影音']
            },
        ]
    },

    //财经
    {
        cate: "财经",
        items: [{
                title: '英为财情',
                link: 'https://investing.com', //ok
                description: '全球金融市场实时行情和资讯专家',
                rssUrl: 'https://feedx.co/rss/investing.xml',
                favicon: 'https://feedx.co/wp-content/uploads/2017/03/investing.jpg',
                tag: ['财经'],

            },
            {
                title: 'FT中文网',
                link: 'http://www.ftchinese.com', //ok
                description: '英国《金融时报》集团旗下唯一的中文商业财经网站',
                rssUrl: 'http://www.ftchinese.com/rss/feed',
                favicon: 'https://pic.rhinoc.top/ft.jpg',
                tag: ['财经'],
            },
            {
                title: '华尔街见闻',
                link: 'https://wallstreetcn.com/', //ok
                description: '中国领先的商业和金融信息提供商',
                rssUrl: 'https://dedicated.wallstreetcn.com/rss.xml',
                favicon: 'https://pic.rhinoc.top/walls.jpg',
                tag: ['财经'],
            },
            {
              favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6pch1TxsaUxAqlOcQ0ZNYAvxMAHIMNJoKLKGhQWg1KUA/0",
              title: '饭统戴老板',
              description: '有趣且深度的硬核财经',
              rssUrl: 'https://rsshub.app/wechat/wasi/5b6c0f8c244d4e40858c2200',
              tag: ['财经'],
            },
        ]
    },

    //时政
    {
        cate: "时政",
        items: [{
                title: '澎湃新闻', //ok
                link: 'https://www.thepaper.cn/',
                description: '专注时政与思想的互联网平台',
                rssUrl: 'https://feedx.co/rss/thepaper.xml',
                favicon: 'https://pic.rhinoc.top/pengpai.jpg',
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
            {
              favicon: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5Dlw4H8vWoicXPXccEVkWYgFE1pNUvX7uaHmafPODGIEA/0",
              title: '人民日报',
              description: '参与、沟通、记录时代。',
              rssUrl: 'https://rsshub.app/wechat/wasi/5b575e1158e5c4583338ddb1',
              tag: ['时政'],
            },
            {
                title: '人民网 · 时政频道', //ok
                link: 'http://people.com.cn',
                description: '网上的人民日报',
                rssUrl: 'http://www.people.com.cn/rss/politics.xml',
                favicon: 'https://pic.rhinoc.top/people.jpg',
                tag: ['时政'],
            },
            {
                title: '朝日新闻', //ok
                link: 'https://www.asahi.com/',
                description: '日本三大综合性日文对开报纸之一',
                rssUrl: 'https://feedx.co/rss/asahi.xml',
                favicon: 'https://pic.rhinoc.top/asahi.jpg',
                tag: ['时政', '国外'],
            },
            {
                title: '半岛电视台', //ok
                link: 'http://chinese.aljazeera.net/',
                description: '日本三大综合性日文对开报纸之一',
                rssUrl: 'https://feedx.co/rss/aljazeera.xml',
                favicon: 'https://pic.rhinoc.top/aljazeera.jpg',
                tag: ['时政', '国外'],
            },
            {
                title: '端',
                link: 'https://theinitium.com/', //ok
                description: '面向全球華人的數位媒體',
                rssUrl: 'http://feeds.initium.news/theinitium',
                favicon: 'https://pic.rhinoc.top/duan.jpg',
                tag: ['时政'],
            },
            {
                title: '华盛顿邮报 The Washington Post',
                link: 'https://www.washingtonpost.com', //ok
                description: 'Democracy Dies in Darkness',
                rssUrl: 'https://feedx.co/rss/washingtonpost.xml',
                favicon: 'https://pic.rhinoc.top/wp.jpg',
                tag: ['时政', '国外'],
            },
          {
            title: '卫报 The Guardian',
            link: 'https://www.economist.com/', //ok
            description: 'Latest international news, sport and comment from the Guardian',
            rssUrl: 'https://rsshub.app/guardian/editorial',
            favicon: 'https://pic.rhinoc.top/guardian.jpg',
            tag: ['时政', '国外'],
          },
            {
                title: '经济学人 The Economist',
                link: 'https://www.economist.com/', //ok
                description: 'World News, Politics, Economics, Business & Finance',
                rssUrl: 'https://feedx.co/rss/economist.xml',
                favicon: 'https://pic.rhinoc.top/thee.jpg',
                tag: ['时政', '国外'],
            },
        ]
    },

    //影音
    {
        cate: "影音",
        items: [{
                favicon: "https://pic.rhinoc.top/doubanmovie.jpg",
                title: '豆瓣影评', //ok
                link: 'https://www.douban.com',
                description: '豆瓣成员投票选出的最佳影评',
                rssUrl: 'https://www.douban.com/feed/review/movie',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/eyepetizer.jpg",
                title: '开眼 Eyepetizer', //ok
                link: 'https://www.douban.com',
                description: '每天为你推荐精心挑选的短视频',
                rssUrl: 'https://feedx.co/rss/kaiyan.xml',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/doubanmovie.jpg",
                title: '豆瓣 · 正在上映', //ok
                link: 'https://www.douban.com',
                description: '正在上映的电影',
                rssUrl: 'https://rsshub.app/douban/movie/playing',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/doubanmovie.jpg",
                title: '豆瓣 · 即将上映', //ok
                link: 'https://www.douban.com',
                description: '即将上映的电影',
                rssUrl: 'https://rsshub.app/douban/movie/later',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/doubanmovie.jpg",
                title: '豆瓣 · 北美票房榜', //ok
                link: 'https://www.douban.com',
                description: '北美电影票房总排行',
                rssUrl: 'https://rsshub.app/douban/movie/ustop',
                tag: ['影音']
            },
            {
                favicon: "https://pic.rhinoc.top/doubanfm.jpg",
                title: '豆瓣乐评', //ok
                link: 'https://www.douban.com',
                description: '豆瓣成员投票选出的最佳乐评',
                rssUrl: 'https://www.douban.com/feed/review/music',
                tag: ['影音']
            },
        ]
    },

    //科学
    {
        cate: "科学",
        items: [{
                title: '国家地理 National Geographic',
                link: 'https://www.nationalgeographic.com/', //ok
                description: 'A world leader in geography, cartography and exploration.',
                rssUrl: 'https://feedx.co/rss/natgeo.xml',
                favicon: 'https://pic.rhinoc.top/ngd.jpg',
                tag: ['科学', '摄影', '国外'],
            },

            {
                title: 'NASA Breaking News',
                link: 'http://www.nasa.gov/', //ok enclosure
                description: 'latest NASA news articles and press releases.',
                rssUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
                favicon: 'https://feedx.co/wp-content/uploads/2018/10/nasa.jpg',
                tag: ['科学', '国外'],
            },
        ]
    },

    //体育
    {
        cate: "体育",
        items: [{
            title: '懂球帝', //ok
            link: 'http://www.dongqiudi.com',
            description: '提供专业足球资讯、足球视频、免费足球直播等内容',
            rssUrl: 'https://feedx.co/rss/dongqiudi.xml',
            favicon: 'https://feedx.co/wp-content/uploads/2018/03/dongqiudi.jpg',
            tag: ['体育'],
        }, 
          // {
          //   title: '虎扑篮球', //GBK解析乱码
          //   link: '',
          //   description: '每天为您精选最新最热的篮球新闻',
          //   rssUrl: 'https://voice.hupu.com/generated/voice/news_nba.xml',
          //   favicon: 'https://pic.rhinoc.top/hupu.jpg',
          //   tag: ['体育'],
          // }, 
        ]
    },

    //娱乐
    {
        cate: "娱乐",
        items: [{
                title: '3dmgame', //ok
                link: 'http://m.3dmgame.com/info/',
                description: '为中国游戏玩家提供游戏汉化和游戏资讯等内容',
                rssUrl: 'https://feedx.co/rss/3dmgame.xml',
                favicon: 'https://pic.rhinoc.top/3dm.jpg',
                tag: ['娱乐', '游戏'],
            },
            {
                title: '微博热搜',
                link: 'https://rsshub.app/weibo/',
                description: '微博搜索热搜榜',
                rssUrl: 'https://rsshub.app/weibo/search/hot',
                favicon: 'https://pic.rhinoc.top/weibo.jpg',
                tag: ['娱乐', '社交媒体'],
            },
          {
            title: '虎扑步行街', //ok
            link: 'https://bbs.hupu.com/bxj',
            description: '',
            rssUrl: 'https://rsshub.app/hupu/bbs/bxj/2',
            favicon: 'https://pic.rhinoc.top/hupu.jpg',
            tag: ['娱乐'],
          }
        ]
    },
];

module.exports = {
    rssData,
}
