<template>
  <div class="first-tab">
    <div class="content">
      <h5>預約服務</h5>
      <div class="form-section">
        <label>選擇人數</label>
        <el-select placeholder="2位"></el-select>
      </div>
      <div class="form-section">
        <label>選擇人數</label>
        <v-date-picker
          v-model="date"
          locale="zh"
          :columns="$screens({ default: 1, lg: 2 })"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  date() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style scoped>
.first-tab .content {
  padding: 1rem;
}

.first-tab h5 {
  margin-bottom: 1rem;
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.first-tab label {
  font-family: "PingFang HK";
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

.first-tab :deep(.vc-highlight) {
  background: #985f35 !important;
  border-radius: 4px !important;
}

.first-tab :deep(.vc-day-content.vc-focusable:hover) {
  border-radius: 4px !important;
}
</style>