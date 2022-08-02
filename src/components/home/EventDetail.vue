<template>
  <div class="event-detail">
    <el-dialog
      @close="$emit('closedDialog', false)"
      :model-value="dialogVisible"
      width="50%"
    >
      <img src="../../assets/img.png" alt="" />
      <div class="body">
        <div class="inner-box">
          <p class="title">活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱</p>
          <p class="description">
            活動簡介 :
            活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹
            活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹
          </p>
          <p class="description">
            活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹
            活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹活動介紹
          </p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$emit('closedDialog', false)">關閉</el-button>
          <el-button
            class="confirm"
            type="primary"
            @click="$emit('closedDialog', false)"
            >登入/註冊</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
};
</script>

<style scoped>
.event-detail :deep(.el-dialog) {
  border-radius: 16px;
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
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  margin-bottom: 1rem;
}

.event-detail :deep(.el-dialog .body .inner-box p.description) {
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
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
</style>