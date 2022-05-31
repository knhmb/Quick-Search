<template>
  <div class="slider">
    <base-container>
      <el-carousel arrow="always" :interval="4000">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </base-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        `${require("../../assets/banner-sample01@2x.jpg")}`,
        `${require("../../assets/banner-sample02@2x.jpg")}`,
        `${require("../../assets/featured-sample02@2x.jpg")}`,
      ],
    };
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
  height: 50vh !important;
}

.slider .el-carousel__arrow {
  background: #fff;
  color: #393939;
}

.slider .el-carousel .el-carousel__item {
  /* margin: 0 2rem; */
  border-radius: 8px;
}

.slider .el-carousel__arrow.el-carousel__arrow--left {
  left: 1rem;
}

.slider .el-carousel__arrow.el-carousel__arrow--right {
  right: -1rem;
}

.slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0 2rem;
  border-radius: 8px;
}

.slider .el-carousel__indicators.el-carousel__indicators--horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
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