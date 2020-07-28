import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 有令牌
    if (to.path === "/login") {
      // ，无需登录，去首页
      next({ path: "/" });
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // 有角色
        next();
      } else {
        // 无角色
        try {
          const { roles } = await store.dispatch("user/getInfo");
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    // 无令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 访问页面在白名单内
      next();
    } else {
      // 不在白名单，需要登录
      next(`/login?redirect=${to.path}`);
    }
  }
});
