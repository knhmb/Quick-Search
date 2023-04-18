<template>
  <div class="second-tab">
    <el-row :gutter="10">
      <!-- <el-col v-for="item in 12" :key="item" :sm="12" :md="8"> -->
      <el-col v-for="promotion in promotions" :key="promotion" :sm="12" :md="8">
        <div class="card" v-if="!promotion.used">
          <div class="header">
            <h5>{{ $t("discount") }}</h5>
            <div class="box">
              <!-- <p>可使用</p> -->

              <p>{{ promotion.used ? $t("confirmed") : "" }}</p>
            </div>
          </div>
          <p class="name">{{ promotion.resources.shop.name }}</p>
          <p class="fade">
            {{ promotion.resources.shop.description }}
          </p>
          <div class="btn-content">
            <el-button @click="viewPromotionDetail(promotion.promotion)">{{
              $t("view_offers")
            }}</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="promotions.length + 0"
      pager-count="8"
    />
  </div>
  <Dialog
    :dialog-visible="dialogVisible"
    @closedDialog="dialogVisible = $event"
  />
</template>


<script>
import { ElNotification } from "element-plus";
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    promotions() {
      return this.$store.getters["profile/accountPromotions"];
    },
  },
  methods: {
    viewPromotionDetail(slug) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store.dispatch("profile/getPromotionDetail", slug).then(() => {
            this.dialogVisible = true;
          });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("profile/getPromotionDetail", slug)
                .then(() => {
                  this.dialogVisible = true;
                });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: "Token Expired! Please Login Again.",
                type: "error",
              });
              this.$store.dispatch("auth/logout");
              this.$router.replace("/");
            });
        });
    },
  },
};
</script>

<style scoped>
.second-tab {
  padding: 1rem;
}

.second-tab .card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 0.5rem 0;
  width: 100%;
  position: relative;
  margin-bottom: 0.7rem;
}

.second-tab .card::after {
  content: "";
  position: absolute;
  border-bottom: 1px dashed #e0e0e0;
  width: 100%;
  left: 0;
  bottom: 2.7rem;
}

.second-tab h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.second-tab .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.second-tab .box {
  background: #985f35;
  border-radius: 4px;
  padding: 0.3rem;
}

.second-tab .box p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.second-tab p.name {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.second-tab p.fade {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
  padding: 0 0.5rem;
}

.second-tab .btn-content {
  display: flex;
  justify-content: center;
}

.second-tab .el-button {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #985f35;
  background: none;
  border: none;
  /* border-top: 1px solid red; */
  border-radius: 0;
  margin-top: 0.8rem;
  display: flex;
}

.second-tab .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  /* margin-bottom: 3rem; */
}

.second-tab :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.second-tab :deep(.el-pagination .btn-next),
.second-tab :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.second-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
  border-color: #985f35;
}
</style>