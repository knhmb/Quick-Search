<template>
  <div class="box-card">
    <div class="first-tab">
      <div class="content">
        <h5>{{ $t("appointment_service") }}</h5>
        <div class="form-section">
          <label>{{ $t("number_of_people") }}</label>
          <el-select placeholder="2位"></el-select>
        </div>
        <div class="form-section">
          <label>{{ $t("select_date") }}</label>
          <v-date-picker
            v-model="date"
            :locale="$i18n.locale"
            :columns="$screens({ default: 1, lg: 1 })"
          />
          <!-- <v-date-picker
            v-model="range"
            is-range
            :locale="$i18n.locale"
            :columns="$screens({ default: 1, lg: 1 })"
          /> -->
          <div class="time-picker">
            <base-card>
              <span>{{ $t("optional_days") }}</span>
              <div class="box">15</div>
              <span>{{ $t("selected_day") }}</span>
              <div class="box active">15</div>
              <span>{{ $t("appointment_full") }}</span>
              <div class="box">15</div>
            </base-card>
          </div>
        </div>
        <div class="form-section">
          <label>{{ $t("selection_period") }}</label>
          <p class="am">{{ $t("morning_session") }}</p>
          <el-row :gutter="15">
            <template v-for="time in schedules" :key="time">
              <el-col
                v-for="slot in time.timeslot"
                :key="slot"
                :sm="12"
                :md="6"
              >
                <!-- {{ time }} -->
                <div
                  v-if="checkDate(slot.begin).includes('am')"
                  class="time-box"
                  @click="isActive = slot.begin"
                  :class="{ 'is-active': isActive === slot.begin }"
                >
                  {{ filterDate(slot.begin) }}
                </div>
                <!-- {{ slot }} -->
              </el-col>
            </template>

            <!-- <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '9:00'"
                :class="{ 'is-active': isActive === '9:00' }"
              >
                9:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '10:00'"
                :class="{ 'is-active': isActive === '10:00' }"
              >
                10:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '11:00'"
                :class="{ 'is-active': isActive === '11:00' }"
              >
                11:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '12:00'"
                :class="{ 'is-active': isActive === '12:00' }"
              >
                12:00
              </div>
            </el-col> -->
          </el-row>
          <p class="am">{{ $t("afternoon_session") }}</p>
          <el-row :gutter="15">
            <template v-for="time in schedules" :key="time">
              <el-col
                v-for="slot in time.timeslot"
                :key="slot"
                :sm="12"
                :md="6"
              >
                <!-- {{ time }} -->
                <div
                  v-if="checkDate(slot.begin).includes('pm')"
                  class="time-box"
                  @click="isActive = slot.begin"
                  :class="{ 'is-active': isActive === slot.begin }"
                >
                  {{ filterDate(slot.begin) }}
                </div>
                <!-- {{ slot }} -->
              </el-col>
            </template>
            <!-- <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '13:00'"
                :class="{ 'is-active': isActive === '13:00' }"
              >
                13:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '14:00'"
                :class="{ 'is-active': isActive === '14:00' }"
              >
                14:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '15:00'"
                :class="{ 'is-active': isActive === '15:00' }"
              >
                15:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '16:00'"
                :class="{ 'is-active': isActive === '16:00' }"
              >
                16:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '17:00'"
                :class="{ 'is-active': isActive === '17:00' }"
              >
                17:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '18:00'"
                :class="{ 'is-active': isActive === '18:00' }"
              >
                18:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '19:00'"
                :class="{ 'is-active': isActive === '19:00' }"
              >
                19:00
              </div>
            </el-col>
            <el-col :sm="12" :md="6">
              <div
                class="time-box"
                @click="isActive = '20:00'"
                :class="{ 'is-active': isActive === '20:00' }"
              >
                20:00
              </div>
            </el-col> -->
          </el-row>
        </div>
        <el-button @click="postDateTime">{{
          $t("make_an_appointment_button")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      date: new Date(),
      range: {
        start: "",
        end: "",
      },
      isActive: "14:00",
    };
  },
  watch: {
    range: {
      deep: true,
      handler() {
        console.log(new Date(this.range.start).toISOString());
        const startDate = moment(this.range.start).format("YYYY-MM-DD");
        const endDate = moment(this.range.end).format("YYYY-MM-DD");
        const time = this.isActive;
        const startDateTime = `${startDate} ${time}`;
        const endDateTime = `${endDate} ${time}`;
        const data = {
          param: this.$route.query.q,
          start: new Date(startDateTime).toISOString(),
          end: new Date(endDateTime).toISOString(),
        };
        console.log(data);
        // console.log(new Date(startDateTime).toISOString());
        // console.log(new Date(endDateTime).toISOString());
        this.$store
          .dispatch("auth/checkAccessToken")
          .then(() => {
            this.$store.dispatch("shop/getSchedule", data);
          })
          .catch(() => {
            this.$store
              .dispatch("auth/checkRefreshToken")
              .then(() => {
                this.$store.dispatch("shop/getSchedule", data);
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
    $i18n: {
      deep: true,
      handler() {
        this.$store.dispatch("dashboard/getSchedules");
      },
    },
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
    schedules() {
      return this.$store.getters["dashboard/schedules"];
    },
    currentUserDetails() {
      return this.$store.getters["auth/currentUserDetails"];
    },
  },
  methods: {
    dateChanged(day) {
      console.log(day);
    },
    filterDate(date) {
      return moment(new Date(date)).format("h:mm");
    },
    checkDate(date) {
      return moment(new Date(date)).format("h:mm a");
    },
    postDateTime() {
      // const date = moment(this.date).format("YYYY-MM-DD");
      // const dated = `${date} ${this.isActive}`;
      const dated = `${this.isActive}`;
      console.log(dated);
      const data = {
        account: this.currentUserDetails.id,
        // account: this.singleItem.item.account,
        shop: this.singleItem.item.name,
        schedule: dated,
        // schedule: new Date(dated).toISOString(),
      };
      console.log(this.singleItem.item);
      console.log(this.currentUserDetails);
      console.log(data);
      if (this.isUserLoggedIn) {
        this.$store
          .dispatch("auth/checkAccessToken")
          .then(() => {
            this.$store.dispatch("shop/book", data).then(() => {
              ElNotification({
                title: "Success",
                message: this.$t("shop_booked"),
                type: "success",
              });
              this.$router.replace("/");
            });
          })
          .catch(() => {
            this.$store
              .dispatch("auth/checkRefreshToken")
              .then(() => {
                this.$store.dispatch("shop/book", data).then(() => {
                  ElNotification({
                    title: "Success",
                    message: this.$t("shop_booked"),
                    type: "success",
                  });
                  this.$router.replace("/");
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
      } else {
        ElNotification({
          title: "Error",
          message: this.$t("login_first"),
          type: "error",
        });
      }
    },
  },
  created() {
    console.log(this.singleItem);
    this.$store.dispatch("dashboard/getSchedules");
  },
};
</script>

<style scoped>
.right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}
.first-tab {
  position: relative;
}

.first-tab::after {
  content: "";
  position: absolute;
  background-color: #e6e6e6;
  bottom: 5rem;
  width: 100%;
  height: 1px;
}

.first-tab .content {
  padding: 1rem;
}

.first-tab h5 {
  margin-bottom: 1rem;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.first-tab label {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  display: block;
  margin-bottom: 1rem;
}

.first-tab .el-select {
  width: 100%;
}

.first-tab :deep(.el-select .el-input__wrapper) {
  background: #f5f4f0;
  padding: 0.5rem 1rem;
}

.first-tab .form-section {
  margin-bottom: 1rem;
}

.first-tab :deep(.vc-container) {
  width: 100%;
}

.first-tab :deep(.vc-highlight) {
  background: #985f35 !important;
  border-radius: 4px !important;
}

.first-tab :deep(.vc-day-content.vc-focusable:hover) {
  border-radius: 4px !important;
}

.first-tab .time-picker .base-card {
  background: #f5f4f0;
  border-radius: 8px;
  text-align: end;
  margin-top: 0.5rem;
}

.first-tab .time-picker .base-card span {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.first-tab .time-picker .base-card .box {
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: fit-content;
  padding: 0.5rem;
  display: inline-block;
  margin-left: 0.5rem;
}

.first-tab .time-picker .base-card .box.active {
  background: #985f35;
  color: #fff;
}

.first-tab .time-picker .base-card .box:not(:last-of-type) {
  margin-right: 1rem;
}

.first-tab .form-section p.am {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 1rem;
}

.first-tab .form-section .time-box {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 8px;
  padding: 0.7rem;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.first-tab .form-section .time-box.is-active {
  border-color: #985f35;
  background-color: #985f35;
  color: #fff;
}

.first-tab .el-button {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  background: #985f35;
  border-radius: 8px;
  border-color: #985f35;
  margin-top: 2rem;
  width: 12rem;
  padding: 1.5rem;
  margin-left: auto;
  display: flex;
}

@media screen and (max-width: 991px) {
  .first-tab .el-button {
    margin: auto;
  }
}

@media screen and (max-width: 545px) {
  .first-tab .time-picker .base-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .first-tab .time-picker .base-card .box,
  .first-tab .time-picker .base-card .box.active,
  .first-tab .time-picker .base-card .box:not(:last-of-type) {
    margin: 0;
  }

  .first-tab .time-picker .base-card .box,
  .first-tab .time-picker .base-card .box.active,
  .first-tab .time-picker .base-card .box:not(:last-of-type) {
    margin: 0.5rem 0 1rem 0;
  }
}
</style>