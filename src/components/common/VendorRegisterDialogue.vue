<template>
  <div class="vendor-register-dialogue">
    <el-dialog
      @closed="$emit('closeDialog', false)"
      :model-value="dialogVisible"
      title="商戶註冊"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="帳號名稱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="電郵地址"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            v-model="ruleForm.password"
            placeholder="密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            show-password
            type="password"
            v-model="ruleForm.confirmPassword"
            placeholder="再次輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="signup">註冊</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  props: ["dialogVisible"],
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password")));
      } else {
        if (this.ruleForm.confirmPassword !== "") {
          if (!this.$refs.ruleFormRef) return;
          this.$refs.ruleFormRef.validateField("confirmPassword", () => null);
        }
        callback();
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_password_again")));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t("password_does_not_match")));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("username_required"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$t("email_required"),
            trigger: "blur",
          },
          {
            type: "email",
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    signup() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            password2: this.ruleForm.confirmPassword,
          };
          console.log(data);
          this.$store
            .dispatch("auth/register", data)
            .then(() => {
              ElNotification({
                title: "Success",
                message: this.$t("registered_successfully"),
                type: "success",
              });
              this.$refs.ruleFormRef.resetFields();
              this.$emit("closeDialog", false);
            })
            .catch((err) => {
              ElNotification({
                title: "Error",
                message: this.$t(err.response.data.message),
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
.vendor-register-dialogue :deep(.el-dialog) {
  border-radius: 16px;
  width: 30rem;
}

.vendor-register-dialogue :deep(.el-dialog__title) {
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.vendor-register-dialogue :deep(.el-input__wrapper) {
  background: #f5f4f0;
  /* border: 1px solid #ebeae6; */
  border-radius: 8px;
  padding: 0.3rem 1rem;
}

.vendor-register-dialogue .el-button {
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
  font-family: Noto Sans TC, PingFang, Helvetica, Arial, sans-serif, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #ffffff;
  width: 100%;
  padding: 1.4rem;
  /* margin-top: 1rem; */
}

@media screen and (max-width: 520px) {
  .vendor-register-dialogue :deep(.el-dialog) {
    width: 20rem;
  }
}
</style>