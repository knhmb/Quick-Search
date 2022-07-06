import axios from "axios";

export default {
  async postSchedule(_, payload) {
    const userToken = localStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/shops/schedules", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
  async postReview(_, payload) {
    const userToken = localStorage.getItem("accessToken");

    const response = await axios.post("/api/v1/accounts/comments/", payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
};
