// node
module.exports = {
    publicPath: '/kcart',
    configureWebpack: {
        devServer: {
            before(app) {
                // app是express实例
                app.get('/goods', (reg, res) => {
                    res.json([
                        { id: 1, text: "web" },
                        { id: 2, text: "python" },
                        { id: 3, text: "java" },
                    ])
                })
            }
        }
    }
}