<template>
  <div class="booking-list-second-tab">
    <el-row>
      <el-col v-for="item in 9" :key="item">
        <div class="card">
          <el-row :gutter="15">
            <el-col :sm="24" :md="8">
              <img src="../../assets/shop-sample01@2x.jpg" alt="" />
            </el-col>
            <el-col :sm="24" :md="16">
              <div class="box">
                <small> 已完成 </small>
              </div>
              <p>
                活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱活動名稱
              </p>
              <div class="info-box">
                <p class="faded">預約人數</p>
                <p>2人</p>
              </div>
              <div class="info-box">
                <p class="faded">預約日期</p>
                <p>2022-10-10</p>
              </div>
              <div class="info-box">
                <p class="faded">預約時間</p>
                <p>上午11:30</p>
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
      :total="80"
      pager-count="8"
    />
  </div>
</template>

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
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #ffffff;
}

.booking-list-second-tab p {
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: "liga" off;
  color: #a8a8a8;
  margin: 0;
}

.booking-list-second-tab .info-box p {
  font-family: "PingFang HK";
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