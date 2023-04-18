<template>
  <div class="basic-search-main">
    <base-container>
      <h4>{{ $t("browse_by_category") }}</h4>
      <p
        @click="selectCategory(item)"
        v-for="item in searchItems.items"
        :key="item"
      >
        {{ item.resources.category.name }} <span>({{ item.count }})</span>
      </p>
      <!-- <p>{{ $t("personal_care") }} <span>(924)</span></p>
      <p>{{ $t("cosmeceutical") }} <span>(924)</span></p>
      <p>{{ $t("make_up") }} <span>(924)</span></p>
      <p>{{ $t("healthy_food") }} <span>(924)</span></p>
      <p>{{ $t("interest") }} <span>(924)</span></p>
      <p>{{ $t("medical") }} <span>(924)</span></p>
      <p>{{ $t("mother") }} <span>(924)</span></p> -->
      <Card />
    </base-container>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  computed: {
    searchItems() {
      return this.$store.getters["search/searchItems"];
    },
    popularCategories() {
      return this.$store.getters["dashboard/popularCategories"];
    },
  },
  methods: {
    selectCategory(item) {
      console.log(item);
      const data = {
        page: 1,
      };
      // this.$store.commit(
      //   "dashboard/SET_MAIN_CATEGORY_CHILDREN",
      //   item.resources.children
      // );
      this.$store.commit(
        "search/SET_SELECTED_MAIN_CATEGORY",
        item.resources.category.name
      );
      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
      this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
      // this.$store.dispatch("dashboard/getDynamicFilterGroup", item.slug);
      this.$store.dispatch(
        "dashboard/getMainCategoryFilter",
        item.resources.category.slug
      );
      this.$store
        .dispatch("search/advancedFilter", {
          category: item.resources.category.slug,
          data,
        })
        .then(() => {
          this.$router.push({
            path: "/advanced-search",
            query: { filter: `category:${item.resources.category.slug}` },
          });
        });
    },
  },
};
</script>

<style scoped>
.basic-search-main {
  margin-top: 1rem;
}
.basic-search-main h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.basic-search-main p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #2d68ce;
  display: inline-block;
  margin-right: 2rem;
  position: relative;
  cursor: pointer;
}

.basic-search-main p:not(:last-of-type)::after {
  content: "";
  position: absolute;
  right: -1rem;
  background: #8d8d8d;
  width: 1px;
  height: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.basic-search-main p span {
  color: #8d8d8d;
}
</style>