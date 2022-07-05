import axios from "axios";

export default {
  async register(_, payload) {
    const response = await axios.post("/api/v1/accounts/", payload);
    console.log(response);
  },
  async login(context, payload) {
    const response = await axios.post("/api/v1/authenticate/", payload);
    console.log(response);
    context.commit("LOGIN", response.data.item);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  },
  logout(context) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    context.commit("LOGOUT");
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
};
