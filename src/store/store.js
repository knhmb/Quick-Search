import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import i18n from "../i18n";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import dashboardModule from "./modules/dashboard";
import authModule from "./modules/auth";
import profileModule from "./modules/profile";
import searchModule from "./modules/search";
import shopModule from "./modules/shop";

const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state() {
    return {
      formTitle: i18n.global.t("login"),
      authDialog: "",
      category: "",
      // formTitle: "登入",
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
    shop: shopModule,
  },
});

export default store;
