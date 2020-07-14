module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        // 用户登陆
        app.get('/api/login', (req, res) => {
          const { username, password } = req.query
          if (username === 'kkb' && password === '123') {
            res.json({
              code: 1,
              token: 'kkbtoken'
            })
          } else {
            res.status(401).json({
              code: 0,
              message: '用户名或密码错误'
            })
          }
        })
        // 获取用户信息
        function auth(req, res, next) {
          if (req.headers.token) {
            next()
          } else {
            // res.status(401).json({
            //   code: 0,
            //   message: '用户令牌过期'
            // })
            res.sendStatus(401)
          }
        }
        app.get('/api/userinfo', auth, (req, res) => {
          res.json({
            code: 1,
            data: { name: 'peter' }
          })
        })
        app.get('/api/goods', (req, res) => {
          res.json({
            code: 1,
            slider: [
              { id: 21, img: '/img/01.jpg' },
              { id: 22, img: '/img/02.jpg' },
              { id: 23, img: '/img/03.jpg' },
              { id: 24, img: '/img/04.jpg' }
            ],
            data: {
              fe: [
                { id: 1, title: 'vue.js实战', price: 122, img: '/img/01.jpg', count: 98 },
                { id: 2, title: '前端经典案例分析', price: 100, img: '/img/02.jpg', count: 79 },
                { id: 3, title: 'react入门', price: 87, img: '/img/03.jpg', count: 203 }
              ],
              java: [
                { id: 4, title: 'spring框架', price: 231, img: '/img/04.jpg', count: 100 },
                { id: 5, title: '简析java8', price: 143, img: '/img/05.jpg', count: 92 },
                { id: 6, title: '图解jwt', price: 87, img: '/img/06.jpg', count: 64 }
              ],
              python: [
                { id: 7, title: '利用Python轻松学数学', price: 124, img: '/img/07.jpg', count: 11 },
                { id: 8, title: 'python软件app设计', price: 79, img: '/img/08.jpg', count: 28 },
                { id: 9, title: 'python爬虫', price: 185, img: '/img/09.jpg', count: 23 }
              ],
            },
            keys: ['fe', 'java', 'python']
          })
        })
      }
    }
  }
}
