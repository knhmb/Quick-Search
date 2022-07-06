import axios from "axios";

export default {
  async searchItem(context, payload) {
    const response = await axios.get(
      `/api/v1/shops${payload.search ? `?search=${payload.search}` : ""}`
    );
    console.log(response);
    context.commit("SET_SEARCH_ITEMS", response.data.items);
  },
  async filterSearch(_, payload) {
    console.log(payload);
    const response = await axios.get(`/api/v1/shops`, {
      params: {
        search: payload.query ? payload.query : undefined,
        filter:
          `${payload.area ? `area:${payload.area}` : ""}${
            payload.price
              ? `,price:${payload.price[0]}-${payload.price[1]}`
              : ""
          }${payload.discount ? `,discount:${payload.discount}` : ""}${
            payload.payment ? `,payment:${payload.payment}` : ""
          }` || undefined,
      },
    });
    console.log(response);
  },
  async searchSingleShop(context, payload) {
    // const userToken = localStorage.getItem("accessToken");
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/shops/${payload.slug}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    context.commit("SET_SINGLE_ITEM", response.data.item);
  },
  //   async filterSearch(_, payload) {
  //     console.log(payload.area);
  //     const response = await axios.get(
  //       `/api/v1/shops${payload.query ? `?search=${payload.query}` : ""}${
  //         payload.area ? `&filter=area:${payload.area}` : ""
  //       }${
  //         payload.price ? `,price:${payload.price[0]}-${payload.price[1]}` : ""
  //       }${payload.discount ? `,discount:${payload.discount}` : ""}${
  //         payload.payment ? `,payment:${payload.payment}` : ""
  //       }`
  //     );
  //     console.log(response);
  //   },
};
