<template>
  <div class="first-tab">
    <el-row :gutter="10">
      <el-col v-for="item in 12" :key="item" :span="8">
        <div class="card">
          <div class="header">
            <h5>折扣優惠</h5>
            <div class="box">
              <p>可使用</p>
            </div>
          </div>
          <p class="name">店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱店鋪名稱</p>
          <p class="fade">
            活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱...
          </p>
          <div class="btn-content">
            <el-button>查看優惠</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
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
.first-tab {
  padding: 1rem;
}

.first-tab .card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 0.5rem 0;
  width: 100%;
  position: relative;
  margin-bottom: 0.7rem;
}

.first-tab .card::after {
  content: "";
  position: absolute;
  border-bottom: 1px dashed #e0e0e0;
  width: 100%;
  left: 0;
  bottom: 2.7rem;
}

.first-tab h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.first-tab .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.first-tab .box {
  background: #63c07d;
  border-radius: 4px;
  padding: 0.3rem;
}

.first-tab .box p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.first-tab p.name {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.first-tab p.fade {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #8d8d8d;
  padding: 0 0.5rem;
}

.first-tab .btn-content {
  display: flex;
  justify-content: center;
}

.first-tab .el-button {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #985f35;
  background: none;
  border: none;
  /* border-top: 1px solid red; */
  border-radius: 0;
  margin-top: 0.8rem;
  display: flex;
}

.first-tab .el-pagination {
  justify-content: center;
  margin-top: 1rem;
  /* margin-bottom: 3rem; */
}

.first-tab :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)),
.first-tab :deep(.el-pagination .btn-next),
.first-tab :deep(.el-pagination .btn-prev) {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.first-tab
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #985f35;
  border-color: #985f35;
}
</style>