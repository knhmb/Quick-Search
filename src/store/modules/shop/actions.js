import axios from "axios";

export default {
  async postSchedule(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/shops/schedules", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
  async postReview(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/accounts/comments/", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
  async getSchedule(_, payload) {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/shops/schedules`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
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
      },
    });
    console.log(response);
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
};
