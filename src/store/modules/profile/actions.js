import axios from "axios";

export default {
  async getBookings(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/accounts/bookings/${payload}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
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
  async getComments() {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/accounts/comments", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
};
