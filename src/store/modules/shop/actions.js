import axios from "axios";
import i18n from "../../../i18n";

export default {
  async postSchedule(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/shops/schedules", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
  },
  async postReview(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/accounts/comments/", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
  },
  async getSchedule(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/shops/schedules`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `shop:${payload.param},date:${{
          $gte: payload.start,
          $lt: payload.end,
        }}`,
      },
    });
    console.log(response);
  },
  async book(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/accounts/bookings/", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
  },
  async claimPromotion(_, promotion) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post(`/api/v1/shops/promotions/${promotion}/claim`, {}, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
  },
  async getComments(context, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/accounts/comments`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `shop:${payload}`,
        page: 1,
        pageSize: 15,
      },
    });
    console.log(response);
    context.commit("SET_COMMENTS", response.data.items);
  },
  // async getShopPlans() {
  //   const userToken = sessionStorage.getItem("accessToken");

  //   const response = await axios.get("/api/v1/shops/plans", {
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   });
  //   console.log(response);
  // },
  async getPhotos() {
    const response = await axios.get("/api/v1/shops");
    console.log("HERERERERERERERERERE");
    console.log(response);
  },
  async removeImage(_, payload) {
    const response = await axios.delete(`/api/v1/system/uploads/${payload}`);
    console.log(response);
  },
};
