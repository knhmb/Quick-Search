export default {
  SET_USER(state, payload, rootState) {
    console.log(state);
    console.log(payload);
    console.log(rootState);
  },
  SET_BOOKINGS(state, payload) {
    state.bookings = payload;
  },
  SET_SINGLE_BOOKING(state, payload) {
    state.singleBooking = payload;
  },
  SET_PROMOTIONS(state, payload) {
    state.promotions = payload;
  },
  SET_PROFILE_MESSAGES(state, payload) {
    state.profileMessages = payload;
  },
};
