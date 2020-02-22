const express = require('express')

const app = express()

app.get('/hello', (req, res) => {
    res.send("hello world")
})

app.listen(8081)

// 顶层路由设计：不需要有物理文件映射路由