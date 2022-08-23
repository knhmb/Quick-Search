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
    const arr = [];
    arr.push(payload);
    arr.forEach((item) => {
      state.dynamicFilters.push(item);
    });
    // state.dynamicFilters.push(payload);
    console.log(state.dynamicFilters);
  },
  RESET_DYNAMIC_FILTERS(state) {
    state.dynamicFilters = [];
  },
  RESET_DYNAMIC_FILTER_GROUP(state) {
    state.dynamicFilterGroup = [];
  },
};
