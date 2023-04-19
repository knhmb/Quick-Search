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
  computed: {
    searchValue() {
      return this.$store.getters["search/searchValue"];
    },
  },
  created() {
    this.$store.commit("search/SET_SEARCH_VALUE", this.$route.query.q);
    const data = {
      search: this.searchValue,
    };
    this.$;

    this.$store.dispatch("search/searchItem", data).then(() => {
      this.$router.push({
        path: "/basic-search",
        query: { q: this.searchValue },
      });
      // this.search = "";
    });
  },
};
</script>

<style scoped>
.basic-search {
  background: #ddd;
}
</style>