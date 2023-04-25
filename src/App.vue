<template>
  <template v-if="isDataLoaded">
    <the-header></the-header>
    <router-view></router-view>
    <the-footer></the-footer>
  </template>
</template>

<script>
import TheHeader from "./components/common/TheHeader.vue";
import TheFooter from "./components/common/TheFooter.vue";
import fetchData from "@/mixins/FetchData.js";
import { initApple } from "./plugins/apple-sdk";
import { useChatWoot } from "@huntersofbook/chatwoot-vue";

export default {
  mixins: [fetchData],

  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isDataLoaded: false,
    };
  },
  watch: {
    $i18n: {
      deep: true,
      async handler() {
        this.$store.dispatch("dashboard/getSubCategory").then(() => {
          this.fetchData();
          // if (this.$route.query.filter) {
          //   const cat = JSON.parse(this.$route.query.filter).subCategory;
          //   const main = this.categories.find(
          //     (mainSlug) => mainSlug.slug === this.selectedMainCategorySlug
          //   );
          //   console.log(main);
          //   const sub = main.resources.children.find(
          //     (subItem) => subItem.slug === cat
          //   );
          //   console.log(sub);
          //   if (sub) {
          //     this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", sub.name);
          //     this.$store.dispatch("dashboard/getSubCategoryFilter", cat);
          //   }
          //   if (!this.selectedSubCategory) {
          //     this.$store.dispatch(
          //       "dashboard/getMainCategoryFilter",
          //       main.slug
          //     );
          //   }
          //   // this.$store.dispatch("dashboard/getSubCategoryFilter", cat);
          //   this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", main.name);
          //   this.$store.commit(
          //     "dashboard/SET_MAIN_CATEGORY_CHILDREN",
          //     main.resources.children
          //   );
          // }
        });
        this.$store.dispatch("dashboard/getCategories");

        this.$store.dispatch("dashboard/getContent");
        this.$store.dispatch("dashboard/getPromotions");
        // this.$store.dispatch("dashboard/getFiltersGroup");
        this.$store.dispatch("dashboard/getFiltersItem");
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
    selectedSubCategory() {
      return this.$store.getters["search/selectedSubCategory"];
    },
  },
  mounted() {
    initApple();
  },
  async created() {
    const { toggleBubbleVisibility } = useChatWoot();
    toggleBubbleVisibility("hide");
    await this.$store.dispatch("dashboard/getCategories");
    await this.$store.dispatch("dashboard/getLanguages");
    await this.$store.dispatch("dashboard/getContent");
    await this.$store.dispatch("dashboard/getPromotions");
    await this.$store.dispatch("dashboard/getPromotionCategories");
    // this.$store.dispatch("dashboard/getFiltersGroup");
    await this.$store.dispatch("dashboard/getFiltersItem");
    await this.$store.dispatch("dashboard/getSubCategory");
    this.isDataLoaded = true;
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  /* color: #393939; */
}
</style>
