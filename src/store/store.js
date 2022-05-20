import { createStore } from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const store = createStore({
  state() {
    return {
      formTitle: "登入",
    };
  },
  getters,
  mutations,
  actions,
});

export default store;
