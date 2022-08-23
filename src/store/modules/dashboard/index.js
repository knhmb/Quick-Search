import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      languages: [],
      filtersGroup: [],
      filtersItem: [],
      footerContent: [],
      promotions: [],
      categories: [],
      dynamicFilterGroup: [],
      dynamicFilters: [],
    };
  },
  getters,
  mutations,
  actions,
};
