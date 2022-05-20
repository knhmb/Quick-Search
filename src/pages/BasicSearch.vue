<template>
  <section class="basic-search">
    <top-section></top-section>
    <Main />
  </section>
</template>

<script>
import TopSection from "../components/basic-search/TopSection.vue";
import Main from "../components/basic-search/Main.vue";

export default {
  components: {
    TopSection,
    Main,
  },
};
</script>

<style scoped>
.basic-search {
  background: #ddd;
}
</style>