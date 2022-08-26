export default {
  SET_SEARCH_ITEMS(state, payload) {
    state.searchItems = payload;
  },
  SET_SINGLE_ITEM(state, payload) {
    state.singleItem = payload;
  },
  SET_COMPARE_ARR(state, payload) {
    state.compareArr = payload;
    console.log(state.compareArr);
  },
  UPDATE_CHECKLIST(state, payload) {
    state.checkList = payload;
    console.log(state.checkList);
  },
};
