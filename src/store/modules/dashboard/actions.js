import axios from "axios";
import i18n from "../../../i18n";

export default {
  async getCategories() {
    const response = await axios.get("/api/v1/cms/categories/", {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
  },
  async getLanguages(context) {
    const response = await axios.get("/api/v1/system/languages");
    console.log(response);
    context.commit("SET_LANGUAGES", response.data.items);
  },
  async getContent(context) {
    const response = await axios.get("/api/v1/cms/contents", {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_FOOTER_CONTENT", response.data.items);
  },
  async getPromotions(context) {
    const response = await axios.get("/api/v1/shops/promotions", {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
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
        filter: `parent:{"$eq": '${payload}'}`,
      },
    });
    console.log(response);
    context.commit("SET_FILTERS_GROUP", response.data.items);
  },
  async getFiltersItem(context) {
    const response = await axios.get("/api/v1/shops/filters/items", {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_FILTERS_ITEM", response.data.items);
  },
  async getSchedules(context) {
    const response = await axios.get("/api/v1/shops/schedules", {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_SCHEDULES", response.data.items);
  },
  async promotionDetail(context, payload) {
    const response = await axios.get(`/api/v1/shops/promotions/${payload}`, {
      headers: {
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_PROMOTION_DETAIL", response.data.item);
  },
  async getSubCategory(context) {
    const response = await axios.get("/api/v1/shops/categories", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `parent:{"$eq":""}`,
        sort: "createdAt",
      },
    });
    console.log(response);
    context.commit("SET_CATEGORIES", response.data.items);
  },
  async getDynamicFilterGroup(context, payload) {
    const response = await axios.get("/api/v1/shops/filters/groups", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `category:${payload}`,
        sort: "createdAt",
      },
    });
    console.log(response);
    // if (response.data.items.length > 0) {
    //   response.data.items.forEach((item) => {
    //     context.dispatch("getDynamicFilters", item);
    //   });
    // }
    context.commit("SET_DYNAMIC_FILTER_GROUP", response.data.items);
  },
  async getMainCategoryFilter(context, payload) {
    const response = await axios.get("/api/v1/shops/filters/groups", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `category:${payload}`,
        sort: "createdAt",
      },
    });
    console.log(response);
    context.commit("SET_MAIN_CATEGORY_FILTER", response.data.items);
    const data = response.data.items;
    data.forEach((item) => {
      context.dispatch(
        "getDynamicMainCategoryFilters",
        item.slug
        // response.data.items[0].category
      );
    });
    // context.dispatch(
    //   "getDynamicMainCategoryFilters",
    //   payload
    //   // response.data.items[0].category
    // );
  },
  async getDynamicMainCategoryFilters(context, payload) {
    console.log(payload);
    const response = await axios.get("/api/v1/shops/filters/items", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `group:${payload}`,
      },
    });
    console.log(response);
    context.commit("SET_DYNAMIC_MAIN_CATEGORY_FILTER", response.data.items);
  },
  async getDynamicFilters(context, payload) {
    const response = await axios.get("/api/v1/shops/filters/items", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `group:${payload.slug}`,
        sort: "createdAt",
      },
    });
    console.log(response);
    context.commit("SET_DYNAMIC_FILTERS", response.data.items);
  },
  async getPopularGroups(context) {
    const response = await axios.get("/api/v1/shops/categories", {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter: `popular:true`,
        sort: "createdAt",
      },
    });
    console.log(response);
    context.commit("SET_POPULAR_CATEGORIES", response.data.items);
  },
};
