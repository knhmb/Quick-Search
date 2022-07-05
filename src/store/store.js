import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import dashboardModule from "./modules/dashboard";
import authModule from "./modules/auth";
import profileModule from "./modules/profile";
import searchModule from "./modules/search";

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
    profile: profileModule,
    search: searchModule,
  },
});

export default store;
