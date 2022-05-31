<template>
  <div class="bottom-section">
    <base-card>
      <el-row>
        <el-col :sm="24" :md="24" :lg="17">
          <p>
            按下「提交評價」，你確認遵守
            <span>〈商品說明條例〉</span
            >並同意<span>使用條款</span>及<span>私隱條例</span>。
          </p>
        </el-col>
        <el-col style="text-align: end" :sm="24" :md="24" :lg="7">
          <el-button class="cancel">取消</el-button>
          <el-button class="submit">發表評價</el-button>
        </el-col>
      </el-row>
    </base-card>
  </div>
</template>

<style scoped>
.bottom-section {
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.bottom-section .el-row {
  align-items: center;
}

.bottom-section p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.bottom-section p span {
  color: #985f35;
}

.bottom-section .el-button {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
  background: transparent;
  border-color: #6f6f6f;
  width: 7rem;
  padding: 1.3rem;
  border-radius: 8px;
}

.bottom-section .el-button.submit {
  color: #fff;
  background: #985f35;
  border-color: #985f35;
}

@media screen and (max-width: 1199px) {
  .bottom-section .el-button {
    margin-top: 1rem;
  }
}
</style>