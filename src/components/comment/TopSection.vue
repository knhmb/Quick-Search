<template>
  <div class="top-section">
    <base-container>
      <base-card>
        <h4>店鋪資訊</h4>
        <el-row :gutter="15">
          <el-col :sm="12" :md="5">
            <img src="../../assets/avatar.png" alt="" />
          </el-col>
          <el-col :sm="24" :md="19">
            <h5>Shop Name Shop Name Shop Name</h5>
            <div class="info">
              <p>電話號碼</p>
              <span>9876-5432</span>
            </div>
            <div class="info">
              <p>電郵地址</p>
              <span>shopname@shop.com</span>
            </div>
            <div class="info">
              <p>店鋪地址</p>
              <span>旺角</span>
              <span>店舖地址店舖地址店舖地址店舖地址店舖地址店舖地址</span>
            </div>
          </el-col>
        </el-row>
      </base-card>
    </base-container>
  </div>
</template>

<style scoped>
.top-section h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.top-section img {
  width: 100%;
  border-radius: 8px;
}

.top-section h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
}

.top-section p,
.top-section span {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
}

.top-section p {
  color: #7a4117;
  display: inline-block;
  margin-right: 1.5rem;
}

.top-section span {
  color: #393939;
  margin-right: 1rem;
}

.top-section .info {
  margin-bottom: 1rem;
}
</style>