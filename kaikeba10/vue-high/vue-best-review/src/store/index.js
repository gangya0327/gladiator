import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import permission from "./modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, permission },
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
});
