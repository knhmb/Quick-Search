<template>
  <div class="login-form">
    <el-form :rules="rules" :model="ruleForm" ref="ruleFormRef">
      <el-row>
        <el-col>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :placeholder="$t('account_name')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              :placeholder="$t('password')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-checkbox :label="$t('remember_me')"></el-checkbox>
        </el-col>
        <el-col class="forgot-password-section" :span="12">
          <p @click="forgotPassword" class="forgot-password">
            {{ $t("forgot_password") }}
          </p>
        </el-col>
        <el-col>
          <el-button @click="login">{{ $t("login") }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="have-account">
      <p>{{ $t("no_account") }}</p>
      <el-button @click="register">{{ $t("register") }}</el-button>
    </div>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Username is required!",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$store.commit("changeFormTitle", "新會員註冊");
    },
    forgotPassword() {
      this.$store.commit("changeFormTitle", "忘記密碼");
    },
    login() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
          };
          console.log(data);
          this.$store
            .dispatch("auth/login", data)
            .then(() => {
              this.$emit("closedDialog", false);
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
.login-form .el-form {
  padding: 0 20px;
}

.login-form .el-row {
  align-items: center;
}

.login-form :deep(.el-input__wrapper) {
  background: #f5f4f0;
  border-radius: 8px;
  padding: 0.3rem 1rem;
}

.login-form :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #985f35;
  border-color: #985f35;
}

.login-form :deep(.el-checkbox__label),
.login-form .forgot-password-section p,
.login-form .have-account p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.login-form :deep(.el-checkbox.is-checked .el-checkbox__label) {
  color: #985f35;
}

.login-form .forgot-password-section {
  text-align: end;
}

.login-form .forgot-password-section p.forgot-password {
  cursor: pointer;
}

.login-form .el-button {
  background: linear-gradient(
      268.49deg,
      rgba(255, 136, 51, 0.4) 0%,
      rgba(255, 136, 51, 0) 100%
    ),
    #7a4117;
  border-color: linear-gradient(
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
  margin-top: 1rem;
}

.login-form .have-account {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #f5f4f0;
  border-radius: 0px 0px 16px 16px;
  margin-top: 2rem;
  padding: 0 20px 10px 20px;
}

.login-form .have-account .el-button {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #7a4117;
  border-color: #7a4117;
  background: transparent;
  width: 20%;
  padding: 1.2rem;
}
</style>