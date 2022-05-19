<template>
  <div class="home-main-content">
    <base-container>
      <h4>精選活動</h4>
    </base-container>
    <el-row justify="space-between">
      <el-col :span="4">
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
      </el-col>
      <el-col :span="15">
        <el-row :gutter="10">
          <el-col v-for="img in imgs" :key="img" :span="8">
            <div class="card">
              <img :src="img.src" alt="" />
              <div class="content">
                <p>
                  活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
        <popular-categories></popular-categories>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PopularCategories from "./PopularCategories.vue";

export default {
  components: {
    PopularCategories,
  },
  data() {
    return {
      imgs: [
        {
          src: require("../../assets/featured-sample01@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample02@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample03@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample04@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample05@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample06@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample01@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample02@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample03@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample04@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample05@2x.jpg"),
        },
        {
          src: require("../../assets/featured-sample06@2x.jpg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.home-main-content {
  padding: 0 2rem;
}

.home-main-content img {
  width: 100%;
  margin-bottom: 0.3rem;
}

.home-main-content h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.home-main-content .card {
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.home-main-content .card .content {
  padding: 0.5rem;
}

.home-main-content .card .content p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.home-main-content .card img {
  border-radius: 8px 8px 0 0;
}
</style>