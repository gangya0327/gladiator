const express = require("express");
const Vue = require("vue");

const app = express();

// 创建渲染器
const renderer = require("vue-server-renderer").createRenderer();

//创建vue实例
const vm = new Vue({
  data: { count: 1 },
  template: `
    <div>{{count}}</div>
  `
});

// 服务端路由声明
app.get("/", async function(req, res) {
  try {
    const html = await renderer.renderToString(vm);
    res.send(html);
  } catch (error) {
    res.status(500).send("Internal Serve Error");
  }
});

app.listen(3000, () => {
  console.log("渲染服务器3000启动");
});
