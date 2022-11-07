export default {
  SET_LANGUAGES(state, payload) {
    state.languages = payload;
  },
  SET_FILTERS_GROUP(state, payload) {
    state.filtersGroup = payload;
  },
  SET_FILTERS_ITEM(state, payload) {
    state.filtersItem = payload;
  },
  SET_FOOTER_CONTENT(state, payload) {
    state.footerContent = payload;
  },
  SET_PROMOTIONS(state, payload) {
    state.promotions = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_DYNAMIC_FILTER_GROUP(state, payload) {
    state.dynamicFilterGroup = payload;
  },
  SET_DYNAMIC_FILTERS(state, payload) {
    console.log(payload);
    const arr = [];
    // let uniqueAddresses = [];
    // const index = state.dynamicFilters.findIndex(object => object.id === value2.id);
    payload.forEach((item) => {
      arr.push(item);
    });
    console.log(arr);

    arr.forEach((item) => {
      const index = state.dynamicFilters.findIndex(
        (object) => object.id === item.id
      );
      console.log(index);
      if (index === -1) {
        state.dynamicFilters.push(item);
      }
    });
    console.log(state.dynamicFilters);
  },
  RESET_DYNAMIC_FILTERS(state) {
    state.dynamicFilters = [];
  },
  RESET_DYNAMIC_FILTER_GROUP(state) {
    state.dynamicFilterGroup = [];
  },
  SET_SCHEDULES(state, payload) {
    state.schedules = payload;
  },
  SET_PROMOTION_DETAIL(state, payload) {
    state.promotionDetail = payload;
  },
  SET_MAIN_CATEGORY_FILTER(state, payload) {
    state.mainCategoryFilter = payload;
  },
  SET_DYNAMIC_MAIN_CATEGORY_FILTER(state, payload) {
    const arr = [];
    arr.push(payload);
    arr.forEach((item) => {
      state.dynamicMainCategoryFilter.push(item);
    });
    console.log(state.dynamicMainCategoryFilter);
  },
  RESET_DYNAMIC_MAIN_CATEGORY_FILTER(state) {
    state.dynamicMainCategoryFilter = [];
  },
  RESET_MAIN_CATEGORY_FILTER(state) {
    state.mainCategoryFilter = [];
  },
  SET_POPULAR_CATEGORIES(state, payload) {
    state.popularCategories = payload;
  },
  SET_MAIN_CATEGORY_CHILDREN(state, payload) {
    state.mainCategoryChildren = payload;
    console.log(state.mainCategoryChildren);
  },
  RESET_MAIN_CATEGORY_CHILDREN(state) {
    state.mainCategoryChildren = [];
  },
  SET_BANNERS(state, payload) {
    state.banners = payload;
  },
};
