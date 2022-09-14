<template>
  <div class="popular-categories">
    <h4>{{ $t("popular_categories") }}</h4>
    <el-row :gutter="20">
      <el-col
        @click="selectCategory(item)"
        v-for="item in popularCategories"
        :key="item.id"
        :sm="6"
        :md="4"
      >
        <!-- <img :src="item.thumbnail" :alt="item.name" /> -->
        <img src="../../assets/main-category01@2x.jpg" alt="" />

        <p>{{ item.name }}</p>
      </el-col>
      <!-- <el-col :sm="6" :md="4">
        <img src="../../assets/main-category01@2x.jpg" alt="" />
        <p>個人護理</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category02@2x.jpg" alt="" />
        <p>寵物</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category03@2x.jpg" alt="" />
        <p>手工藝</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category04@2x.jpg" alt="" />
        <p>婚禮</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category05@2x.jpg" alt="" />
        <p>玩具</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category06@2x.jpg" alt="" />
        <p>汽車</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category07@2x.jpg" alt="" />
        <p>興趣</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category08@2x.jpg" alt="" />
        <p>烘焙</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category09@2x.jpg" alt="" />
        <p>醫療</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category10@2x.jpg" alt="" />
        <p>媽媽</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category11@2x.jpg" alt="" />
        <p>商務</p>
      </el-col>
      <el-col :sm="6" :md="4">
        <img src="../../assets/main-category12@2x.jpg" alt="" />
        <p>科技電子</p>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.dispatch("dashboard/getPopularGroups");
      },
    },
  },
  computed: {
    popularCategories() {
      return this.$store.getters["dashboard/popularCategories"];
    },
  },
  methods: {
    selectCategory(item) {
      console.log(item);
      this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", item.name);
      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
      this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
      // this.$store.dispatch("dashboard/getDynamicFilterGroup", item.slug);
      this.$store.dispatch("dashboard/getMainCategoryFilter", item.slug);
      this.$store.dispatch("search/advancedFilter", item.slug).then(() => {
        this.$router.push({
          path: "/advanced-search",
          query: { filter: `category:${item.slug}` },
        });
      });
    },
  },
  created() {
    this.$store.dispatch("dashboard/getPopularGroups");
  },
};
</script>

<style scoped>
.popular-categories {
  padding: 2rem 0;
}

.popular-categories h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

/* .popular-categories .el-row {
  gap: 0.5rem;
} */

.popular-categories .el-col {
  position: relative;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.popular-categories img {
  /* width: 100%;
  height: 100%; */
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  border-radius: 8px;
}

.popular-categories p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}

@media screen and (max-width: 991px) {
  .popular-categories {
    padding: 2rem 0 0 0;
  }
}
</style>