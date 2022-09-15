<template>
  <div class="booking-list-second-tab">
    <el-row>
      <el-col v-for="item in bookings" :key="item.id">
        <div
          v-if="item.status === 'BOOKED'"
          @click="openDialog(item.id)"
          class="card"
        >
          <el-row :gutter="15">
            <el-col :sm="24" :md="8">
              <img :src="item.thumbnail" alt="" />
              <!-- <img src="../../assets/shop-sample01@2x.jpg" alt="" /> -->
            </el-col>
            <el-col :sm="24" :md="16">
              <div class="box">
                <small> {{ $t(item.status) }} </small>
                <!-- <small> 已確認 </small> -->
              </div>
              <p>
                {{ item.shop }}
              </p>
              <!-- <p>
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱
              </p> -->
              <div class="info-box">
                <p class="faded">{{ $t("number_of_reservations") }}</p>
                <!-- <p class="faded">預約人數</p> -->
                <p>2人</p>
              </div>
              <div class="info-box">
                <p class="faded">{{ $t("appointment_date") }}</p>
                <!-- <p class="faded">預約日期</p> -->
                <p>{{ filterDate(item.schedule) }}</p>
                <!-- <p>2022-10-10</p> -->
              </div>
              <div class="info-box">
                <p class="faded">{{ $t("appointment") }}</p>
                <!-- <p class="faded">預約時間</p> -->
                <p>上午{{ filterTime(item.schedule) }}</p>
                <!-- <p>上午11:30</p> -->
              </div>
            </el-col>
          </el-row>
          <img
            class="arrow-right"
            src="../../assets/chevron-right-black@2x.png"
            alt=""
          />
        </div>
      </el-col>
    </el-row>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="bookings.length + 0"
      pager-count="8"
    />
    <Dialog
      :dialog-visible="dialogVisible"
      @closedDialog="dialogVisible = $event"
    />
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import moment from "moment";
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
    bookings() {
      return this.$store.getters["profile/bookings"];
    },
  },
  methods: {
    filterDate(date) {
      const newDate = new Date(date);
      const finalDate = moment(newDate).format("YYYY-MM-DD");
      return finalDate;
    },
    filterTime(time) {
      const newTime = new Date(time);
      const finalTime = moment(newTime).format("LT");
      return finalTime;
    },
    openDialog(id) {
      this.$store
        .dispatch("auth/checkAccessToken")
        .then(() => {
          this.$store.dispatch("profile/getSingleBooking", id).then(() => {
            this.dialogVisible = true;
          });
        })
        .catch(() => {
          this.$store
            .dispatch("auth/checkRefreshToken")
            .then(() => {
              this.$store.dispatch("profile/getSingleBooking", id).then(() => {
                this.dialogVisible = true;
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
    },
  },
  created() {
    console.log(this.bookings);
  },
};
</script>

<style scoped>
.booking-list-second-tab {
  padding: 1rem;
}

.booking-list-second-tab .card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem 0.5rem;
  position: relative;
  margin-bottom: 1rem;
}

.booking-list-second-tab img.arrow-right {
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.booking-list-second-tab img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

.booking-list-second-tab .box {
  background: #985f35;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  width: fit-content;
}

.booking-list-second-tab small {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.booking-list-second-tab p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.booking-list-second-tab .info-box {
  background: #f4f4f4;
  border-radius: 4px;
  display: inline-block;
  padding: 0.5rem;
  width: 6rem;
  margin-bottom: 1rem;
}

.booking-list-second-tab .info-box:nth-of-type(3) {
  margin: 0 1rem;
}

.booking-list-second-tab .info-box p.faded {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #a8a8a8;
  margin: 0;
}

.booking-list-second-tab .info-box p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin: 0;
  margin-top: 0.5rem;
}

.booking-list-second-tab .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  /* margin-bottom: 3rem; */
}

.booking-list-second-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.booking-list-second-tab :deep(.el-pagination .btn-next),
.booking-list-second-tab :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.booking-list-second-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
  border-color: #985f35;
}

@media screen and (max-width: 991px) {
  .booking-list-second-tab .box {
    margin-top: 1rem;
  }
}
</style>