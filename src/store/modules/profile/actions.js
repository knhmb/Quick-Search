import axios from "axios";
import i18n from "../../../i18n";

export default {
  async getBookings(context) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/accounts/bookings`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
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
          "accept-language": i18n.global.locale,
        },
      }
    );
    console.log(response);
  },
  async updateUserAvatar(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.put(
      `/api/v1/accounts/${payload.id}`,
      { avatar: payload.avatar },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "accept-language": i18n.global.locale,
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
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("auth/LOGIN", response.data.item, { root: true });
  },

  async getSingleBooking(context, id) {
    const userToken = sessionStorage.getItem("accessToken");
    const response = await axios.get(`/api/v1/accounts/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    response.data.item.resources = response.data.resources;
    context.commit("SET_SINGLE_BOOKING", response.data.item);
  },
  async getPromotions(context) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/shops/promotions", {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_PROMOTIONS", response.data.items);
  },
  async getComments(context, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/accounts/comments", {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `account:${payload}`,
      },
    });
    console.log(response);
    context.commit("SET_PROFILE_MESSAGES", response.data.items);
  },
  async getAccountPromotions(context) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/accounts/promotions", {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_ACCOUNT_PROMOTIONS", response.data.items);
  },
  async getPromotionDetail(context, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/shops/promotions/${payload}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    context.commit("SET_PROMOTION_DETAIL", response.data.item);
  },
  async getImage(context, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/system/uploads/${payload}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    context.commit("SET_IMAGE", response.data);
  },
  async getProfileMessages(context) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/application/messages", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    context.commit("SET_MESSAGES", response.data.items);
  },
  // async getMessages(context) {
  //   const userToken = localStorage.getItem("accessToken");

  //   const response = await axios.get("/api/v1/application/messages", {
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   });
  //   context.commit("SET_MESSAGES", response.data.items);
  // },
};
