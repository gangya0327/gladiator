import { createApp } from "./app";

const { app, router } = createApp();
router.onReady(() => {
  // 挂载
  app.$mount("#app");
});
