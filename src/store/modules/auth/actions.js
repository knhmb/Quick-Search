import axios from "axios";
import router from "../../../route";

export default {
  async register(_, payload) {
    const response = await axios.post("/api/v1/accounts/", payload);
    console.log(response);
  },
  async login(context, payload) {
    const response = await axios.post("/api/v1/authenticate/", payload);
    console.log(response);
    context.commit("LOGIN", response.data.item);
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);
  },
  logout(context) {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    context.commit("LOGOUT");
    router.replace("/");
  },
  async forgotPassword(context, payload) {
    const response = await axios.post(
      "/api/v1/accounts/forget-password",
      payload
    );
    console.log(response);
    context.commit("SET_USER_FORGOT_PASSWORD_DETAILS", response.data.item);
  },
  async resetPassword(_, payload) {
    const response = await axios.post(
      "/api/v1/accounts/reset-password",
      payload
    );
    console.log(response);
  },
  async checkAccessToken() {
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get("/api/v1/authenticate/", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
  },
  async checkRefreshToken(context) {
    const userToken = sessionStorage.getItem("refreshToken");

    const response = await axios.put(
      "/api/v1/authenticate/",
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    context.commit("LOGIN", response.data.item);
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);
  },
};
