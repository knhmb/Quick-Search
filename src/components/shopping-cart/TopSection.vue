<template>
  <div class="top-section">
    <div class="main-section">
      <base-container>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item class="first">主頁</el-breadcrumb-item>
          <el-breadcrumb-item class="first">個人護理</el-breadcrumb-item>
          <el-breadcrumb-item class="first">髮型店</el-breadcrumb-item>
          <el-breadcrumb-item>{{ singleItem.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="15">
          <el-col :sm="12" :md="4">
            <img class="product-img" src="../../assets/avatar.png" alt="" />
          </el-col>
          <el-col :sm="24" :md="13">
            <h5>{{ singleItem.name }}</h5>
            <el-rate show-score disabled model-value="4" />
            <img
              class="arrow-down"
              src="../../assets/arrowhead-down@2x.png"
              alt=""
            />
            <p>旺角 ． $120-320 ． 髮型店</p>
          </el-col>
          <el-col style="text-align: end" :sm="12" :md="7">
            <img
              @click="$router.push('/comment')"
              class="shop-profile-icon"
              src="../../assets/shop-profile-comment@2x.png"
              alt=""
            />
            <img
              class="shop-profile-icon"
              src="../../assets/shop-profile-share@2x.png"
              alt=""
            />
            <img
              class="shop-profile-icon"
              src="../../assets/shop-profile-bookmark@2x.png"
              alt=""
            />
          </el-col>
        </el-row>
      </base-container>
    </div>

    <div class="reviews">
      <base-container>
        <div class="rating">
          <img
            class="good-rating"
            src="../../assets/rating-excellent@2x.png"
            alt=""
          />
          <span>468</span>
        </div>
        <div class="rating">
          <img
            class="good-rating"
            src="../../assets/rating-good@2x.png"
            alt=""
          />
          <span>247</span>
        </div>
        <div class="rating">
          <img
            class="good-rating"
            src="../../assets/rating-dislike@2x.png"
            alt=""
          />
          <span>16</span>
        </div>
      </base-container>
    </div>
  </div>
</template>

<script>
import { ArrowRight } from "@element-plus/icons-vue";

export default {
  data() {
    return {
      ArrowRight,
    };
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
};
</script>

<style scoped>
.top-section {
  background: rgba(239, 223, 200, 0.6);
  backdrop-filter: blur(200px);
}

.top-section .el-row {
  align-items: center;
}

.top-section .main-section {
  margin-bottom: -4rem;
}

.top-section .el-breadcrumb {
  margin-bottom: 1rem;
}

.top-section :deep(.el-breadcrumb__inner) {
  font-family: "PingFang HK";
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

.top-section img.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.top-section img.arrow-down {
  width: 1.2rem;
}

.top-section img.good-rating {
  width: 2rem;
}

.top-section img.shop-profile-icon {
  width: 2rem;
  background-color: #985f35;
  border-radius: 100%;
  padding: 0.2rem;
  cursor: pointer;
}

.top-section img.shop-profile-icon:not(:last-of-type) {
  margin-right: 1rem;
}

.top-section h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.top-section .el-rate {
  margin: 0.2rem 0;
}

.top-section :deep(.el-icon.el-rate__icon) {
  background-color: #c6c6c6;
  border-radius: 100%;
  color: #e6e6e6;
}

.top-section :deep(.el-icon.el-rate__icon.is-active) {
  color: #fff;
  background-color: #f9c021;
}

.top-section p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 3rem;
}

.top-section .reviews {
  background-color: #fff;
  padding-left: 9.4rem;
}

.top-section .reviews .container {
  display: flex;
}

.top-section .reviews .container .rating {
  display: flex;
  align-items: center;
}

.top-section .reviews .container .rating span {
  margin-left: 0.5rem;
  margin-right: 2rem;
}

@media screen and (max-width: 991px) {
  .top-section .reviews {
    padding-left: 0;
    margin-top: 4rem;
  }
}
</style>