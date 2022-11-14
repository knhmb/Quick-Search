export default {
  LOGIN(state, payload) {
    state.currentUserDetails = payload;
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.currentUserDetails = [];
  },
  SET_USER_FORGOT_PASSWORD_DETAILS(state, payload) {
    state.userForgotPasswordDetails = payload;
  },
  UPDATE_USER(state, payload) {
    state.currentUserDetails.username = payload.username;
  },
  SET_FACEBOOK_USER_DETAILS(state, payload) {
    state.facebookUserDetails = payload;
  },
  SET_FAVORITES(state, payload) {
    state.favorites = payload;
  },
};
