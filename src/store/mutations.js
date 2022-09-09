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
};
