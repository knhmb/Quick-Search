<template>
  <div class="home-main-content">
    <base-container>
      <h4>{{ $t("featured_events") }}</h4>
    </base-container>
    <el-row justify="space-between">
      <el-col :sm="12" :md="4">
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
      </el-col>
      <el-col class="middle-col" :sm="24" :md="15">
        <el-row :gutter="20">
          <el-col v-for="img in imgs" :key="img" :sm="12" :md="8">
            <div @click="dialogVisible = true" class="card">
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
      <el-col :sm="12" :md="4">
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
      </el-col>
    </el-row>
    <event-detail
      :dialog-visible="dialogVisible"
      @closedDialog="dialogVisible = $event"
    ></event-detail>
  </div>
</template>

<script>
import PopularCategories from "./PopularCategories.vue";
import EventDetail from "./EventDetail.vue";

export default {
  components: {
    PopularCategories,
    EventDetail,
  },
  data() {
    return {
      dialogVisible: true,
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
  margin-bottom: 1.5rem;
  cursor: pointer;
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

@media screen and (max-width: 991px) {
  .home-main-content .el-row.is-justify-space-between {
    justify-content: center;
  }

  .home-main-content h4 {
    text-align: center;
  }

  .home-main-content .el-col.middle-col {
    margin: 2rem 0;
  }
}
</style>