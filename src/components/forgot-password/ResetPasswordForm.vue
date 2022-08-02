<template>
  <div class="reset-password">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          :placeholder="$t('password')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          type="password"
          v-model="ruleForm.confirmPassword"
          :placeholder="$t('confirm_new_password')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetPassword">{{
          $t("reset_password_button")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("enter_pasword")));
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
        password: "",
        confirmPassword: "",
      },
      rules: {
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["auth/userForgotPasswordDetails"];
    },
  },
  methods: {
    resetPassword() {
      console.log("reseted");
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          const data = {
            username: this.userDetails.username,
            resetToken: this.userDetails.id,
            password: this.ruleForm.password,
            password2: this.ruleForm.confirmPassword,
          };
          console.log(data);
          this.$store.dispatch("auth/resetPassword", data).then(() => {
            ElNotification({
              title: "Success",
              message: this.$t("password_changed"),
              type: "success",
            });
            this.$emit("closedDialog", false);
            this.$refs.ruleFormRef.resetFields();
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.reset-password {
  padding: 20px;
}

.reset-password .el-form :deep(.el-input .el-input__wrapper) {
  background: #f5f4f0;
  border-radius: 8px;
  padding: 0.3rem 1rem;
}

.reset-password .el-button {
  background: linear-gradient(
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
}
</style>