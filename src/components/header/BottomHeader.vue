<template>
  <div class="bottom-header">
    <base-container>
      <el-menu
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
              <div class="header">
                <p>{{ slide.name }}</p>
                <img src="../../assets/chevron-right-black@2x.png" alt="" />
              </div>
              <el-row>
                <el-col :span="12">
                  <el-menu-item
                    @click="searchCategory(child.slug)"
                    v-for="(child, i) in slide.resources.children"
                    :key="child"
                    :index="`${i} + '-1'`"
                    >{{ child.name }}</el-menu-item
                  >
                  <!-- <el-menu-item :index="`${index} + '-1'`">美甲</el-menu-item>
                  <el-menu-item :index="`${index} + '-2'`">美睫</el-menu-item>
                  <el-menu-item :index="`${index} + '-3'`">按摩店</el-menu-item>
                  <el-menu-item :index="`${index} + '-4'`">蒸身</el-menu-item>
                  <el-menu-item :index="`${index} + '-5'`">綉眉</el-menu-item>
                  <el-menu-item :index="`${index} + '-6'`"
                    >頭髮護理</el-menu-item
                  >
                  <el-menu-item :index="`${index} + '-7'`">剪頭髮</el-menu-item>
                  <el-menu-item :index="`${index} + '-8'`">眼</el-menu-item> -->
                </el-col>
                <!-- <el-col :span="12">
                  <el-menu-item :index="index + '-9'">紋身</el-menu-item>
                  <el-menu-item :index="index + '-10'">美白牙齒</el-menu-item>
                  <el-menu-item :index="index + '-11'">美容護理</el-menu-item>
                </el-col> -->
              </el-row>
            </el-sub-menu>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <!-- <Carousel :breakpoints="breakpoints">
          <Slide v-for="(slide, index) in options" :key="slide">
            <el-sub-menu popper-class="custom-menu" :index="index">
              <template #title>{{ slide }}</template>
              <div class="header">
                <p>{{ slide }}</p>
                <img src="../../assets/chevron-right-black@2x.png" alt="" />
              </div>
              <el-row>
                <el-col :span="12">
                  <el-menu-item :index="index + '-1'">美甲</el-menu-item>
                  <el-menu-item :index="index + '-2'">美睫</el-menu-item>
                  <el-menu-item :index="index + '-3'">按摩店</el-menu-item>
                  <el-menu-item :index="index + '-4'">蒸身</el-menu-item>
                  <el-menu-item :index="index + '-5'">綉眉</el-menu-item>
                  <el-menu-item :index="index + '-6'">頭髮護理</el-menu-item>
                  <el-menu-item :index="index + '-7'">剪頭髮</el-menu-item>
                  <el-menu-item :index="index + '-8'">眼</el-menu-item>
                </el-col>
                <el-col :span="12">
                  <el-menu-item :index="index + '-9'">紋身</el-menu-item>
                  <el-menu-item :index="index + '-10'">美白牙齒</el-menu-item>
                  <el-menu-item :index="index + '-11'">美容護理</el-menu-item>
                </el-col>
              </el-row>
            </el-sub-menu>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel> -->
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
          itemsToShow: 9,
          snapAlign: "end",
        },
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters["dashboard/categories"];
    },
  },
  methods: {
    searchCategory(category) {
      const data = {
        search: category,
      };

      this.$store.dispatch("search/searchItem", data).then(() => {
        this.$router.push({
          path: "/advanced-search",
          query: { q: category },
        });
      });
    },
  },
};
</script>

<style>
.bottom-header {
  background-color: #fff;
  /* box-shadow: inset 0px -1px 0px #ebebeb; */
}

.bottom-header .carousel {
  width: 100%;
}

.bottom-header .carousel .carousel__slide {
  margin-left: 1rem;
}

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
}

.bottom-header .el-sub-menu__icon-arrow {
  display: none;
}

.bottom-header .el-menu .el-sub-menu.is-active {
  border-bottom: 2px solid #985f35;
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

@media screen and (max-width: 991px) {
  .bottom-header .carousel .carousel__slide {
    margin-left: 0;
  }
}
</style>