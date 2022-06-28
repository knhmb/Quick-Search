import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import dashboardModule from "./modules/dashboard";
import authModule from "./modules/auth";

const store = createStore({
  state() {
    return {
      formTitle: "登入",
    };
  },
  getters,
  mutations,
  actions,
  modules: {
    dashboard: dashboardModule,
    auth: authModule,
  },
});

export default store;
