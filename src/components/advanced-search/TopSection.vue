<template>
  <div class="top-section">
    <base-container>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item class="first" @click="$router.push('/')">{{
          $t("home")
        }}</el-breadcrumb-item>
        <el-breadcrumb-item
          @click="setSearch({ category: selectedMainCategory, type: 'cat' })"
          >{{ selectedMainCategory }}</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-if="selectedSubCategory"
          @click="setSearch({ category: selectedSubCategory, type: 'subCat' })"
          >{{ selectedSubCategory }}</el-breadcrumb-item
        >
      </el-breadcrumb>
      <h5>
        {{ selectedMainCategory }}
        {{ selectedSubCategory ? selectedSubCategory : "" }}
      </h5>
      <!-- <h5>
        {{ $t("personal_care") }} {{ currentOption ? currentOption : "" }}
      </h5> -->
      <carousel
        v-if="mainCategoryChildren.length > 0"
        :breakpoints="breakpoints"
        :items-to-show="1.5"
      >
        <slide v-for="item in mainCategoryChildren" :key="item">
          <div
            @click="setOption(item)"
            :class="{ 'is-active': currentOption === item.slug }"
            class="pill"
          >
            {{ item.name }}
          </div>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </base-container>
  </div>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      ArrowRight,
      currentOption: "",
      renderComponent: true,
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3.7,
          snapAlign: "start",
        },
        1240: {
          itemsToShow: 5.7,
          snapAlign: "start",
        },
      },
      options: [
        "all",
        "manicure",
        "eyelashes",
        "massage_parlor",
        "steam",
        "embroidered_eyebrows",
        // "全部",
        // "美甲",
        // "美睫",
      ],
    };
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.currentOption = "";
        // const cat = this.$route.query.filter.split(":").pop();
        const cat = JSON.parse(this.$route.query.filter).subCategory
          ? JSON.parse(this.$route.query.filter).subCategory
          : "";
        this.currentOption = cat;
        // this.forceRerender();
      },
    },
    // $route: {
    //   deep: true,
    //   handler() {
    //     const cat = this.$route.query.filter.split(":").pop();
    //     this.currentOption = cat;
    //   },
    // },
  },
  computed: {
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    selectedMainCategory() {
      return this.$store.getters["search/selectedMainCategory"];
    },
    mainCategoryChildren() {
      return this.$store.getters["dashboard/mainCategoryChildren"];
    },
    selectedSubCategory() {
      return this.$store.getters["search/selectedSubCategory"];
    },
    selectedSubCategorySlug() {
      return this.$store.getters["search/selectedSubCategorySlug"];
    },
    categories() {
      return this.$store.getters["dashboard/categories"];
    },
    selectedMainCategorySlug() {
      return this.$store.getters.selectedMainCategorySlug;
    },
    mainCat() {
      return this.$route.query.filter
        ? JSON.parse(this.$route.query.filter).mainCategory
        : "";
    },
    subCat() {
      return this.$route.query.filter
        ? JSON.parse(this.$route.query.filter).subCategory
        : "";
    },
  },
  methods: {
    async forceRerender() {
      // Remove MyComponent from the DOM
      this.renderComponent = false;

      // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.renderComponent = true;
    },
    setOption(option) {
      console.log(option);
      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");

      this.currentOption = option.slug;
      this.$store.dispatch("dashboard/getSubCategoryFilter", option.slug);

      // this.$emit("sort", option);
      this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", option.name);
      this.$store.commit("search/SET_SELECTED_SUB_CATEGORY_SLUG", option.slug);

      const data = {
        page: 1,
      };

      const filter = JSON.stringify({
        mainCategory: JSON.parse(this.$route.query.filter).mainCategory
          ? JSON.parse(this.$route.query.filter).mainCategory
          : undefined,
        subCategory: option.slug,
      });

      this.$store.dispatch("dashboard/getDynamicFilters", option);
      this.$store
        .dispatch("search/advancedFilter", { category: option.slug, data })
        .then(() => {
          this.$router.push({
            path: "/advanced-search",
            query: { filter: filter },
            // query: { filter: `category:${option.slug}` },
          });
        });
    },
    setSearch({ category, type }) {
      let cat;
      // const finalCategory = (
      //   this.selectedMainCategory.replaceAll(" ", "-") +
      //   "-" +
      //   category
      // ).toLowerCase();
      // const finalCategory =
      //   this.selectedMainCategorySlug + "-" + this.selectedSubCategorySlug;
      if (type === "subCat") {
        this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", category);
        cat = this.selectedSubCategorySlug;
      } else {
        cat = this.selectedMainCategorySlug;
        this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", "");
        const categoryChildren = this.categories.find(
          (item) => item.slug === cat
        );
        console.log(categoryChildren);
        this.$store.commit(
          "dashboard/SET_MAIN_CATEGORY_CHILDREN",
          categoryChildren.resources.children
        );
        this.currentOption = "";
      }
      const data = {
        slug: cat,
      };

      const dataObject = {
        page: 1,
      };

      this.$store.dispatch("dashboard/getDynamicFilters", data);
      this.$store
        .dispatch("search/advancedFilter", { category: cat, data: dataObject })
        .then(() => {
          this.$router.push({
            path: "/advanced-search",
            query: { filter: `category:${cat}` },
          });
        });
    },
  },
  created() {
    console.log(this.$route.query);
    console.log(JSON.parse(this.$route.query.filter));
    const cat = JSON.parse(this.$route.query.filter).subCategory
      ? JSON.parse(this.$route.query.filter).subCategory
      : "";
    this.currentOption = cat;
    // console.log(this.$route.query.filter.split(":").pop());
  },
};
</script>

<style scoped>
.top-section {
  background: rgba(239, 223, 200, 0.6);
  backdrop-filter: blur(200px);
}

.top-section :deep(.el-breadcrumb__inner) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.top-section :deep(.el-breadcrumb__item.first .el-breadcrumb__inner) {
  color: #7a4117;
}
.top-section :deep(.el-breadcrumb__inner) {
  cursor: pointer !important;
}

.top-section h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  background: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* text-fill-color: transparent; */
  margin: 1rem 0 2rem 0;
}

.top-section .carousel {
  margin-bottom: 1rem;
}

.top-section :deep(.carousel__prev.carousel__prev),
.top-section :deep(.carousel__next.carousel__next) {
  background: #fff;
  color: #393939;
}

.top-section :deep(.carousel__prev.carousel__prev--in-active),
.top-section :deep(.carousel__next.carousel__next--in-active) {
  display: none;
}

.top-section .pill {
  background: #ffffff;
  border-radius: 32px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.3s ease-out;
  width: 8rem;
  text-align: start;
}

.top-section .pill:hover,
.top-section .pill.is-active {
  background: linear-gradient(
      264.22deg,
      rgba(217, 111, 33, 0.6) 0%,
      rgba(152, 95, 53, 0.6) 100%
    ),
    #985f35;
  color: #fff;
}
</style>