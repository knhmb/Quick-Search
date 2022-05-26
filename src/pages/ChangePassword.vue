<template>
  <section class="change-password">
    <base-card>
      <h4>密碼管理</h4>
      <el-form label-position="top">
        <el-row>
          <el-col>
            <el-form-item label="現有密碼">
              <el-input
                type="password"
                placeholder="現有密碼"
                v-model="ruleForm.oldPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="新密碼">
              <el-input
                type="password"
                placeholder="新密碼"
                v-model="ruleForm.newPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="確認新密碼">
              <el-input
                type="password"
                placeholder="確認新密碼"
                v-model="ruleForm.confirmNewPassword"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button>更改</el-button>
          </el-col>
        </el-row>
      </el-form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    };
  },
};
</script>

<style scoped>
.change-password h4 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 2rem;
}

.change-password :deep(.el-form .el-input__wrapper) {
  background: #f5f4f0;
  border: 1px solid #ebeae6;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  width: 100%;
}

.change-password :deep(.el-form-item .el-form-item__label) {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.change-password .el-button {
  background: #985f35;
  border-radius: 8px;

  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 8rem;
  padding: 1.4rem;
  margin-left: auto;
  display: flex;
  margin: 1rem 0 1rem auto;
}
</style>
