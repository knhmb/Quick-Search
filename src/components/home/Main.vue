<template>
  <div class="home-main-content">
    <!-- <base-container> -->
    <el-row justify="space-between">
      <el-col :span="4"></el-col>
      <el-col :span="15">
        <!-- <h4>{{ $t("featured_events") }}</h4> -->
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!-- </base-container> -->
    <el-row justify="space-between">
      <el-col :sm="12" :md="4">
        <!-- <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" /> -->
      </el-col>
      <el-col class="middle-col" :sm="24" :md="15">
        <!-- <template v-for="category in promotionCategories" :key="category">
          <template v-for="item in promotions" :key="item"> -->
        <!-- <h4
              v-if="
                category.slug === item.category &&
                new Date(item.endedAt) > new Date()
              "
            >
              {{ category.name }}
            </h4> -->
        <template v-for="category in promotionCategories" :key="category">
          <h4>{{ category.name }}</h4>
          <el-row :gutter="20">
            <template v-for="item in promotions" :key="item">
              <el-col
                :sm="12"
                :md="8"
                v-if="
                  category.slug === item.category &&
                  new Date(item.endedAt) > new Date()
                "
              >
                <div @click="getItemDetail(item.slug)" class="card">
                  <img :src="item.thumbnail" alt="" />
                  <div class="content">
                    <p>
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </el-col>
            </template>
          </el-row>
        </template>
        <!-- <el-row :gutter="20">
          <template v-for="category in promotionCategories" :key="category">
            <template v-for="item in promotions" :key="item">
              <el-col>
                <h4
                  v-if="
                    category.slug === item.category &&
                    new Date(item.endedAt) > new Date()
                  "
                >
                  {{ category.name }}
                </h4>
              </el-col>

              <el-col
                v-if="
                  new Date(item.endedAt) > new Date() &&
                  category.slug === item.category
                "
                :sm="12"
                :md="8"
              >
                <div @click="getItemDetail(item.slug)" class="card">
                  <img :src="item.thumbnail" alt="" />
                  <div class="content">
                    <p>
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </el-col>
            </template>
          </template>
        </el-row> -->
        <!-- </template>
        </template> -->
        <popular-categories></popular-categories>
      </el-col>
      <el-col :sm="12" :md="4">
        <!-- <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" />
        <img src="../../assets/adv-sample01@2x.jpg" alt="" />
        <img src="../../assets/adv-sample02@2x.jpg" alt="" />
        <img src="../../assets/adv-sample03@2x.jpg" alt="" /> -->
      </el-col>
    </el-row>
    <event-detail
      :dialog-visible="dialogVisible"
      @closedDialog="dialogVisible = $event"
    ></event-detail>
  </div>
</template>

<script>
import EventDetail from "./EventDetail.vue";
import PopularCategories from "./PopularCategories.vue";

export default {
  components: {
    PopularCategories,
    EventDetail,
  },
  data() {
    return {
      dialogVisible: false,
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
  watch: {
    $i18n: {
      deep: true,
      handler() {
        this.$store.dispatch("dashboard/getPromotionCategories");
      },
    },
  },
  computed: {
    promotions() {
      const today = new Date();
      const promotions = this.$store.getters["dashboard/promotions"];
      return promotions.filter(
        (promotion) => new Date(promotion.endedAt) > today
      );
    },
    promotionCategories() {
      const categories = this.$store.getters["dashboard/promotionCategories"];
      return categories.filter((cate) => this.hasPromotions(cate.slug));
    },
  },
  methods: {
    getItemDetail(slug) {
      this.$store.dispatch("dashboard/promotionDetail", slug).then(() => {
        this.dialogVisible = true;
      });
    },
    hasPromotions(slug) {
      return this.promotions.findIndex((i) => i.category === slug) > -1;
    },
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
  height: 12rem;
  object-fit: cover;
}

.home-main-content h4 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
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
    /* margin: 2rem 0; */
  }
}
</style>