import axios from "axios";

export default {
  async searchItem(context, payload) {
    const response = await axios.get(`/api/v1/shops`, {
      params: {
        page: 1,
        pageSize: 15,
        search: payload.search ? payload.search : undefined,
      },
    });
    // const response = await axios.get(
    //   `/api/v1/shops${payload.search ? `?search=${payload.search}` : ""}`
    // );
    console.log(response);
    context.commit("SET_SEARCH_ITEMS", response.data.items);
  },
  async filterSearch(context, payload) {
    console.log(payload);
    let param = "";

    // if (payload.area && payload.price && payload.discount && payload.payment) {
    //   param = `area:${payload.area},price:${payload.price[0]}-${payload.price[1]},discount:${payload.discount},payment:${payload.payment}`;
    // } else if (payload.area && payload.price && payload.discount) {
    //   param = `area:${payload.area},price:${payload.price[0]}-${payload.price[1]},discount:${payload.discount}`;
    // } else if (payload.area && payload.payment && payload.discount) {
    //   param = `area:${payload.area},payment:${payload.payment},discount:${payload.discount}`;
    // } else if (payload.area && payload.payment) {
    //   param = `area:${payload.area},payment:${payload.payment}`;
    // } else if (payload.area && payload.discount) {
    //   param = `area:${payload.area},discount:${payload.discount}`;
    // } else if (payload.area && payload.price) {
    //   param = `area:${payload.area},price:${payload.price[0]}-${payload.price[1]}`;
    // } else if (payload.payment && payload.price) {
    //   param = `payment:${payload.payment},price:${payload.price[0]}-${payload.price[1]}`;
    // } else if (payload.discount && payload.price) {
    //   param = `discount:${payload.discount},price:${payload.price[0]}-${payload.price[1]}`;
    // } else if (payload.discount && payload.payment) {
    //   param = `discount:${payload.discount},payment:${payload.payment}`;
    // } else if (payload.discount) {
    //   param = `discount:${payload.discount}`;
    // } else if (payload.payment) {
    //   param = `payment:${payload.payment}`;
    // } else if (payload.area) {
    //   param = `area:${payload.area}`;
    // } else if (payload.price) {
    //   param = `price:${payload.price[0]}-${payload.price[1]}`;
    // }

    param =
      `${payload.area ? `area:${payload.area},` : ""}${
        payload.price ? `price:${payload.price[0]}-${payload.price[1]},` : ""
      }${payload.discount ? `discount:${payload.discount},` : ""}${
        payload.payment ? `payment:${payload.payment}` : ""
      }` || undefined;

    const response = await axios.get(`/api/v1/shops`, {
      params: {
        search: payload.query.q ? payload.query.q : undefined,
        page: 1,
        pageSize: 10,
        filter: payload.query.filter
          ? payload.query.filter + "," + param
          : param,
        sort: payload.sort ? payload.sort : undefined,
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
      },
    });
    console.log(response);
    context.commit("SET_SINGLE_ITEM", response.data.item);
  },
  async advancedFilter(context, payload) {
    console.log(payload);

    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     filter: payload,
    //   },
    // });
    const response = await axios.get(`/api/v1/shops`, {
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
          }` || undefined,
      },
    });
    // const response = await axios.get(`/api/v1/shops`, {
    //   params: {
    //     filter: `${payload ? payload : undefined}`,
    //   },
    // });
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
