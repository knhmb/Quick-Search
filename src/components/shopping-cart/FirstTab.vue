<template>
  <div class="box-card">
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
          <div class="time-picker">
            <base-card>
              <span>可選日子</span>
              <div class="box">15</div>
              <span>已選日子</span>
              <div class="box active">15</div>
              <span>預約已滿</span>
              <div class="box">15</div>
            </base-card>
          </div>
        </div>
        <div class="form-section">
          <label>選擇時間</label>
          <p class="am">上午時段</p>
          <el-row :gutter="15">
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '9:00'"
                :class="{ 'is-active': isActive === '9:00' }"
              >
                9:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '10:00'"
                :class="{ 'is-active': isActive === '10:00' }"
              >
                10:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '11:00'"
                :class="{ 'is-active': isActive === '11:00' }"
              >
                11:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '12:00'"
                :class="{ 'is-active': isActive === '12:00' }"
              >
                12:00
              </div>
            </el-col>
          </el-row>
          <p class="am">上午時段</p>
          <el-row :gutter="15">
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '13:00'"
                :class="{ 'is-active': isActive === '13:00' }"
              >
                13:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '14:00'"
                :class="{ 'is-active': isActive === '14:00' }"
              >
                14:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '15:00'"
                :class="{ 'is-active': isActive === '15:00' }"
              >
                15:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '16:00'"
                :class="{ 'is-active': isActive === '16:00' }"
              >
                16:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '17:00'"
                :class="{ 'is-active': isActive === '17:00' }"
              >
                17:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '18:00'"
                :class="{ 'is-active': isActive === '18:00' }"
              >
                18:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '19:00'"
                :class="{ 'is-active': isActive === '19:00' }"
              >
                19:00
              </div>
            </el-col>
            <el-col :span="6">
              <div
                class="time-box"
                @click="isActive = '20:00'"
                :class="{ 'is-active': isActive === '20:00' }"
              >
                20:00
              </div>
            </el-col>
          </el-row>
        </div>
        <el-button>前往預約</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      isActive: "14:00",
    };
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
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
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
  font-family: "PingFang HK";
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
</style>