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
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.dispatch("dashboard/getSubCategory");
        this.$store.dispatch("dashboard/getCategories");
        this.$store.dispatch("dashboard/getLanguages");
        this.$store.dispatch("dashboard/getContent");
        this.$store.dispatch("dashboard/getPromotions");
        // this.$store.dispatch("dashboard/getFiltersGroup");
        this.$store.dispatch("dashboard/getFiltersItem");
        this.$store.dispatch("dashboard/getSubCategory");
      },
    },
  },
  created() {
    this.$store.commit("OPEN_DIALOG", "");
    this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
    this.$store.commit("dashboard/RESET_DYNAMIC_FILTER_GROUP");
    this.$store.commit("search/UPDATE_CHECKLIST", {});

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