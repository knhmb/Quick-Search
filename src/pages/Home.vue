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
  created() {
    this.$store.commit("OPEN_DIALOG", "");

    this.$store.dispatch("dashboard/getCategories");
    this.$store.dispatch("dashboard/getLanguages");
    this.$store.dispatch("dashboard/getContent");
    this.$store.dispatch("dashboard/getPromotions");
    this.$store.dispatch("dashboard/getFiltersGroup");
    this.$store.dispatch("dashboard/getFiltersItem");
    this.$store.dispatch("dashboard/getSchedules");
  },
};
</script>

<style scoped>
.home {
  background: #ddd;
}
</style>