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
  SET_SEARCH_VALUE(state, payload) {
    state.searchValue = payload;
    console.log(state.searchValue);
  },
  SET_SELECTED_MAIN_CATEGORY(state, payload) {
    state.selectedMainCategory = payload;
  },
  RESET_SELECTED_MAIN_CATEGORY(state) {
    state.selectedMainCategory = "";
  },
  UPDATE_DISCOUNT(state, payload) {
    state.discount = payload;
    // if (!state.discount.includes(payload)) {
    //   state.discount.push(payload);
    // }
    // state.discount.filter((item) => console.log(item));
    console.log(state.discount);
  },
  RESET_DISCOUNT(state) {
    state.discount = [];
  },
  UPDATE_PAYMENT_METHOD(state, payload) {
    state.paymentMethod = payload;
  },
  RESET_PAYMENT_METHOD(state) {
    state.paymentMethod = [];
  },
  UPDATE_PRICE_RANGE(state, payload) {
    state.priceRange = payload;
    console.log(state.priceRange);
  },
  RESET_PRICE_RANGE(state) {
    state.priceRange = [0, 1000000];
  },
  UPDATE_DATA(state, payload) {
    state.data = payload;
    console.log(state.data);
  },
  STORE_SELECTED_AREAS(state, payload) {
    state.selectedAreas = payload;
  },
  SET_SELECTED_SUB_CATEGORY(state, payload) {
    state.selectedSubCategory = payload;
  },
  RESET_SELECTED_SUB_CATEGORY(state) {
    state.selectedSubCategory = "";
  },
  SET_SELECTED_SUB_CATEGORY_SLUG(state, payload) {
    state.selectedSubCategorySlug = payload;
  },
};
