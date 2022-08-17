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
};
