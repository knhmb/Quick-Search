<template>
  <section class="advanced-search" v-if="isSearchItemsLoaded">
    <!-- <top-section @sort="setSort"></top-section> -->
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="24" :lg="7">
          <left-section
            :current-page="currentPage"
            :sorting="sorting"
          ></left-section>
        </el-col>
        <el-col :sm="24" :lg="17">
          <right-section
            :current-page="currentPage"
            @sort="setSort"
            @updatePage="currentPage = $event"
          ></right-section>
        </el-col>
      </el-row>
    </base-container>
  </section>
</template>

<script>
import TopSection from "../components/advanced-search/TopSection.vue";
import LeftSection from "../components/advanced-search/LeftSection.vue";
import RightSection from "../components/advanced-search/RightSection.vue";

import { ref } from "vue";

export default {
  components: {
    TopSection,
    LeftSection,
    RightSection,
  },
  setup() {
    const sorting = ref("");
    const currentPage = ref(1);

    function setSort(option) {
      console.log(option);
      sorting.value = option;
      console.log(sorting.value);
    }

    return { setSort, sorting, currentPage };
  },
  data() {
    return {
      isSearchItemsLoaded: false,
    };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
        this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");

        // const cat = this.$route.query.filter.split(":").pop();
        // const main = this.categories.find(
        //   (mainSlug) => mainSlug.slug === this.selectedMainCategorySlug
        // );
        // console.log(main);
        // this.$store.dispatch("dashboard/getSubCategoryFilter", cat);
        // this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", main.name);
        // this.$store.commit(
        //   "dashboard/SET_MAIN_CATEGORY_CHILDREN",
        //   main.resources.children
        // );

        // this.$store
        //   .dispatch(
        //     "dashboard/getMainCategoryFilter",
        //     this.selectedMainCategorySlug
        //   )
        //   .then(() => {
        //     console.log(this.dynamicFilterGroup);
        //     const sub = main.children.find((subItem) => subItem === cat);
        //     // const data = this.categories.find((item) => {
        //     //   console.log(item);
        //     //   // item.slug === cat;
        //     // });
        //     console.log(sub);
        //     this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", main.name);
        //     this.$store.commit(
        //       "dashboard/SET_MAIN_CATEGORY_CHILDREN",
        //       main.resources.children
        //     );
        //   });
      },
    },
  },
  computed: {
    selectedMainCategorySlug() {
      return this.$store.getters.selectedMainCategorySlug;
    },
    categories() {
      return this.$store.getters["dashboard/categories"];
    },
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    mainCategoryChildren() {
      return this.$store.getters["dashboard/mainCategoryChildren"];
    },
    mainCat() {
      return this.$route.query.filter
        ? JSON.parse(this.$route.query.filter).mainCategory
        : "";
    },
    subCat() {
      return this.$route.query.filter
        ? JSON.parse(this.$route.query.filter).subCategory
        : "";
    },
  },
  async mounted() {
    const routeFilter = this.$route.query.filter
      ? JSON.parse(this.$route.query.filter)
      : "";

    const category = this.categories.find(
      (item) => item.slug === routeFilter.mainCategory
    );
    console.log(category);

    this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", category.name);
    this.$store.commit("SET_SELECTED_MAIN_CATEGORY_SLUG", category.slug);

    this.$store.commit(
      "dashboard/SET_MAIN_CATEGORY_CHILDREN",
      category.resources.children
    );
    console.log(this.mainCategoryChildren);

    const subCategory = this.mainCategoryChildren.find(
      (item) => item.slug === routeFilter.subCategory
    );
    console.log(subCategory);

    if (JSON.parse(this.$route.query.filter).subCategory) {
      this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", subCategory.name);
      this.$store.commit(
        "search/SET_SELECTED_SUB_CATEGORY_SLUG",
        subCategory.slug
      );
      this.$store.dispatch("dashboard/getSubCategoryFilter", subCategory.slug);
    } else {
      this.$store.dispatch("dashboard/getMainCategoryFilter", category.slug);
    }

    let dataObject = {
      dynamicFilter: routeFilter.dynamicFilter ? routeFilter.dynamicFilter : "",
      discount: routeFilter.discount ? routeFilter.discount : "",
      area: routeFilter.area ? routeFilter.area : "",
      price: routeFilter.price ? routeFilter.price : "",
      paymentMethod: routeFilter.payment ? routeFilter.payment : "",
      page: 1,
      pageSize: 15,
    };

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
        ? `priceRange.0:{"$gte":${dataObject.price[0]},"$lte":${dataObject.price[1]}},priceRange.1:{"$gte":${dataObject.price[0]},"$lte":${dataObject.price[1]}}`
        : undefined,
    };

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
};
</script>

<style scoped>
.advanced-search {
  background: #ddd;
}
</style>