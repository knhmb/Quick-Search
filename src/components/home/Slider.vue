<template>
  <div class="slider">
    <base-container>
      <Carousel
        v-if="banners.length > 0"
        :settings="settings"
        :breakpoints="breakpoints"
        wrap-around
      >
        <Slide v-for="item in banners" :key="item">
          <img :src="item.thumbnail" alt="" />
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </base-container>
    <!-- <base-container>
      <el-carousel arrow="always" :interval="4000">
        <el-carousel-item v-for="item in banners" :key="item">
          <img :src="item.thumbnail" alt="" />
        </el-carousel-item>
      </el-carousel>
    </base-container> -->
  </div>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      imgs: [
        `${require("../../assets/banner-sample01@2x.jpg")}`,
        `${require("../../assets/banner-sample02@2x.jpg")}`,
        `${require("../../assets/featured-sample02@2x.jpg")}`,
      ],
      settings: {
        itemsToShow: 2,
        snapAlign: "end",
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 2,
          snapAlign: "end",
        },
      },
    };
  },
  computed: {
    banners() {
      return this.$store.getters["dashboard/banners"];
    },
  },
  created() {
    this.$store.dispatch("dashboard/getBanners");
  },
};
</script>

<style>
.slider {
  padding: 3rem 0;
  overflow-x: hidden;
}

.slider .el-carousel {
  overflow: visible;
}

.slider .el-carousel .el-carousel__container {
  /* height: 50vh !important; */
  margin: 0 1rem;
  /* padding-top: 25%; */
  /* aspect-ratio: auto 1/0; */
}

.slider .el-carousel__arrow {
  background: #fff;
  color: #393939;
}

.slider .el-carousel .el-carousel__item {
  /* margin: 0 2rem; */
  /* border-radius: 8px; */
  /* overflow: visible; */
  /* width: 1017px; */
  /* aspect-ratio: auto 1067 / 799; */
  /* height: 100%; */
}

.slider .el-carousel__arrow.el-carousel__arrow--left {
  left: -1rem;
  z-index: 1;
}

.slider .el-carousel__arrow.el-carousel__arrow--right {
  right: -1rem;
  z-index: 1;
}

.slider .carousel__slide.carousel__slide--active.carousel__slide--visible {
  /* aspect-ratio: 4 / 3; */
}

.slider img {
  display: block;
  border-radius: 8px;
  /* width: 100%;
  height: 300px; */
  width: 100%;
  aspect-ratio: 4 / 3;
  /* padding: 0.7rem; */
  /* height: 300px; */
  /* margin: 0 1.5rem; */
}

.slider .el-carousel__indicators.el-carousel__indicators--horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.slider .el-carousel .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 1px solid #c6c6c6;
}

.slider
  .el-carousel
  .el-carousel__indicators.el-carousel__indicators--horizontal {
  bottom: -30px;
}

.slider
  .el-carousel
  .el-carousel__indicator.el-carousel__indicator--horizontal.is-active
  .el-carousel__button {
  width: 4rem;
  height: 7px;
  border-radius: 20px;
  background: #985f35;
}

.slider .carousel__viewport {
  overflow: visible;
}

.slider .carousel__track {
  /* gap: 1.5rem; */
}

.slider .carousel__prev {
  left: 1rem;
}

.slider .carousel__next {
  right: 0.7rem;
}

.slider .carousel__prev,
.slider .carousel__next {
  background: #fff;
  color: #393939;
}

.slider .carousel__pagination-button.carousel__pagination-button--active {
  background: #985f35;
  border-radius: 20px;
  width: 4rem;
}

.slider .carousel__pagination-button {
  width: 0.5rem;
  height: 0.5rem;
  background: #fff;
}

.slider .carousel__slide {
  border-radius: 8px;
  padding: 0 0.7rem;

  /* margin: 0 1.5rem; */
  /* gap: 3rem; */
  /* justify-content: space-between; */
}
/* @media screen and (max-width: 1300px) {
  .slider .el-carousel .el-carousel__container {
    height: 40vh !important;
  }
}
@media screen and (max-width: 1000px) {
  .slider .el-carousel .el-carousel__container {
    height: 20vh !important;
  }

  .slider .el-carousel {
    overflow: hidden;
  }
} */
</style>