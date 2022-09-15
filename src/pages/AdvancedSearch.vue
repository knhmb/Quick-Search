<template>
  <section class="advanced-search">
    <!-- <top-section @sort="setSort"></top-section> -->
    <top-section></top-section>
    <base-container>
      <el-row :gutter="15">
        <el-col :sm="12" :md="7">
          <left-section :sorting="sorting"></left-section>
        </el-col>
        <el-col :sm="12" :md="17">
          <right-section @sort="setSort"></right-section>
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

    function setSort(option) {
      console.log(option);
      sorting.value = option;
      console.log(sorting.value);
    }

    return { setSort, sorting };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
        this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");

        this.$store
          .dispatch(
            "dashboard/getMainCategoryFilter",
            this.selectedMainCategorySlug
          )
          .then(() => {
            const data = this.categories.find(
              (item) => item.slug === this.selectedMainCategorySlug
            );
            console.log(data);
            this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", data.name);
          });
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
  },
};
</script>

<style scoped>
.advanced-search {
  background: #ddd;
}
</style>