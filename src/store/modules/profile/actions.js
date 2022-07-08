import axios from "axios";

export default {
  async getBookings(context) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/accounts/bookings`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    context.commit("SET_BOOKINGS", response.data.items);
  },
  async updateUser(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.put(
      `/api/v1/accounts/${payload.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(response);
  },
  async getUser(context, payload) {
    console.log(context);
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/accounts/${payload}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    context.commit("auth/UPDATE_USER", response.data.item, { root: true });
  },

  async getSingleBooking(context, id) {
    const userToken = sessionStorage.getItem("accessToken");
    const response = await axios.get(`/api/v1/accounts/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    context.commit("SET_SINGLE_BOOKING", response.data.item);
  },
};
