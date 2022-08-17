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
  async getFiltersGroup(context) {
    // const response = await axios.get("/api/v1/shops/filters/groups", {
    //   params: {
    //     filter: `parent:{"$eq":""}`,
    //   },
    // });
    const response = await axios.get("/api/v1/shops/categories", {
      params: {
        filter: `parent:{"$eq":""}`,
      },
    });
    console.log(response);
    context.commit("SET_FILTERS_GROUP", response.data.items);
  },
  async getFiltersItem(context) {
    const response = await axios.get("/api/v1/shops/filters/items");
    console.log(response);
    context.commit("SET_FILTERS_ITEM", response.data.items);
  },
  async getSchedules() {
    const response = await axios.get("/api/v1/shops/schedules");
    console.log(response);
  },
};
