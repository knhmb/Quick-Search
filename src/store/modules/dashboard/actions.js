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
  async getContent(context) {
    const response = await axios.get("/api/v1/cms/contents");
    console.log(response);
    context.commit("SET_FOOTER_CONTENT", response.data.items);
  },
  async getPromotions(context) {
    const response = await axios.get("/api/v1/shops/promotions");
    console.log(response);
    context.commit("SET_PROMOTIONS", response.data.items);
  },
  async getFiltersGroup(context, payload) {
    // const response = await axios.get("/api/v1/shops/filters/groups", {
    //   params: {
    //     filter: `parent:{"$eq":""}`,
    //   },
    // });
    const response = await axios.get("/api/v1/shops/categories", {
      params: {
        filter: `parent:{"$eq":${payload}}`,
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
  async getSchedules(context) {
    const response = await axios.get("/api/v1/shops/schedules");
    console.log(response);
    context.commit("SET_SCHEDULES", response.data.items);
  },
  async promotionDetail(context, payload) {
    const response = await axios.get(`/api/v1/shops/promotions/${payload}`);
    console.log(response);
    context.commit("SET_PROMOTION_DETAIL", response.data.item);
  },
  async getSubCategory(context) {
    const response = await axios.get("/api/v1/shops/categories");
    console.log(response);
    context.commit("SET_CATEGORIES", response.data.items);
  },
  async getDynamicFilterGroup(context, payload) {
    const response = await axios.get("/api/v1/shops/filters/groups", {
      params: {
        filter: `category:${payload}`,
      },
    });
    console.log(response);
    if (response.data.items.length > 0) {
      response.data.items.forEach((item) => {
        context.dispatch("getDynamicFilters", item);
      });
    }
    // response.data.items.forEach((item) => {
    //   context.dispatch("getDynamicFilters", item);
    // });
    context.commit("SET_DYNAMIC_FILTER_GROUP", response.data.items);
  },
  async getDynamicFilters(context, payload) {
    const response = await axios.get("/api/v1/shops/filters/items", {
      params: {
        filter: `group:${payload.slug}`,
      },
    });
    // console.log(response);
    context.commit("SET_DYNAMIC_FILTERS", response.data.items);
  },
};
