import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      bookings: [],
      singleBooking: [],
      promotions: [],
      profileMessages: [],
      accountPromotions: [],
      promotionDetail: [],
      image: null,
      messages: [],
    };
  },
  getters,
  mutations,
  actions,
};
