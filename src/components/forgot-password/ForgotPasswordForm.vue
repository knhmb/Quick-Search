<template>
  <div class="forgot-password">
    <!-- <h5>忘記密碼</h5> -->
    <p>輸入你的帳號名稱及電郵地址來重設密碼。</p>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="帳號名稱"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="電郵地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="forgotPassword">重設密碼</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Username is required!",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Email is required!",
            trigger: "blur",
          },
          {
            type: "email",
          },
        ],
      },
    };
  },
  methods: {
    forgotPassword() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            username: this.ruleForm.username,
            email: this.ruleForm.email,
          };
          console.log(data);
          this.$store
            .dispatch("auth/forgotPassword", data)
            .then(() => {
              this.$store.commit("changeFormTitle", "重設密碼");
              this.$refs.ruleFormRef.resetFields();
            })
            .catch((err) => {
              ElNotification({
                title: "Error",
                message: err.response.data.message,
                type: "error",
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.forgot-password {
  padding: 20px;
}

.forgot-password h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1.5rem;
}

.forgot-password p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.forgot-password .el-form :deep(.el-input .el-input__wrapper) {
  background: #f5f4f0;
  border-radius: 8px;
  padding: 0.3rem 1rem;
}

.forgot-password .el-button {
  background: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  border-radius: 8px;

  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 100%;
  padding: 1.4rem;
}
</style>