<template>
  <div class="booking-list-dialog">
    <el-dialog
      @close="$emit('closedDialog', false)"
      :model-value="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <img src="../../assets/shop-sample01@2x.jpg" alt="" />
      <div class="content">
        <div class="box">已確認</div>
        <p>{{ singleBooking.shop }}</p>
        <div class="inner-card">
          <div class="single-card">
            <label>預約人數</label>
            <p>2人</p>
          </div>
          <div class="single-card">
            <label>預約日期</label>
            <p>{{ filterDate() }}</p>
          </div>
          <div class="single-card">
            <label>預約時間</label>
            <p>上午{{ filterTime() }}</p>
          </div>
        </div>
        <img src="../../assets/qr-code.png" alt="" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closedDialog', false)">確定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["dialogVisible"],
  computed: {
    singleBooking() {
      return this.$store.getters["profile/singleBooking"];
    },
  },
  methods: {
    filterDate() {
      const newDate = new Date(this.singleBooking.schedule);
      const finalDate = moment(newDate).format("YYYY-MM-DD");
      return finalDate;
    },
    filterTime() {
      const newTime = new Date(this.singleBooking.schedule);
      const finalTime = moment(newTime).format("LT");
      //   const finalTime = moment(newTime).format("LT").replace("PM", "");
      return finalTime;
    },
  },
};
</script>

<style scoped>
.booking-list-dialog :deep(.el-dialog) {
  border-radius: 8px;
}
.booking-list-dialog :deep(.el-dialog img) {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.booking-list-dialog :deep(.el-dialog .el-dialog__header),
.booking-list-dialog :deep(.el-dialog .el-icon.el-dialog__close) {
  display: none;
}

.booking-list-dialog :deep(.el-dialog .el-dialog__body) {
  padding: 0;
}

.booking-list-dialog :deep(.el-dialog .el-dialog__body .content) {
  padding: 1rem;
}

.booking-list-dialog :deep(.el-dialog .el-dialog__body .content .box) {
  background: #63c07d;
  border-radius: 4px;

  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: fit-content;
  padding: 0.3rem;
}

.booking-list-dialog :deep(.el-dialog .content p) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 0.5rem;
}

.booking-list-dialog :deep(.el-dialog .content .inner-card) {
  display: flex;
}

.booking-list-dialog :deep(.el-dialog .content .inner-card .single-card label) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #a8a8a8;
}

.booking-list-dialog :deep(.el-dialog .content .inner-card .single-card) {
  background: #f4f4f4;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
}

.booking-list-dialog
  :deep(.el-dialog .content .inner-card .single-card:not(:last-of-type)) {
  margin-right: 0.5rem;
}

.booking-list-dialog :deep(.el-dialog .content .inner-card .single-card p) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.booking-list-dialog :deep(.el-dialog .content img) {
  width: 15rem;
  margin: 0.5rem auto 0 auto;
  display: block;
}

.booking-list-dialog :deep(.el-dialog .el-button) {
  background: #985f35;
  border-radius: 8px;

  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 100%;
  padding: 1.3rem;
}
</style>