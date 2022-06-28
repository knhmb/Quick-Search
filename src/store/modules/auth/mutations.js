export default {
  LOGIN(state, payload) {
    state.currentUserDetails = payload;
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.currentUserDetails = [];
  },
};
