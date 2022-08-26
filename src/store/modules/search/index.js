import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      searchItems: [],
      singleItem: [],
      compareArr: [],
      checkList: {},
    };
  },
  getters,
  mutations,
  actions,
};
