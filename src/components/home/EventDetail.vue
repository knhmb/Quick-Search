<template>
  <div class="event-detail">
    <el-dialog
      @close="$emit('closedDialog', false)"
      :model-value="dialogVisible"
      width="50%"
    >
      <img :src="promotionDetail.thumbnail" alt="" />
      <div class="body">
        <div class="inner-box">
          <p class="title">{{ promotionDetail.name }}</p>
          <p class="description">
            {{ promotionDetail.description }}
          </p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closedDialog', false)">{{
            $t("cancel_button")
          }}</el-button>
          <el-button
            v-if="!isLoggedIn"
            class="confirm"
            type="primary"
            @click="$emit('closedDialog', false)"
            ><span @click.stop="openLogin">{{ $t("login") }}</span
            >/<span @click.stop="openRegister">{{
              $t("register")
            }}</span></el-button
          >
          <el-button v-else class="confirm" type="primary" @click="book">{{
            $t("book_now")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  props: ["dialogVisible"],
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    promotionDetail() {
      return this.$store.getters["dashboard/promotionDetail"];
    },
    eventSchedules() {
      return this.$store.getters["dashboard/eventSchedules"];
    },
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
    singleSchedule() {
      const schedule = this.eventSchedules.find(
        (item) => item.shop === this.promotionDetail.shop
      );
      return schedule;
    },
  },
  methods: {
    openLogin() {
      this.$store.commit("OPEN_DIALOG", "login");
    },
    openRegister() {
      this.$store.commit("OPEN_DIALOG", "register");
    },
    book() {
      // let data;
      console.log(this.promotionDetail);
      // this.$store
      //   .dispatch("dashboard/getEventSchedule", this.promotionDetail.shop)
      //   .then(() => {
      //     data = {
      //       account: this.currentUserDetails.id,
      //       // account: this.singleItem.item.account,
      //       shop: this.promotionDetail.shop,
      //       schedule: this.singleSchedule.id,
      //       timeslot: this.singleSchedule.timeslot[0].hash,
      //     };
      //   });
      // console.log(this.singleSchedule);

      // data = {
      //   account: this.currentUserDetails.id,
      //   // account: this.singleItem.item.account,
      //   shop: this.promotionDetail.shop,
      //   schedule: this.singleSchedule.id,
      //   timeslot: this.singleSchedule.timeslot[0].hash,
      // };
      // console.log(data);
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store
            .dispatch("shop/claimPromotion", this.promotionDetail.slug)
            .then(() => {
              ElNotification({
                title: "Success",
                message: this.$t("shop_booked"),
                type: "success",
              });
              this.$router.replace("/");
            })
            .catch((err) => {
              ElNotification({
                title: "Error",
                message: this.$t(err.response.data.message),
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store
                .dispatch("shop/claimPromotion", this.promotionDetail.slug)
                .then(() => {
                  ElNotification({
                    title: "Success",
                    message: this.$t("shop_booked"),
                    type: "success",
                  });
                  this.$router.replace("/");
                })
                .catch((err) => {
                  ElNotification({
                    title: "Error",
                    message: this.$t(err.response.data.message),
                    type: "error",
                  });
                });
            })
            .catch(() => {
              ElNotification({
                title: "Error",
                message: this.$t("token_expired"),
                type: "error",
              });
              this.$store.dispatch("auth/logout");
            });
        });
      // this.$store
      //   .dispatch("search/searchSingleShop", {
      //     slug: this.promotionDetail.slug,
      //   })
      //   .then(() => {
      //     this.$router.push({
      //       path: "/shop",
      //       query: { q: this.promotionDetail.slug },
      //     });
      //   })
      //   .catch((err) => {
      //     ElNotification({
      //       title: "Error",
      //       message: err.response.data.message,
      //       type: "error",
      //     });
      //   });
      // this.$router.push("/shop");
      this.$emit("closedDialog", false);
    },
  },
};
</script>

<style scoped>
.event-detail :deep(.el-dialog) {
  border-radius: 16px;
  width: 35%;
}

.event-detail :deep(.el-dialog .el-dialog__header),
.event-detail :deep(.el-dialog .el-dialog__headerbtn) {
  display: none;
}

.event-detail :deep(.el-dialog .el-dialog__body) {
  padding: 0;
}

.event-detail :deep(.el-dialog img) {
  width: 100%;
  border-radius: 16px 16px 0 0;
  max-height: 24rem;
}

.event-detail :deep(.el-dialog .body) {
  padding: 1rem;
}

.event-detail :deep(.el-dialog .body .inner-box) {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

.event-detail :deep(.el-dialog .body .inner-box p.title) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  margin-bottom: 1rem;
}

.event-detail :deep(.el-dialog .body .inner-box p.description) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.event-detail :deep(.el-dialog .el-dialog__footer) {
  border-top: 1px solid #e0e0e0;
}

.event-detail .el-button.confirm {
  background: #985f35;
  border-radius: 8px;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  border-color: #985f35;
  padding: 1.4rem 2rem;
  width: 8rem;
}

.event-detail .el-button {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;

  color: #393939;
  padding: 1.4rem 2rem;
  border-radius: 8px;
  width: 8rem;
}

@media screen and (max-width: 991px) {
  .event-detail :deep(.el-dialog) {
    width: 60%;
  }
}
@media screen and (max-width: 500px) {
  .event-detail :deep(.el-dialog) {
    width: 90%;
  }
}
</style>