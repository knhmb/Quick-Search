export default {
  data() {
    return {
      isSearchItemsLoaded: false,
    };
  },
  //   watch: {
  //     $i18n: {
  //       deep: true,
  //       async handler() {
  //         this.fetchData();
  //       },
  //     },
  //   },
  computed: {
    mainCategoryChildren() {
      return this.$store.getters["dashboard/mainCategoryChildren"];
    },
  },
  methods: {
    async fetchData() {
      if (Object.keys(this.$route.query).length > 0) {
        this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
        this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
        const routeFilter = this.$route.query.filter
          ? JSON.parse(this.$route.query.filter)
          : "";

        const category = this.categories.find(
          (item) => item.slug === routeFilter.mainCategory
        );
        console.log(category);
        if (category) {
          this.$store.commit(
            "search/SET_SELECTED_MAIN_CATEGORY",
            category.name
          );
          this.$store.commit("SET_SELECTED_MAIN_CATEGORY_SLUG", category.slug);
          this.$store.commit(
            "dashboard/SET_MAIN_CATEGORY_CHILDREN",
            category.resources.children
          );
        }

        console.log(this.mainCategoryChildren);

        const subCategory = this.mainCategoryChildren.find(
          (item) => item.slug === routeFilter.subCategory
        );
        console.log(subCategory);

        if (JSON.parse(this.$route.query.filter).subCategory && subCategory) {
          this.$store.commit(
            "search/SET_SELECTED_SUB_CATEGORY",
            subCategory.name
          );
          this.$store.commit(
            "search/SET_SELECTED_SUB_CATEGORY_SLUG",
            subCategory.slug
          );

          this.$store.dispatch(
            "dashboard/getSubCategoryFilter",
            subCategory.slug
          );
        } else if (JSON.parse(this.$route.query.filter).mainCategory) {
          this.$store.dispatch(
            "dashboard/getMainCategoryFilter",
            category.slug
          );
        }

        let dataObject = {
          dynamicFilter: routeFilter.dynamicFilter
            ? routeFilter.dynamicFilter
            : "",
          discount: routeFilter.discount ? routeFilter.discount : "",
          area: routeFilter.area ? routeFilter.area : "",
          price: routeFilter.price ? routeFilter.price : "",
          paymentMethod: routeFilter.payment ? routeFilter.payment : "",
          page: 1,
          pageSize: 15,
        };

        let minPrice, maxPrice;

        if (dataObject.price) {
          const finalPrice = dataObject.price
            .split("priceRange.0:")
            .pop()
            .split(`"$gte":`)
            .pop()
            .split(`,"$lte":`);

          minPrice = finalPrice[0];
          maxPrice = finalPrice[1].replace("}", "");
          this.$store.commit("search/UPDATE_PRICE_RANGE", [minPrice, maxPrice]);
        }
        // const finalPrice = dataObject.price
        //   .split("priceRange.0:")
        //   .pop()
        //   .split(`"$gte":`)
        //   .pop()
        //   .split(`,"$lte":`);

        // const minPrice = finalPrice[0];
        // const maxPrice = finalPrice[1].replace("}", "");
        // this.$store.commit("search/UPDATE_PRICE_RANGE", [minPrice, maxPrice]);

        const filter = {
          mainCategory: routeFilter.mainCategory
            ? routeFilter.mainCategory
            : undefined,
          subCategory: routeFilter.subCategory
            ? routeFilter.subCategory
            : undefined,
          dynamicFilter: routeFilter.dynamicFilter
            ? routeFilter.dynamicFilter
            : undefined,
          area: routeFilter.area ? routeFilter.area : undefined,
          discount: routeFilter.discount ? routeFilter.discount : undefined,
          payment: routeFilter.payment ? routeFilter.payment : undefined,
          price: routeFilter.price
            ? `priceRange.0:{"$gte":${minPrice},"$lte":${maxPrice}},priceRange.1:{"$gte":${minPrice},"$lte":${maxPrice}}`
            : undefined,
        };
        console.log(filter.price);

        if (this.$route.path === "/advanced-search") {
          await this.$store
            .dispatch("search/advancedFilter", {
              category: routeFilter.subCategory
                ? routeFilter.subCategory
                : routeFilter.mainCategory,
              data: dataObject,
            })
            .then(() => {
              this.$emit("closeDialog", false);

              this.$router.push({
                path: "/advanced-search",
                query: {
                  filter: JSON.stringify(filter),
                },
              });
            });
          this.isSearchItemsLoaded = true;
        } else {
          this.$store
            .dispatch("search/advancedFilter", {
              category: "",
              data: { page: 1 },
            })
            .then(() => {
              this.isSearchItemsLoaded = true;
            });
        }
      }

      //     await this.$store
      //       .dispatch("search/advancedFilter", {
      //         category: routeFilter.subCategory
      //           ? routeFilter.subCategory
      //           : routeFilter.mainCategory,
      //         data: dataObject,
      //       })
      //       .then(() => {
      //         this.$emit("closeDialog", false);

      //         this.$router.push({
      //           path: "/advanced-search",
      //           query: {
      //             filter: JSON.stringify(filter),
      //           },
      //         });
      //       });
      //     this.isSearchItemsLoaded = true;
      //   } else {
      //     this.$store
      //       .dispatch("search/advancedFilter", {
      //         category: "",
      //         data: { page: 1 },
      //       })
      //       .then(() => {
      //         this.isSearchItemsLoaded = true;
      //       });
      //   }
      //  else {
      //   this.$store
      //     .dispatch("search/advancedFilter", {
      //       category: this.categorySlug ? this.categorySlug : "",
      //       data: dataObject,
      //     })
      //     .then(() => {
      //       this.$emit("closeDialog", false);

      //       this.$router.push({
      //         path: "/advanced-search",
      //         query: {
      //           filter: JSON.stringify(filter),
      //         },
      //       });
      //     });
      // }
    },
  },
};
