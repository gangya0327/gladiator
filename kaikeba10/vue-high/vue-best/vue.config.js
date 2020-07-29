// commomjs语法 nodejs
const port = 7070
const title = 'vue项目最佳实践'

// resolve定义一个绝对路径获取函数
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const bodyParser = require('body-parser')

module.exports = {
  publicPath: "/best-practice/",
  devServer: {
    port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true, // 要不要变更origin头
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: "api"
        }
      }
    },
    before: app => {
      // node服务器代码，基于express
      // bodyParser用来解析post请求中json数据
      app.use(bodyParser.json())
      // app.use(
      //   bodyParser.urlencoded({
      //     extended: true
      //   })
      // )
      // 接口声明
      app.post('/dev-api/user/login', (req, res) => {
        const { username } = req.body
        if (username === 'admin' || username === 'jerry') {
          res.json({
            code: 1,
            data: username
          })
        } else {
          res.json({
            code: 10204,
            message: '用户名密码错误'
          })
        }
      })
      app.get('/dev-api/user/getInfo', (req, res) => {
        const roles = req.headers['x-token'] === 'admin' ? ['admin'] : ['editor']
        res.json({
          code: 1,
          data: roles
        })
      })
    }
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // svg规则配置，排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // 将来使用图标的名称
      .end()
  }
}