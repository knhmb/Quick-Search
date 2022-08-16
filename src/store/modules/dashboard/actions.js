import axios from "axios";
// import i18n from "../../../i18n";

export default {
  async getCategories() {
    const response = await axios.get("/api/v1/cms/categories/");
    console.log(response);
  },
  async getLanguages(context) {
    const response = await axios.get("/api/v1/system/languages");
    console.log(response);
    context.commit("SET_LANGUAGES", response.data.items);
  },
  async getContent() {
    const response = await axios.get("/api/v1/cms/contents");
    console.log(response);
  },
  async getPromotions() {
    const response = await axios.get("/api/v1/shops/promotions");
    console.log(response);
  },
  async getFiltersGroup() {
    const response = await axios.get("/api/v1/shops/filters/groups");
    console.log(response);
  },
  async getFiltersItem() {
    const response = await axios.get("/api/v1/shops/filters/items");
    console.log(response);
  },
  async getSchedules() {
    const response = await axios.get("/api/v1/shops/schedules");
    console.log(response);
  },
};
