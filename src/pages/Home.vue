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
    this.$store.dispatch("dashboard/getCategories");
  },
};
</script>

<style scoped>
.home {
  background: #ddd;
}
</style>