export default {
  changeFormTitle(state, payload) {
    state.formTitle = payload;
  },
  OPEN_DIALOG(state, payload) {
    state.authDialog = payload;
  },
  SET_CATEGORY(state, payload) {
    state.category = payload;
  },
  SET_SELECTED_SHOP_SLUG(state, payload) {
    state.selectedShopSlug = payload;
  },
  SET_CATEGORY_ID(state, payload) {
    state.categoryId = payload;
  },
  SET_SELECTED_MAIN_CATEGORY_SLUG(state, payload) {
    state.selectedMainCategorySlug = payload;
  },
};
