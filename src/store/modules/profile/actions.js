import axios from "axios";

export default {
  async getBookings() {
    const userToken = localStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/accounts/bookings/", {
      headers: {
        Authorization: userToken,
      },
    });
    console.log(response);
  },
};
