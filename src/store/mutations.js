export default {
  changeFormTitle(state, payload) {
    state.formTitle = payload;
  },
  OPEN_DIALOG(state, payload) {
    state.authDialog = payload;
  },
};
