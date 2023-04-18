<template>
  <div class="promotion-dialog">
    <el-dialog
      @close="$emit('closedDialog', false)"
      :model-value="dialogVisible"
      width="30%"
    >
      <div class="header">
        <h5>{{ $t("discount") }}</h5>
        <div class="box">
          <!-- <p>可使用</p> -->
          <p>{{ promotionDetail.used ? $t("completed") : "" }}</p>
        </div>
      </div>
      <div class="body">
        <p>{{ promotionDetail.name }}</p>
        <p>{{ promotionDetail.description }}</p>
        <img src="../../assets/qr-code-1.png" alt="" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closedDialog', false)">{{
            $t("sure")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

  <script>
export default {
  props: ["dialogVisible"],
  computed: {
    promotionDetail() {
      return this.$store.getters["profile/promotionDetail"];
    },
  },
};
</script>

  <style scoped>
.promotion-dialog :deep(.el-dialog) {
  border-radius: 8px;
}

.promotion-dialog :deep(.el-dialog .el-dialog__header) {
  display: none;
}

.promotion-dialog :deep(.el-dialog .header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.promotion-dialog .header {
  margin-bottom: 1rem;
}

.promotion-dialog h5 {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.promotion-dialog :deep(.el-dialog__body) {
  border-bottom: 1px solid #e0e0e0;
}

.promotion-dialog .body p {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}
.promotion-dialog .body p:last-of-type {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d8d;
  margin-top: 0.5rem;
}

.promotion-dialog .body img {
  width: 14rem;
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}

.promotion-dialog .el-button {
  background: #985f35;
  border-radius: 8px;
  width: 100%;
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  border-color: #985f35;
  padding: 1.5rem;
}

@media screen and (max-width: 900px) {
  .promotion-dialog :deep(.el-dialog) {
    width: 70%;
  }
}
</style>