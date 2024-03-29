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
      schedules: [],
      promotionDetail: [],
      mainCategoryFilter: [],
      dynamicMainCategoryFilter: [],
      popularCategories: [],
      mainCategoryChildren: [],
      banners: [],
      eventSchedules: [],
      promotionCategories: [],
      subCategoryFilter: [],
    };
  },
  getters,
  mutations,
  actions,
};
