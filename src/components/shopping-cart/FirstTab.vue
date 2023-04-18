<template>
  <div class="box-card">
    <div class="first-tab">
      <div class="content">
        <h5>{{ $t("appointment_service") }}</h5>
        <div class="form-section">
          <label>{{ $t("number_of_people") }}</label>
          <el-select
            v-model="noOfPeople"
            :placeholder="$t('number_of_indiviuals_placeholder')"
          >
            <el-option
              v-for="option in options"
              :key="option"
              :value="option"
              :label="option"
            ></el-option
          ></el-select>
        </div>
        <div class="form-section">
          <label>{{ $t("select_date") }}</label>
          <v-date-picker
            :disabled-dates="disabledDates"
            :available-dates="dateArray"
            v-model="date"
            @dayclick="handleSelected"
            @update:to-page="handleNewMonth"
            :locale="$i18n.locale"
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
              <!-- <div class="box active">{{ dateFilter }}</div> -->
              <div class="box active">15</div>
              <span>{{ $t("appointment_full") }}</span>
              <div class="box">15</div>
            </base-card>
          </div>
        </div>
        <div class="form-section" v-if="!hideDates">
          <label>{{ $t("selection_period") }}</label>
          <p class="am">{{ $t("morning_session") }}</p>
          <el-row :gutter="15">
            <template v-for="time in schedules" :key="time">
              <template v-for="slot in time.timeslot" :key="slot">
                <el-col
                  v-if="checkDate(slot.begin).includes('am')"
                  :sm="12"
                  :md="6"
                >
                  <div
                    class="time-box"
                    @click="isActive = filterDate(slot.begin)"
                    :class="{
                      'is-active': isActive === filterDate(slot.begin),
                    }"
                  >
                    {{ filterDate(slot.begin) }}
                  </div>
                </el-col>
              </template>
            </template>
          </el-row>
          <p class="am">{{ $t("afternoon_session") }}</p>
          <el-row :gutter="15">
            <template v-for="time in schedules" :key="time">
              <template v-for="slot in time.timeslot" :key="slot">
                <el-col
                  v-if="checkDate(slot.begin).includes('pm')"
                  :sm="12"
                  :md="6"
                >
                  <div
                    class="time-box"
                    @click="isActive = filterDate(slot.begin)"
                    :class="{
                      'is-active': isActive === filterDate(slot.begin),
                    }"
                  >
                    {{ filterDate(slot.begin) }}
                  </div>
                </el-col>
              </template>
            </template>
          </el-row>
        </div>
        <el-button :disabled="isButtonDisabled" @click="postDateTime">{{
          $t("make_an_appointment_button")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import moment from "moment";

export default {
  data() {
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      noOfPeople: "",
      isButtonDisabled: false,
      disableFirst: "",
      disableLast: "",
      disabledDates: [],
      date: "",
      range: {
        start: "",
        end: "",
      },
      dateArray: [],
      isActive: "",
      hideDates: true,
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
          // param: this.$route.query.q,
          param: this.$route.params.id,
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
        // this.$store.dispatch("dashboard/getSchedules");
        this.$store.dispatch("search/searchSingleShop", {
          slug: this.selectedShopSlug,
        });
        const data = {
          search: this.searchValue,
        };
        this.$store.dispatch("search/searchItem", data).then(() => {
          console.log(this.searchItems);
          console.log(this.categoryId);
          const found = this.searchItems.items.find(
            (item) => item.resources.category.slug === this.categoryId
          );
          this.$store.commit("SET_CATEGORY", found.resources.category.name);

          console.log("HEHREHERHERHERHERHERHRH");
          console.log(found);
          console.log(found.resources);
          // const found = this.searchItems.find((item) => {
          //   console.log(item.resources.category);

          //   const temp = item.resources.category.slug === this.categoryId;
          //   // if (temp) {
          //   this.$store.commit("SET_CATEGORY", item.resources.category.name);
          //   // }
          //   // const temp = item.items.find(
          //   //   (searchItem) => searchItem.slug === this.categoryId
          //   // );
          //   console.log(temp);
          //   console.log(item.resources.category.name);
          // });
          // this.searchItems.forEach((item) => {
          //   console.log(item.resources.category);
          //   const temp = item.resources.category.slug === this.categoryId;
          //   // if (temp) {
          //   this.$store.commit(
          //     "SET_CATEGORY",
          //     temp ? item.resources.category.name : ""
          //   );
          //   // }
          //   // const temp = item.items.find(
          //   //   (searchItem) => searchItem.slug === this.categoryId
          //   // );
          //   console.log(temp);
          //   console.log(item.resources.category.name);
          // });
        });
      },
    },
  },
  computed: {
    categoryId() {
      return this.$store.getters.categoryId;
    },
    searchItems() {
      return this.$store.getters["search/searchItems"];
    },
    searchValue() {
      return this.$store.getters["search/searchValue"];
    },
    dateFilter() {
      return moment(this.date).format("DD");
    },
    selectedShopSlug() {
      return this.$store.getters.selectedShopSlug;
    },
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
    handleSelected(day) {
      console.log(day);
      const d = new Date(day.id);
      const h = d.setHours(0, 0, 0);
      console.log(new Date(h));
      console.log(new Date(h).toISOString());
      // console.log(d.setHours(0, 0, 0));
      console.log(new Date(day.id).toISOString());
      const firstDay = new Date(h).toISOString();
      const lastDay = new Date(h).toISOString();
      console.log(firstDay);
      console.log(lastDay);
      console.log(this.schedules);
      console.log(this.dateArray[0]);
      console.log(new Date(this.dateArray[0].start));
      console.log(new Date(this.dateArray[0].start).toISOString());
      this.$store
        .dispatch("dashboard/getSchedules", {
          firstDay,
          lastDay,
          slug: this.selectedShopSlug,
        })
        .then(() => {
          console.log("HEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHEHE");
          console.log(this.schedules);
          if (this.schedules.length <= 0) {
            this.isButtonDisabled = true;
            this.hideDates = true;
          } else {
            this.hideDates = false;
            this.isButtonDisabled = false;
          }
          console.log(this.isButtonDisabled);
        });
    },
    handleNewMonth(day) {
      this.dateArray = [];
      this.disableDates = [];
      const currentMonth = moment(`${day.year}/${day.month}`, "YYYY/MM");
      console.log(currentMonth);

      // const now = new Date();
      // console.log(now);
      const firstDay = currentMonth.format();
      const lastDay = currentMonth.add(1, "month").subtract(1, "day").format();
      this.disableFirst = new Date(firstDay);
      this.disableLast = new Date(lastDay);
      this.disabledDates.push({
        start: this.disableFirst,
        end: this.disableLast,
      });
      // console.log(this.disableFirst);
      // console.log(this.disableLast);
      console.log(firstDay);
      console.log(lastDay);
      this.$store
        .dispatch("dashboard/getSchedules", {
          firstDay,
          lastDay,
          slug: this.selectedShopSlug,
        })
        .then(() => {
          console.log(this.schedules);
          this.schedules.forEach((item) => {
            this.dateArray.push({
              // start: new Date(item.date),
              // end: new Date(item.date),
              start: item.date,
              end: item.date,
            });
            console.log(this.dateArray);
          });
          if (this.dateArray.length <= 0) {
            this.isButtonDisabled = true;
          } else {
            this.isButtonDisabled = false;
          }
        });
    },
    filterDate(date) {
      return moment(new Date(date)).format("h:mm");
    },
    checkDate(date) {
      return moment(new Date(date)).format("h:mm a");
    },
    postDateTime() {
      if (!this.date || !this.isActive) {
        ElNotification({
          title: "Error",
          message: this.$t("select_date_time"),
          type: "error",
        });
        return;
      }
      // const dated = `${this.isActive}`;
      // const dummy = moment(this.date).format("YYYY-MM-DD");
      // const final = new Date(`${dummy} ${this.isActive}`);
      // const scheduleDate = final.toISOString();
      // const dated = `${this.date} ${this.isActive}`;
      // console.log(new Date(dated));
      const schedule = this.schedules.at(0);
      const timeslot = schedule.timeslot.find(
        (o) => this.filterDate(o.begin) === this.isActive
      );
      const data = {
        account: this.currentUserDetails.id,
        // account: this.singleItem.item.account,
        shop: this.singleItem.item.slug,
        schedule: schedule?.id,
        timeslot: timeslot.hash,
        // date: this.date,
      };
      // console.log(this.singleItem.item);
      // console.log(this.currentUserDetails);
      console.log(data);
      if (this.isUserLoggedIn) {
        this.$store
          .dispatch("auth/checkAccessToken")
          .then(() => {
            this.$store
              .dispatch("shop/book", data)
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
                  .dispatch("shop/book", data)
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
    const now = new Date();
    const firstDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).toISOString();
    this.$store
      .dispatch("dashboard/getSchedules", {
        firstDay,
        lastDay,
        slug: this.selectedShopSlug,
      })
      .then(() => {
        // console.log(this.schedules);
        this.schedules.forEach((item) => {
          this.dateArray.push({
            start: item.date,
            end: item.date,
            // start: new Date(item.date),
            // end: new Date(item.date),
          });
          console.log(this.dateArray);
        });
      });
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