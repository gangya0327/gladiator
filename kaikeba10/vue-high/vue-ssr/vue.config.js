// 导入两个webpack插件，负责生成服务端和客户端bundle
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
// 优化策略
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
// 根据WEBPACK_TARGET环境变量做响应输出
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  css: {
    extract: false
  },
  outputDir: "./dist/" + target,
  configureWebpack: () => ({
    // 将entry指向应用程序的server/client文件
    entry: `./src/entry-${target}.js`,
    // 对bundle renderer提供source-map支持
    devtool: "source-map",
    // 允许webpack以node以适用方式方式处理动态导入（dynamic import）
    // 并且还会在编译vue组件时告知'vue-loader'输送面向服务器代码（server-oriented code）
    target: TARGET_NODE ? "node" : "web",
    // mock node中全局变量
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处告知server bundle适用node风格导出模块
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: TARGET_NODE
      ? nodeExternals({
        whitelist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
};
