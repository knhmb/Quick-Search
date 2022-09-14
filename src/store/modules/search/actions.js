import axios from "axios";
import route from "../../../route";
import i18n from "../../../i18n";

export default {
  async searchItem(context, payload) {
    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     page: 1,
    //     pageSize: 15,
    //     search: payload.search ? payload.search : undefined,
    //   },
    // });
    const response = await axios.get(`/api/v1/shops/search`, {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        page: 1,
        pageSize: 15,
        search: payload.search ? payload.search : undefined,
      },
    });
    console.log(response);
    context.commit("SET_SEARCH_ITEMS", response.data.items);
  },
  async filterSearch(context, payload) {
    console.log(payload);
    let param = "";

    console.log(payload.query);
    console.log(route.currentRoute._rawValue.query.filter);

    param = `${
      !route.currentRoute._rawValue.query.filter
        ? payload.query
          ? payload.query + ","
          : ""
        : ""
    }${payload.area ? `area:${payload.area},` : ""}${
      payload.price ? `price:${payload.price[0]}-${payload.price[1]},` : ""
    }${payload.discount ? `discount:${payload.discount},` : ""}${
      payload.payment ? `payment:${payload.payment}` : ""
    }`;

    console.log(param);

    const response = await axios.get(`/api/v1/shops`, {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        search: payload.query.q ? payload.query.q : undefined,
        page: 1,
        pageSize: 10,
        filter:
          route.currentRoute._rawValue.query.filter && payload.query
            ? payload.query + "," + param
            : route.currentRoute._rawValue.query.filter
            ? route.currentRoute._rawValue.query.filter + "," + param
            : param,
        // filter: payload.dynamic
        //   ? payload.dynamic + "," + param
        //   : payload.query.filter
        //   ? payload.query.filter + "," + param
        //   : param,
        sort: payload.sort ? payload.sort : undefined,
        // filter: payload.query.filter
        //   ? payload.query.filter + "," + param
        //   : param,
        // // filter: payload.dynamic
        // //   ? payload.dynamic + "," + param
        // //   : payload.query.filter
        // //   ? payload.query.filter + "," + param
        // //   : param,
        // sort: payload.sort ? payload.sort : undefined,
        // `${payload.query.filter ? `${payload.query.filter}` : ""}${
        //   payload.area ? `area:${payload.area},` : ""
        // }${
        //   payload.price
        //     ? `price:${payload.price[0]}-${payload.price[1]},`
        //     : ""
        // }${payload.discount ? `discount:${payload.discount},` : ""}${
        //   payload.payment ? `payment:${payload.payment}` : ""
        // }${payload.sort ? `&sort:${payload.sort}` : ""}` || undefined,
      },
    });
    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     search: payload.query.q ? payload.query : undefined,
    //     filter:
    //       //   `${payload.query.filter ? `${payload.query.filter},` : ""}${
    //       //     payload.area ? `area:${payload.area},` : ""
    //       //   }${
    //       //     payload.price
    //       //       ? `price:${payload.price[0]}-${payload.price[1]},`
    //       //       : ""
    //       //   }${payload.discount ? `discount:${payload.discount},` : ""}${
    //       //     payload.payment ? `payment:${payload.payment},` : ""
    //       //   }` || undefined,
    //       // sort: `${payload.sort ? `sort:${payload.sort},` : ""}`,
    //       `${payload.query.filter ? `${payload.query.filter}` : ""}${
    //         payload.area ? `,area:${payload.area}` : ""
    //       }${
    //         payload.price
    //           ? `,price:${payload.price[0]}-${payload.price[1]}`
    //           : ""
    //       }${payload.discount ? `,discount:${payload.discount}` : ""}${
    //         payload.payment ? `,payment:${payload.payment}` : ""
    //       }${payload.sort ? `&sort:${payload.sort}` : ""}` || undefined,
    //   },
    // });
    console.log(response);
    context.commit("SET_SEARCH_ITEMS", response.data.items);
  },
  async searchSingleShop(context, payload) {
    // const userToken = localStorage.getItem("accessToken");
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(`/api/v1/shops/${payload.slug}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "accept-language": i18n.global.locale,
      },
    });
    console.log(response);
    context.commit("SET_SINGLE_ITEM", response.data);
  },
  async advancedFilter(context, payload) {
    console.log(payload);

    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     filter: payload,
    //   },
    // });
    const response = await axios.get(`/api/v1/shops`, {
      headers: {
        "accept-language": i18n.global.locale,
      },
      params: {
        filter:
          `${payload.dynamicFilter ? `${payload.dynamicFilter},` : ""}${
            payload.area ? `area:${payload.area},` : ""
          }${
            payload.price
              ? `price:${payload.price[0]}-${payload.price[1]},`
              : ""
          }${payload.discount ? `discount:${payload.discount},` : ""}${
            payload.paymentMethod ? `payment:${payload.paymentMethod}` : ""
          }${payload ? `category:${payload}` : ""}` || undefined,
      },
    });
    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     filter: `${payload ? payload : undefined}`,
    //   },
    // });
    console.log(response);
    // context.commit("SET_SINGLE_ITEM", response.data.item);
    context.commit("SET_SEARCH_ITEMS", response.data.items);
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
  async promotion(_, payload) {
    // const userToken = localStorage.getItem("accessToken");
    const userToken = sessionStorage.getItem("accessToken");

    const response = await axios.get(
      `/api/v1/shops/promotions/${payload}/claim`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "accept-language": i18n.global.locale,
        },
      }
    );
    console.log(response);
    // context.commit("SET_SINGLE_ITEM", response.data);
  },
};
