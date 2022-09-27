<template>
  <section class="home">
    <Slider />
    <Main />
  </section>
</template>

<script>
import Slider from "../components/home/Slider.vue";
import Main from "../components/home/Main.vue";

export default {
  components: {
    Slider,
    Main,
  },
  // watch: {
  //   $i18n: {
  //     deep: true,
  //     handler() {
  //       this.$store.dispatch("dashboard/getSubCategory");
  //       this.$store.dispatch("dashboard/getCategories");
  //       this.$store.dispatch("dashboard/getContent");
  //       this.$store.dispatch("dashboard/getPromotions");
  //       // this.$store.dispatch("dashboard/getFiltersGroup");
  //       this.$store.dispatch("dashboard/getFiltersItem");
  //     },
  //   },
  // },
  created() {
    this.$store.commit("OPEN_DIALOG", "");
    this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
    this.$store.commit("dashboard/RESET_DYNAMIC_FILTER_GROUP");
    this.$store.commit("search/UPDATE_CHECKLIST", {});
    this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
    this.$store.commit("dashboard/RESET_MAIN_CATEGORY_FILTER");
    this.$store.commit("search/RESET_SELECTED_MAIN_CATEGORY");
    this.$store.commit("search/RESET_DISCOUNT");
    this.$store.commit("search/RESET_PAYMENT_METHOD");
    this.$store.commit("search/RESET_PRICE_RANGE");
    this.$store.commit("search/RESET_SELECTED_SUB_CATEGORY");
    this.$store.commit("dashboard/RESET_MAIN_CATEGORY_CHILDREN");

    this.$store.dispatch("dashboard/getCategories");
    this.$store.dispatch("dashboard/getLanguages");
    this.$store.dispatch("dashboard/getContent");
    this.$store.dispatch("dashboard/getPromotions");
    // this.$store.dispatch("dashboard/getFiltersGroup");
    this.$store.dispatch("dashboard/getFiltersItem");
    this.$store.dispatch("dashboard/getSubCategory");
  },
};
</script>

<style scoped>
.home {
  background: #ddd;
}
</style>