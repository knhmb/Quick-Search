<template>
  <div class="bottom-header" v-if="categories.length > 0">
    <div class="burger" @click="openMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="burger-content" v-if="shortcutMenu">
      <!-- <base-container> -->
      <div class="main-items">
        <div
          @click="changeFilter(item)"
          @mouseover="filtered(item)"
          v-for="item in categories"
          :key="item"
          class="single-main-item"
        >
          <p>{{ item.name }}</p>
          <img
            v-if="item.children.length > 0"
            src="../../assets/chevron-right-black.png"
            alt=""
          />
        </div>
      </div>
      <div class="sub-category-div" v-if="subCatArr.length > 0">
        <h3>{{ currentFilter }}</h3>
        <p
          @click="searchCategory(item)"
          v-for="item in mainCategoryChildren"
          :key="item"
        >
          {{ item.name }}
        </p>
      </div>
      <!-- <div class="body-header">
          <p>{{ $t("main_category") }}</p>
          <div
            @click="changeFilter(item)"
            :class="{ 'is-active': currentFilter === item.name }"
            v-for="item in categories"
            :key="item"
            class="box"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="body-header">
          <p>{{ $t("sub_category") }}</p>
          <div
            @click="getFilterItems(item)"
            :class="{ 'is-active': currentFilter2 === item.name }"
            v-for="item in mainCategoryChildren"
            :key="item"
            class="box"
          >
            {{ item.name }}
          </div>
        </div> -->
      <!-- </base-container> -->
    </div>
    <base-container>
      <el-menu
        v-if="categories.length > 0"
        unique-opened
        menu-trigger="hover"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <Carousel :breakpoints="breakpoints">
          <Slide v-for="(slide, index) in categories" :key="slide">
            <el-sub-menu popper-class="custom-menu" :index="`${index}`">
              <template #title>{{ slide.name }}</template>
              <div class="header" style="cursor: pointer">
                <p @click="changeFilter(slide)">{{ slide.name }}</p>
                <img src="../../assets/chevron-right-black@2x.png" alt="" />
              </div>
              <el-row>
                <el-col :span="12">
                  <el-menu-item
                    @click="searchCategory(child)"
                    v-for="(child, i) in slide.resources.children"
                    :key="child"
                    :index="`${index} + ${i}`"
                    >{{ child.name }}</el-menu-item
                  >
                </el-col>
              </el-row>
            </el-sub-menu>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </el-menu>
    </base-container>
  </div>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      subCatArr: [],
      shortcutMenu: false,
      subCat: false,
      currentFilter: "",
      currentFilter2: "",
      options: [
        "個人護理",
        "寵物",
        "手工藝",
        "藥妝",
        "攝影",
        "化妝",
        "保健食品",
        "興趣",
        "醫療",
        "媽媽",
        "烘焙",
        "母嬰",
        "精品",
        "玩具",
        "車項目",
        "工程裝飾",
      ],
      breakpoints: {
        500: {
          itemsToShow: 1.5,
          snapAlign: "center",
        },
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 6,
          snapAlign: "end",
        },
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters["dashboard/categories"];
    },
    dynamicMainCategoryFilter() {
      return this.$store.getters["dashboard/dynamicMainCategoryFilter"];
    },
    selectedMainCategory() {
      return this.$store.getters["search/selectedMainCategory"];
    },
    selectedSubCategory() {
      return this.$store.getters["search/selectedSubCategory"];
    },
    mainCategoryFilter() {
      return this.$store.getters["dashboard/mainCategoryFilter"];
    },
    dynamicFilterGroup() {
      return this.$store.getters["dashboard/dynamicFilterGroup"];
    },
    dynamicFilters() {
      return this.$store.getters["dashboard/dynamicFilters"];
    },
    mainCategoryChildren() {
      return this.$store.getters["dashboard/mainCategoryChildren"];
    },
    checkList: {
      get() {
        return this.$store.getters["search/checkList"];
      },
      set(value) {
        this.$store.commit("search/UPDATE_CHECKLIST", value);
      },
    },
  },
  methods: {
    openMenu() {
      this.shortcutMenu = !this.shortcutMenu;
      this.subCatArr = [];
    },
    filtered(item) {
      // console.log(item.children);
      this.subCatArr = item.children;
      this.$store.commit(
        "dashboard/SET_MAIN_CATEGORY_CHILDREN",
        item.resources.children
      );
      this.subCat = true;
      this.currentFilter = item.name;
    },
    searchCategory(category) {
      const data = {
        search: category,
      };
      console.log(data);
      console.log(category);
      console.log(this.categories);
      const mainCat = this.categories.find((item) =>
        item.children.includes(category.slug)
      );
      console.log(mainCat);
      const dataObject = {
        page: 1,
      };
      // this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", category.name);
      this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", category.name);
      this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", mainCat.name);
      this.$store.commit("SET_SELECTED_MAIN_CATEGORY_SLUG", mainCat.slug);
      this.$store.commit(
        "dashboard/SET_MAIN_CATEGORY_CHILDREN",
        mainCat.resources.children
      );

      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
      this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
      this.$store.dispatch("dashboard/getSubCategoryFilter", category.slug);
      // this.$store.dispatch("dashboard/getMainCategoryFilter", category.slug);

      const filter = {
        mainCategory: mainCat.slug,
        subCategory: category.slug,
      };
      this.$store
        .dispatch("search/advancedFilter", {
          category: category.slug,
          data: dataObject,
        })
        .then(() => {
          this.$router.push({
            path: "/advanced-search",
            query: { filter: JSON.stringify(filter) },
            // query: { filter: `category:${category.slug}` },
          });
        });
      this.shortcutMenu = false;

      // this.$store.dispatch("dashboard/getDynamicFilterGroup", category.slug);

      // this.$store.dispatch("search/searchItem", data).then(() => {
      //   this.$router.push({
      //     path: "/advanced-search",
      //     query: { q: category },
      //   });
      // });
    },
    changeFilter(item) {
      console.log(item);
      const data = {
        page: 1,
      };
      this.$store.commit("search/RESET_SELECTED_MAIN_CATEGORY");
      this.$store.commit("search/RESET_SELECTED_SUB_CATEGORY");
      this.currentFilter = item.name;
      this.$store.commit(
        "dashboard/SET_MAIN_CATEGORY_CHILDREN",
        item.resources.children
      );
      this.$store.commit("search/SET_SELECTED_MAIN_CATEGORY", item.name);
      this.$store.commit("SET_SELECTED_MAIN_CATEGORY_SLUG", item.slug);
      this.$store.commit("dashboard/RESET_DYNAMIC_FILTERS");
      this.$store.commit("dashboard/RESET_DYNAMIC_MAIN_CATEGORY_FILTER");
      // this.$store.dispatch("dashboard/getDynamicFilterGroup", item.slug);
      this.$store.dispatch("dashboard/getMainCategoryFilter", item.slug);

      const filter = {
        mainCategory: item.slug,
      };

      this.$store
        .dispatch("search/advancedFilter", { category: item.slug, data })
        .then(() => {
          this.$router.push({
            path: "/advanced-search",
            query: { filter: JSON.stringify(filter) },
            // query: { filter: `category:${item.slug}` },
          });
        });
      this.shortcutMenu = false;
    },
    getFilterItems(item) {
      console.log(item);
      this.currentFilter2 = item.name;
      this.$store.commit("search/SET_SELECTED_SUB_CATEGORY", item.name);
      this.$store.dispatch("dashboard/getDynamicFilters", item);
    },
  },
  mounted() {
    console.log(this.categories);
  },
};
</script>

<style>
.bottom-header {
  background-color: #fff;
  position: relative;
  box-shadow: inset 0px -1px 0px #ebebeb;
}

.bottom-header .container {
  /* display: flex;
  align-items: center; */
}

.bottom-header .carousel {
  width: 100%;
}

/* .bottom-header .carousel .carousel__slide {
  margin-left: 1rem;
} */

.bottom-header .carousel__prev--in-active,
.bottom-header .carousel__next--in-active {
  display: none;
}

.bottom-header .carousel__prev,
.bottom-header .carousel__next {
  background: #fff;
  color: #393939;
}

.bottom-header .container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.bottom-header .el-menu {
  border-bottom: none;
  background: transparent;
}

.bottom-header .el-sub-menu__icon-arrow {
  display: none;
}

.bottom-header .el-menu .el-sub-menu.is-active {
  border-bottom: 2px solid #985f35;
}

.bottom-header
  .el-menu
  .el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger {
  white-space: normal;
  line-height: normal;
}

.bottom-header .burger {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 100%;
  background-color: #985f35;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
}

.bottom-header .burger span {
  width: 1.5rem;
  height: 0.2rem;
  border-radius: 4px;
  background: #fff;
  display: block;
}

.bottom-header .burger span:nth-of-type(2) {
  margin: 0.2rem 0;
}

.bottom-header .burger-content {
  background: #fff;
  width: 70%;
  height: 33.6rem;
  /* max-height: fit-content; */
  position: absolute;
  bottom: -33.6rem;
  z-index: 2;
  left: 10%;
  display: flex;
  /* padding: 2rem 0; */
  /* overflow-y: scroll; */
  /* box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08); */
}

.bottom-header .burger-content .main-items {
  /* width: 30%; */
  /* padding: 0 1rem; */
  width: 40%;
}

.bottom-header .burger-content .main-items .single-main-item {
  display: flex;
  justify-content: space-between;
  background: #f5f4f0;
  padding: 0.1rem 0.5rem;
  border-bottom: 1px solid #ebeae6;
  cursor: pointer;
}

.bottom-header .burger-content .main-items .single-main-item:last-of-type {
  margin-bottom: 0;
}

.bottom-header .burger-content .main-items .single-main-item p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.bottom-header .burger-content .sub-category-div {
  padding: 1rem;
  width: 60%;
  overflow-y: scroll;
}

.bottom-header .burger-content .sub-category-div h3 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  margin-bottom: 1rem;
}
.bottom-header .burger-content .sub-category-div p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.el-menu.el-menu--horizontal.el-menu-demo {
  width: 100%;
}

.el-menu--horizontal.custom-menu p {
  padding: 0 10px;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
  display: inline-block;
  margin-top: 0.1rem;
}

.el-menu--horizontal.custom-menu .header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  position: relative;
}

.el-menu--horizontal.custom-menu .header::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -0.5rem;
  background-color: #e0e0e0;
}

.el-menu--horizontal.custom-menu img {
  width: 1.3rem;
}

.el-menu-item {
  width: fit-content;
}

.bottom-header .body-header {
  margin-bottom: 1rem;
}

.bottom-header .body-header p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  position: relative;
  padding-left: 0.7rem;
  margin-bottom: 1rem;
}

.bottom-header .body-header p::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #985f35;
  border-radius: 40px;
  width: 6px;
  height: 20px;
}

.bottom-header .box {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 40px;
  width: fit-content;
  display: inline-block;
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.bottom-header .box:hover,
.bottom-header .box.is-active {
  background: linear-gradient(
      264.22deg,
      rgba(217, 111, 33, 0.6) 0%,
      rgba(152, 95, 53, 0.6) 100%
    ),
    #985f35;
  color: #fff;
  border-color: #985f35;
}

@media screen and (max-width: 991px) {
  .bottom-header .carousel .carousel__slide {
    margin-left: 0;
  }
}
</style>