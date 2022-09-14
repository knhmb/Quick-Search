<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from "./components/common/TheHeader.vue";
import TheFooter from "./components/common/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.dispatch("dashboard/getSubCategory");
        this.$store.dispatch("dashboard/getCategories");
        this.$store.dispatch("dashboard/getContent");
        this.$store.dispatch("dashboard/getPromotions");
        // this.$store.dispatch("dashboard/getFiltersGroup");
        this.$store.dispatch("dashboard/getFiltersItem");
      },
    },
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
