const path = require("path");

const port = 7077;
const title = "best review";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/best",
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // 配置svg规则，排除icon目录
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icon"))
      .end();
    // 新增icon目录，添加svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  }
};
