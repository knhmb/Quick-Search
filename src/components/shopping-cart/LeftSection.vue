<template>
  <div class="left-section">
    <base-card>
      <div class="single-text">
        <p class="title">{{ $t("store_introduction") }}</p>
        <p>
          店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介店舖簡介
        </p>
      </div>
      <div class="single-text">
        <p class="title">{{ $t("phone_number") }}</p>
        <p>9876-5432</p>
      </div>
      <div class="single-text">
        <p class="title">{{ $t("email_address") }}</p>
        <p>shopname@shop.com</p>
      </div>
      <div class="single-text">
        <p class="title">{{ $t("shop_address") }}</p>
        <el-row :gutter="10">
          <el-col :span="16">
            <h6>旺角</h6>
            <p>店舖地址店舖地址店舖地址店舖地址店舖地址店舖地址</p>
          </el-col>
          <el-col :span="8">
            <img src="../../assets/map@2x.jpg" alt="" />
          </el-col>
        </el-row>
      </div>
      <div class="single-text">
        <el-row :gutter="10">
          <el-col :span="12">
            <p class="title">{{ $t("business_hours") }}</p>
          </el-col>
          <el-col style="text-align: end" :span="12">
            <div class="button-dot">
              <div class="dot"></div>
              <p>{{ $t("in_operation") }}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="time-text">{{ $t("open_today") }}</p>
          </el-col>
          <el-col style="text-align: end" :span="12">
            <p class="time">12:30 - 22:00</p>
          </el-col>
          <!-- <template v-for="item in singleItem.openingHours" :key="item"> -->
          <el-col :span="12">
            <p class="time-text">{{ $t("monday_to_sunday") }}</p>
          </el-col>
          <el-col style="text-align: end" :span="12">
            <p class="time">
              {{ formatDate(singleItem.openingHours[0][0]) }} -
              {{ formatDate(singleItem.openingHours[0][1]) }}
            </p>
            <!-- <p class="time">12:30 - 22:00</p> -->
          </el-col>
          <!-- </template> -->
          <!-- <el-col :span="12">
              <p class="time-text">星期一至日</p>
            </el-col>
            <el-col style="text-align: end" :span="12">
              {{ formatDate(item[0]) }} - {{ formatDate(item[1]) }}
              <p class="time">12:30 - 22:00</p>
            </el-col> -->
          <el-col :span="12">
            <p class="time-text">{{ $t("public_holiday") }}</p>
          </el-col>
          <el-col style="text-align: end" :span="12">
            <p class="time">
              {{ formatDate(singleItem.openingHours[1][0]) }} -
              {{ formatDate(singleItem.openingHours[1][1]) }}
            </p>
            <!-- <p class="time">12:30 - 22:00</p> -->
          </el-col>
          <el-col :span="12">
            <p class="time-text">{{ $t("eve_of_public_holiday") }}</p>
          </el-col>
          <el-col style="text-align: end" :span="12">
            <p class="time">
              {{ formatDate(singleItem.openingHours[2][0]) }} -
              {{ formatDate(singleItem.openingHours[2][1]) }}
            </p>
            <!-- <p class="time">12:30 - 22:00</p> -->
          </el-col>
          <!-- </template> -->
        </el-row>
      </div>
    </base-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
  watch: {
    $i18n: {
      deep: true,
      handler() {
        if (this.$i18n.locale === "en-us") {
          const el = document.querySelector(".button-dot");
          el.style.width = "5.3rem";
        } else {
          const el = document.querySelector(".button-dot");
          el.style.width = "4rem";
        }
      },
    },
  },
  methods: {
    formatDate(data) {
      const formattedDate = moment(data)
        .format("MMMM Do YYYY, h:mm:ss")
        .split(",")
        .pop();
      const lastIndexOfChar = formattedDate.lastIndexOf(":");
      const time =
        formattedDate.slice(0, lastIndexOfChar) +
        formattedDate.slice(lastIndexOfChar + 3);
      return time;
    },
  },
  created() {
    console.log(this.singleItem);
  },
};
</script>

<style scoped>
.left-section {
  margin-bottom: 1rem;
}

.left-section,
.left-section .base-card {
  background-color: #efdfc8;
  border-radius: 8px;
}

.left-section .single-text:not(:last-of-type) {
  border-bottom: 1px solid #ffffff;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.left-section p.title {
  font-weight: 500;
  color: #7a4117;
  margin-bottom: 1rem;
}

.left-section p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.left-section h6 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.left-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.left-section .button-dot {
  background-color: #fff;
  border-radius: 40px;
  padding: 8px;
  width: 4rem;
  height: 1.3rem;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section .button-dot p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #3b9e27;
}

.left-section .button-dot .dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #3b9e27;
}

.left-section .time-text {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.left-section .time {
  color: #6f6f6f;
}
</style>