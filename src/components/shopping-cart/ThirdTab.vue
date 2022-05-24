<template>
  <div class="third-tab">
    <div class="box-card">
      <el-row :gutter="15">
        <el-col v-for="item in 18" :key="item" :span="8">
          <img src="../../assets/avatar.png" alt="" />
        </el-col>
      </el-row>
    </div>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="80"
      pager-count="8"
    />
  </div>
</template>

<style scoped>
.right-section .box-card {
  box-shadow: inset 0px -1px 0px #e0e0e0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  padding: 1rem;
}

.third-tab .el-col {
  margin-bottom: 0.5rem;
}

.third-tab img {
  width: 100%;
}

.third-tab .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.third-tab :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.third-tab :deep(.el-pagination .btn-next),
.third-tab :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
}

.third-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
}
</style>