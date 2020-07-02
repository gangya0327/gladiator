module.exports = {
  publicPath: '/kcart',
  configureWebpack: {
    devServer: {
      before(app) {
        // app是express实例
        app.get('/goods', (req, res) => {
          res.json([
            { id: 1, text: 'abc' },
            { id: 2, text: 'ddd' }
          ])
        })
      }
    }
  }
}